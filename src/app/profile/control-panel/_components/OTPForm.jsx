import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { VscLoading } from "react-icons/vsc";
import * as Yup from "yup";
import Cookies from "js-cookie";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "يجب أن يكون الرمز 6 أرقام")
    .required("رمز التأكيد مطلوب"),
});

const OTPForm = ({ isOpen, onNewPhoneOpen, phone: propPhone, onNewmodalOpen, onClose }) => {
  if (!isOpen) return null;

  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const storedPhone = localStorage.getItem("phone") || propPhone;
  const modalRef = useRef(null);
  const [isOutsideClick, setIsOutsideClick] = useState(false);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOutsideClick) {
      onClose();
    }
  }, [isOutsideClick, onClose]);

  const handleInputChange = (index, e) => {
    const { value } = e.target;
    const newOtpValues = [...otpValues];
    newOtpValues[index] = value;
    setOtpValues(newOtpValues);

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const formik = useFormik({
    initialValues: {
      phone: storedPhone || "",
      otp: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const token = Cookies.get("token");
      if (!token) {
        setErrors({ otp: "User not authenticated" });
        return;
      }

      try {
        const otpCode = otpValues.join("");
        console.log("Request Payload:", { phone: storedPhone, otp: otpCode });

        const response = await fetch(`${apiUrl}user/verify-otp-update-phone`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ phone: storedPhone, otp: otpCode }),
        });

        const responseData = await response.json();
        console.log("Server Response:", responseData);

        if (!response.ok) {
          throw new Error(responseData.message || "خطأ أثناء التحقق من OTP");
        }

        onNewmodalOpen();
        onClose(); 
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ otp: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("otp", otpValues.join(""));
  }, [otpValues]);

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50"
      onClick={() => setIsOutsideClick(true)}
    >
      <div
        className="bg-white p-6 rounded-lg w-[300px] md:w-[380px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-medium mb-4 border-b-2 flex justify-center py-3 text-center">
          رمز التأكيد
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-[20px]">
            <div className="my-2">
              <label className="block mb-3 font-medium text-sm">
                يرجى إدخال رمز التأكيد المرسل للرقم
                <span className="text-primary font-semibold"> {storedPhone} </span>
              </label>

              <label className="block mb-3 font-medium text-sm">رمز التأكيد</label>
              <div className="flex justify-center gap-3">
                {otpValues.map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    className="md:w-12 md:h-12 h-8 w-8 text-lg text-center border border-gray-300 focus:border-primary focus:border-2 outline-none rounded-md"
                    value={otpValues[index]}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onChange={(e) => handleInputChange(index, e)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                  />
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-center py-3 my-2 bg-primary text-white rounded-lg flex justify-center items-center"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <VscLoading className="text-lg animate-spin flex justify-center items-center" />
              ) : (
                "تأكيد"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPForm;