"use client";
import { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { Eye, hideEye } from "../../../public";
import { VscLoading } from "react-icons/vsc";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useRouter } from "next/navigation";

const LoginForm = ({ onForgotPassword, setOpen }) => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const snackbarStyles = {
    success: {
      backgroundColor: "#02A09B",
      color: "#FFFFFF",
    },
  };

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\d{9,15}$/, "رقم الهاتف غير صحيح")
      .required("رقم الهاتف مطلوب"),
    password: Yup.string()
      .min(6, "كلمة المرور يجب أن تكون على الأقل 6 أحرف")
      .required("كلمة المرور مطلوبة"),
  });

  const formik = useFormik({
    initialValues: { phone: "", password: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(`${apiUrl}user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "حدث خطأ أثناء تسجيل الدخول");
        }

        dispatch(login());

        localStorage.setItem("token", data.data.token);
        Cookies.set("token", data.data.token, { expires: 7 });

        router.push("/");
        window.location.reload();


        if (data.data.username) {
          enqueueSnackbar(`مرحبا يا ${data.data.username}`, {
            variant: "success",
            anchorOrigin: { vertical: "top", horizontal: "right" },
            style: snackbarStyles.success,
          });
        }

        setOpen(false);
      } catch (error) {
        setErrors({ password: error.message });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="md:p-[20px] p-[15px] md:min-w-[380px] w-[300px]"
    >
      <div className="my-2">
        <label className="block mb-3 font-medium">رقم الهاتف</label>
        <input
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
          type="tel"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}
      </div>

      <div className="my-2">
        <div className="flex justify-between">
          <label className="block mb-3 font-medium">كلمة المرور</label>
          <span
            onClick={onForgotPassword}
            className="text-primary cursor-pointer font-medium"
          >
            نسيت كلمة المرور
          </span>
        </div>

        <div className="relative">
          <input
            className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <button
            type="button"
            className="absolute inset-y-0 left-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              width={20}
              height={20}
              alt="eye icon"
              src={showPassword ? Eye : hideEye}
            />
          </button>
        </div>
        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm">{formik.errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full text-center py-3 my-2 bg-primary text-white rounded-lg flex justify-center items-center"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? (
          <VscLoading className="text-lg animate-spin flex justify-center items-center" />
        ) : (
          "دخول"
        )}
      </button>
    </form>
  );
};

export default LoginForm;