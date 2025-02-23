import React, { useRef, useState, useEffect } from "react";
import { useFormik } from "formik";
import { VscLoading } from "react-icons/vsc";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "يجب أن يكون الرمز 6 أرقام")
    .required("رمز التأكيد مطلوب"),
});

const OTPFormEmail = ({ isOpen, onClose, email }) => {
  const modalRef = useRef(null);
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { enqueueSnackbar } = useSnackbar();

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
      email: email || "",
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
        console.log("Request Payload:", { email, otp: otpCode });

        const response = await fetch(`${apiUrl}user/verify-otp-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email, otp: otpCode }),
        });

        const responseData = await response.json();
        console.log("Server Response:", responseData);

        if (!response.ok) {
          if (responseData.message === "OTP does not exist") {
            throw new Error("الرمز الذي أدخلته غير صحيح أو منتهي الصلاحية.");
          } else {
            throw new Error(responseData.message || "حدث خطأ أثناء التحقق من OTP");
          }
        }

        enqueueSnackbar(responseData.message, { variant: "success" });
        onVerificationSuccess();
      } catch (error) {
        console.error("Error submitting form:", error);
        enqueueSnackbar(error.message, { variant: "error" });
        setErrors({ otp: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      } 
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-6 rounded-lg w-[300px] md:w-[380px]">
        <h2 className="text-lg font-medium mb-4 border-b-2 flex justify-center py-3 text-center">
          رمز التأكيد
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="p-[20px]">
            <div className="my-2">
              <label className="block mb-3 font-medium text-sm">
                يرجى إدخال رمز التأكيد المرسل 
                <span className="text-primary font-semibold"> {email} </span>
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

export default OTPFormEmail;