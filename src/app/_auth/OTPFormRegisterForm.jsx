import { useFormik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { VscLoading } from "react-icons/vsc";
import * as Yup from "yup";

const validationSchema = Yup.object({
  otp: Yup.string()
    .length(6, "يجب أن يكون الرمز 6 أرقام")
    .required("رمز التأكيد مطلوب"),
});

const OTPFormRegisterForm = ({ onNewPasswordOpen }) => {
  const [otpValues, setOtpValues] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const phone = localStorage.getItem("phone");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

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
      phone: phone || "",
      otp: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const otpCode = otpValues.join("");
        const response = await fetch(`${apiUrl}user/verify-otp-phone`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, otp: otpCode }),
        });
        localStorage.removeItem("phone");
        if (!response.ok) {
          throw new Error("خطأ أثناء التحقق من OTP");
        }

        onNewPasswordOpen();
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ otp: error.message });
      } finally {
        setSubmitting(false);
        console.log("Form submission complete.");
      }
    },
  });

  useEffect(() => {
    formik.setFieldValue("otp", otpValues.join(""));
  }, [otpValues]);

  return (
    <form onSubmit={formik.handleSubmit} className="md:min-w-[380px] w-[300px]">
      <h2 className="text-lg font-medium mb-4 border-b-2 flex justify-center py-3 text-center">
        رمز التأكيد
      </h2>
      <div className="p-[20px]">
        <div className="my-2">
          <label className="block mb-3 font-medium text-sm">
            يرجى إدخال رمز التأكيد المرسل للرقم
            <span className="text-primary font-semibold"> {phone} </span>
          </label>

          <div className="">
            <label className="block mb-3 font-medium text-sm">
              رمز التأكيد
            </label>
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
  );
};

export default OTPFormRegisterForm;
