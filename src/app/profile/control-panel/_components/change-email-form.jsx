"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { getUserDetails, updateProfile, updateUserPhone, updateUserEmail } from "../../profile-update-apis";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import OTPForm from "./OTPForm";
import OTPFormEmail from "./OTPFormEmail";
import { profile } from "../../../../../public";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function UpdateProfileForm() {
  const [profileImage, setProfileImage] = useState(profile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isOTPModalEmailOpen, setIsOTPModalEmailOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const inputRef = useRef(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-details"],
    queryFn: getUserDetails,
  });

  const userDetails = data?.data || {};

  useEffect(() => {
    if (userDetails.image) {
      setProfileImage(userDetails.image);
    } else {
      setProfileImage(profile);
    }
  }, [userDetails.image]);

  const formik = useFormik({
    initialValues: {
      username: userDetails.username || "",
      phone: userDetails.phone || "",
      email: userDetails.email || "", // إضافة حقل الإيميل
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.phone !== userDetails.phone) {
        handlePhoneUpdate(values.phone);
      } else if (values.email !== userDetails.email) { // التحقق من تغيير الإيميل
        handleEmailUpdate(values.email);
      } else {
        handleUpdateProfile(values);
      }
    },
  });

  const { mutate: updateProfileMutation, isPending: isUpdating } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (data) => {
      if (data.success) {
        enqueueSnackbar("تم تحديث البروفايل بنجاح", {
          variant: "success",
          style: { backgroundColor: "#02A09B", color: "#FFFFFF" },
        });

        if (data.data.image) {
          setProfileImage(data.data.image);
        }

        formik.setValues({
          username: data.data.username,
          phone: data.data.phone,
          email: data.data.email, // تحديث الإيميل
        });
      } else {
        if (data.message && data.message.profile_picture) {
          enqueueSnackbar(data.message.profile_picture[0], {
            variant: "error",
          });
        } else {
          enqueueSnackbar("حدث خطأ أثناء التحديث", {
            variant: "error",
          });
        }
      }
    },
    onError: (error) => {
      console.error("Error updating profile:", error);
      enqueueSnackbar("حدث خطأ فى التحديث.", {
        variant: "error",
      });
    },
  });

  const handlePhoneUpdate = async (phone) => {
    try {
      if (phone === userDetails.phone) {
        enqueueSnackbar("الرقم الذي أدخلته هو نفس الرقم الحالي.", {
          variant: "error",
        });
        return;
      }
  
      const response = await updateUserPhone(phone);
      if (response.success) {
        setNewPhone(phone);
        setIsOTPModalOpen(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  

  const handleEmailUpdate = async (email) => {
    try {
      if (email === userDetails.email) {
        enqueueSnackbar("البريد الإلكتروني الذي أدخلته هو نفس البريد الحالي.", {
          variant: "error",
        });
        return;
      }
  
      const response = await updateUserEmail(email);
      if (response.success) {
        setNewEmail(email);
        setIsOTPModalEmailOpen(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.message);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  
  const handleUpdateProfile = (values) => {
    const formData = new FormData();
    formData.append("username", values.username);

    if (selectedFile) {
      formData.append("profile_picture", selectedFile);
    }

    updateProfileMutation(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  const handleOTPVerificationSuccess = () => {
    setIsOTPModalOpen(false);
    handleUpdateProfile(formik.values);
  };

  const handleEmailOTPVerificationSuccess = () => {
    setIsOTPModalEmailOpen(false);
    handleUpdateProfile(formik.values);
  };

  return (
    <>
      <div className="border-[1px] border-gray-300 md:h-1/2 h-full w-full max-w-[1120px]">
        <h1 className="border-b-[1px] border-gray-300 py-4 px-3 font-semibold ">
           البريد الالكترونى
        </h1>

        <form className="p-4 md:p-8" onSubmit={formik.handleSubmit}>
          <div className="mb-4">

                <label htmlFor="email" className="block  mb-2  font-medium min-w-28" >
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                />
              </div>

          <div className="flex justify-end my-0">
            <button
              type="submit"
              className="bg-primary text-white py-3 px-8 rounded-xl"
              disabled={isUpdating}
            >
              {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
            </button>
          </div>
        </form>
      </div>

      <OTPFormEmail
        isOpen={isOTPModalEmailOpen}
        onClose={() => setIsOTPModalEmailOpen(false)}
        onNewmodalOpen={handleEmailOTPVerificationSuccess}
        email={newEmail}
      />
    </>
  );
}