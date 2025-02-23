import { useFormik } from "formik";
import { VscLoading } from "react-icons/vsc";
import * as Yup from "yup";

const validationSchema = Yup.object({
  phone: Yup.string()
    .matches(/^\d{10,11}$/, "يجب أن يكون رقم الهاتف صحيحًا")
    .required("رقم الهاتف مطلوب"),
});
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ForgotPasswordForm = ({ onOtpOpen, onClose }) => {
  const formik = useFormik({
    initialValues: {
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await fetch(`${apiUrl}user/send-otp-forgot-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          onOtpOpen();
          onClose();
          localStorage.setItem("phone", values.phone);
        }

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

  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" md:min-w-[380px] w-[300px]"
    >
      <h2 className="text-lg font-medium mb-4 border-b-2 flex justify-center py-3 text-center">
        استعادة كلمة المرور
      </h2>
      <div className="md:p-[18px] p-[14px]">
        <div className="my-2 ">
          <label className="block mb-3 font-medium text-sm">
            يرجى ادخال رقم الهاتف لارسال رمز التأكيد
          </label>

          <div className="gap-2 items-center flex mb-3">
            <input
              className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full "
              {...formik.getFieldProps("phone")}
              name="phone"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500">{formik.errors.phone}</div>
            )}
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
            "ادخال"
          )}
        </button>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
