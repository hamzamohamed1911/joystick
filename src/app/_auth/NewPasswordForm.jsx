"use client";

import Image from "next/image";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VscLoading } from "react-icons/vsc";
import { useSnackbar } from "notistack";

const Eye = "/eye.svg";
const hideEye = "/hide-eye.svg";
const snackbarStyles = {
  success: {
    backgroundColor: "#02A09B",
    color: "#FFFFFF",
  },
};
const NewPasswordForm = ({ onOpenLoginModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const togglePasswordVisibility = () => {
    setShowPassword((open) => !open);
  };
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    password: Yup.string().min(6, "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل").required("كلمة المرور مطلوبة"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة")
      .required("يرجى تأكيد كلمة المرور"),
  });
  const phone = localStorage.getItem("phone");

  const formik = useFormik({
    initialValues: {
      password: "",
      phone: phone,
      password_confirmation: "",
    },
    validationSchema,
    validateOnBlur: true, 
    validateOnChange: true, 
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(`${apiUrl}user/confirm-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, phone }),
        });

        console.log("API Response:", response);
        if (!response.ok) {
          throw new Error("خطأ أثناء التحقق من تغير كلمة المرور");
        }
        enqueueSnackbar(`تم تغير كلمة المرور بنجاح`, {
          variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          style: snackbarStyles.success,
        });
        onOpenLoginModal();
     
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ password: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className="md:min-w-[380px] w-[300px]" onSubmit={formik.handleSubmit}>
      <h2 className="text-lg font-medium mb-4 border-b-2 flex justify-center py-3 text-center">
        استعادة كلمة المرور
      </h2>
      <div className="p-[20px]">
        <h2 className="text-md font-medium text-center">
          يرجى اعادة تعيين كلمة المرور
        </h2>
        <div className="my-2">
          <label className="block mb-3 font-medium text-sm">كلمة المرور</label>
          <input
            name="password"
            type="password"
            className="block w-full px-5 py-2 border border-gray-300 rounded-lg"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
           {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
        <div className="my-2">
          <label className="block mb-3 font-medium text-sm">تأكيد كلمة المرور</label>
          <div className="relative">
            <input
              name="password_confirmation"
              type={showPassword ? "text" : "password"}
              className="block w-full px-5 py-2 border border-gray-300 rounded-lg"
              value={formik.values.password_confirmation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button type="button" className="absolute inset-y-0 left-3 flex items-center" onClick={togglePasswordVisibility}>
              <Image width={20} height={20} alt="eye icon" src={showPassword ? hideEye : Eye} />
            </button>
            {formik.touched.password_confirmation && formik.errors.password_confirmation && (
  <div className="text-red-500">{formik.errors.password_confirmation}</div>
)}

          </div>
        </div>
        <button type="submit" className="w-full py-3 my-2 bg-primary text-white rounded-lg flex justify-center items-center">
          {formik.isSubmitting ? <VscLoading className="text-lg animate-spin" /> : "تأكيد"}
        </button>
      </div>
    </form>
  );
};

export default NewPasswordForm;
