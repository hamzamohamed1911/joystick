"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { getUserDetails, updateProfile, updateUserPhone } from "../../profile-update-apis";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import OTPForm from "./OTPForm";


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const defaultProfile = "/Profile.svg";
export default function UpdateProfileForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isOTPModalEmailOpen, setIsOTPModalEmailOpen] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [profileImage, setProfileImage] = useState(defaultProfile);

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
      setProfileImage(defaultProfile);
    }
  }, [userDetails.image]);


  const formik = useFormik({
    initialValues: {
      username: userDetails.username || "",
      phone: userDetails.phone || "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      if (values.phone !== userDetails.phone) {
        handlePhoneUpdate(values.phone);

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
      setNewPhone(phone);
      setIsOTPModalOpen(true);
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

  return (
    <>
      <div className="border-[1px] border-gray-300 md:h-1/2 h-full w-full max-w-[1120px]">
        <h1 className="border-b-[1px] border-gray-300 py-4 px-3 font-semibold">
          اعدادات الحساب
        </h1>

        <form className="p-4 md:p-8" onSubmit={formik.handleSubmit}>
          <div className="md:grid grid-cols-12 gap-6">
            <div className="md:col-span-3 flex justify-center items-center w-full mt-1">
              <div className="relative rounded-full w-[250px] h-[250px] md:w-[250px] md:h-[250px]">
                <Image
                  src={profileImage || defaultProfile}
                  alt="profile picture"
                  width={250}
                  height={250}
                  className="object-cover md:w-[250px] md:h-[250px] h-[200px] w-[200px] rounded-full"
                  onLoadingComplete={(result) => {
                    if (result.naturalWidth === 0) {
                      setProfileImage(defaultProfile);
                    }
                  }}
                />

                <div
                  className="absolute rounded-full bg-primary text-white flex justify-center items-center w-10 h-10 bottom-8 left-1.5 cursor-pointer"
                  onClick={() => inputRef.current.click()}
                >
                  <MdEdit />
                </div>
              </div>
              <input
                ref={inputRef}
                id="file-input"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="col-span-9">
              <div className="my-4">
                <label htmlFor="username" className="block mb-2 font-medium">
                  الاسم
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                />
              </div>

              <div className="my-4">
                <label htmlFor="phone" className="block mb-2 font-medium">
                  رقم الهاتف
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                />
              </div>
            </div>
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

      <OTPForm
        isOpen={isOTPModalOpen}
        onClose={() => setIsOTPModalOpen(false)}
        onNewmodalOpen={handleOTPVerificationSuccess}
        phone={newPhone}
      />


    </>
  );
}