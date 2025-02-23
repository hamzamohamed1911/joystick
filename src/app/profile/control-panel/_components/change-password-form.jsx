'use client'

import React, { useState } from 'react'
import { Eye, hideEye } from "@/../public";
import Image from 'next/image';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import { enqueueSnackbar, useSnackbar } from 'notistack';

const snackbarStyles = {
  success: {
    backgroundColor: "#02A09B",
    color: "#FFFFFF",
  },

};
export default function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const validationSchema = Yup.object({
    old_password: Yup.string().required("كلمة المرور مطلوبة"),
    new_password: Yup.string()
      .min(6, "يجب أن تكون 6 أحرف على الأقل")
      .required("كلمة المرور الجديدة مطلوبة"),
    new_password_confirmation: Yup.string()
      .oneOf([Yup.ref("new_password"), null], "يجب أن تتطابق كلمة المرور الجديدة")
      .required("تأكيد كلمة المرور مطلوب"),
  });

  const handleSubmitForm = async (values, { setSubmitting, resetForm }) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get("token");

    if (!token) {
      setError("User not authenticated");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}user/update-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) throw new Error("Failed to change password");

 
      enqueueSnackbar("تم تغيير كلمة المرور بنجاح", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        style: snackbarStyles.success, 
      });

      resetForm();
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      old_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
    validationSchema,
    onSubmit: handleSubmitForm,
  });

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="border border-gray-300 md:h-1/2 h-full w-full max-w-[1120px]">
      <h1 className="border-b border-gray-300 py-4 px-3 font-semibold">
        تغيير كلمة المرور
      </h1>

      <form onSubmit={formik.handleSubmit} className="p-4 md:px-10">
        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="old_password" className="block mb-2 font-medium">
            كلمة المرور الحالية
          </label>
          <div className="relative">
            <input
              id="old_password"
              type={showPassword ? "text" : "password"}
              {...formik.getFieldProps("old_password")}
              className="block w-full px-5 py-2 text-lg border border-gray-300 rounded-lg shadow-sm focus:border-primary focus:outline-none"
            />
            <button type="button" className="absolute inset-y-0 left-3 flex items-center" onClick={togglePasswordVisibility}>
              <Image width={20} height={20} alt="eye icon" src={showPassword ? hideEye : Eye} />
            </button>
          </div>
          {formik.touched.old_password && formik.errors.old_password && (
            <p className="text-red-500 text-sm">{formik.errors.old_password}</p>
          )}
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="new_password" className="block mb-2 font-medium">
            كلمة المرور الجديدة
          </label>
          <input
            id="new_password"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("new_password")}
            className="block w-full px-5 py-2 text-lg border border-gray-300 rounded-lg shadow-sm focus:border-primary focus:outline-none"
          />
          {formik.touched.new_password && formik.errors.new_password && (
            <p className="text-red-500 text-sm">{formik.errors.new_password}</p>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-4">
          <label htmlFor="new_password_confirmation" className="block mb-2 font-medium">
            تأكيد كلمة المرور
          </label>
          <input
            id="new_password_confirmation"
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("new_password_confirmation")}
            className="block w-full px-5 py-2 text-lg border border-gray-300 rounded-lg shadow-sm focus:border-primary focus:outline-none"
          />
          {formik.touched.new_password_confirmation && formik.errors.new_password_confirmation && (
            <p className="text-red-500 text-sm">{formik.errors.new_password_confirmation}</p>
          )}
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Submit Button */}
        <div className="flex justify-end my-3">
          <button type="submit" className="bg-primary text-white py-3 px-8 rounded-xl" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "جارٍ الحفظ..." : "حفظ التغييرات"}
          </button>
        </div>
      </form>
    </div>
  );
}
