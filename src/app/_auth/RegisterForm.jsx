"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { VscLoading } from "react-icons/vsc";
import RegisterMap from "./RegisterMap";

const validationSchema = Yup.object({
  username: Yup.string().required("اسم المستخدم مطلوب"),
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "يجب أن يكون رقم الهاتف صحيحًا")
    .required("رقم الهاتف مطلوب"),
  password: Yup.string()
    .min(6, "يجب أن تكون كلمة المرور 6 أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "كلمة المرور غير متطابقة")
    .required("تأكيد كلمة المرور مطلوب"),
  building_number: Yup.number().required("رقم العمارة مطلوب"),
  floor_number: Yup.number().required("رقم الدور مطلوب"),
  apartment_number: Yup.number().required("رقم الشقة مطلوب"),
  addresses: Yup.string().required("العنوان مطلوب"),
});

const RegisterForm = ({ onRegiester }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [coordinates, setCoordinates] = useState({ lat: "", lng: "" });

  const [showPassword, setShowPassword] = useState({
    password: false,
    password_confirmation: false,
  });
  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      phone: "",
      password: "",
      password_confirmation: "",
      building_number: "",
      floor_number: "",
      apartment_number: "",
      addresses: "",
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(`${apiUrl}user/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        localStorage.setItem("phone", values.phone);
        onRegiester();
        const data = await response.json();
        console.log(values);
        console.log(data);

        if (!response.ok) {
          throw new Error(data.message || "حدث خطأ أثناء التسجيل ");
        }
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
      className="md:p-[20px] p-[15px] md:min-w-[380px] w-[300px]  h-[50vh] lg:h-[80vh] overflow-y-auto "
    >
      <div className="mb-2">
        <label className="block mb-3 font-medium">اسم المستخدم</label>
        <input
          name="username"
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
          type="text"
          {...formik.getFieldProps("username")}
        />
        {formik.touched.username && formik.errors.username && (
          <div className="text-red-500">{formik.errors.username}</div>
        )}
      </div>
      <div className="my-2">
        <label className="block mb-3 font-medium"> رقم الهاتف </label>
        <input
          name="phone"
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
          type="phone"
          {...formik.getFieldProps("phone")}
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="text-red-500">{formik.errors.phone}</div>
        )}
      </div>
      <div className="my-2">
        <label className="block mb-3 font-medium">كلمة المرور</label>
        <div className="relative">
          <input
            name="password"
            className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full "
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("password")}
          />

          <div
            className="absolute inset-y-0 left-3 flex items-center cursor-pointer"
            onClick={() => togglePasswordVisibility("password")}
          >
            {showPassword.password ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500">{formik.errors.password}</div>
          )}
        </div>
      </div>
      <div className="my-2">
        <label className="block mb-3 font-medium">تأكيد كلمة المرور</label>
        <div className="relative">
          <input
            name="password_confirmation"
            className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full "
            type={showPassword ? "text" : "password"}
            {...formik.getFieldProps("password_confirmation")}
          />

          <div
            className="absolute inset-y-0 left-3 flex items-center cursor-pointer"
            onClick={() => togglePasswordVisibility("password_confirmation")}
          >
            {showPassword.password_confirmation ? (
              <FaEyeSlash className="text-gray-500" />
            ) : (
              <FaEye className="text-gray-500" />
            )}
          </div>
          {formik.touched.password_confirmation &&
            formik.errors.password_confirmation && (
              <div className="text-red-500">
                {formik.errors.password_confirmation}
              </div>
            )}
        </div>
      </div>
      <div className="my-2">
        <div className="md:max-w-[350px] w-auto">
          <label className="block mb-3 font-medium">العنوان</label>
          <div className="flex gap-2 ">
            <input
              placeholder="رقم العمارة"
              name="building_number"
              className="text-xs mb-3 mt-1 focus:border-primary px-5 py-2 border border-gray-300 text-gray-800  shadow-sm focus:outline-none rounded-[8px] w-1/3"
              type="number"
              {...formik.getFieldProps("building_number")}
            />
            <input
              placeholder="رقم الدور"
              className="mb-3 mt-1 focus:border-primary px-5 py-2 text-xs border border-gray-300 text-gray-800  shadow-sm focus:outline-none rounded-[8px] w-1/3"
              type="number"
              {...formik.getFieldProps("floor_number")}
            />
            <input
              placeholder="رقم الشقة"
              className=" mb-3 mt-1 focus:border-primary px-5 py-2 text-xs border border-gray-300 text-gray-800  shadow-sm focus:outline-none rounded-[8px] w-1/3"
              type="number"
              name="apartment_number"
              {...formik.getFieldProps("apartment_number")}
            />
          </div>
        </div>
      </div>
      <div className="my-2">
        <input
          placeholder="العنوان"
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
          type="text"
          name="addresses"
          {...formik.getFieldProps("addresses")}
        />
        {formik.touched.addresses && formik.errors.addresses && (
          <div className="text-red-500">{formik.errors.addresses}</div>
        )}
      </div>

      <div className="my-2">
        <label className="block mb-3 font-medium">اختيار الموقع</label>
        <RegisterMap
          setFieldValue={formik.setFieldValue}
          setCoordinates={setCoordinates}
        />
      </div>
      <button
        type="submit"
        className="w-full text-center py-3 my-2 bg-primary text-white rounded-lg flex justify-center items-center"
      >
        {formik.isSubmitting ? (
          <VscLoading className="text-lg animate-spin flex justify-center items-center" />
        ) : (
          "إنشاء"
        )}
      </button>
    </form>
  );
};

export default RegisterForm;
