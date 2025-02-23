"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import Profile from "../../../../../public/Profile.svg";

const ProfileImageUploader = ({ profileImage, handleImageUpload }) => {
  const inputRef = useRef(null);

  return (
    <div className="relative rounded-full w-[250px] h-[250px] md:w-[250px] md:h-[250px]">
      <Image
        alt="profile picture"
        className="object-cover md:w-[250px] md:h-[250px] h-[200px] w-[200px] rounded-full"
        src={profileImage}
        width={250}
        height={250}
        onError={(e) => {
          e.target.src = Profile;
        }}
      />
      <div
        className="absolute rounded-full bg-primary text-white flex justify-center items-center w-10 h-10 bottom-8 left-1.5 cursor-pointer"
        onClick={() => inputRef.current.click()}
      >
        <MdEdit />
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
  );
};

export default ProfileImageUploader;