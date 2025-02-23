import React, { useState } from 'react';
import CustomModal from "@/app/components/CustomModal";
import { addIcon } from "../../../../../public";
import Image from "next/image";
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie";
import RegisterMap from '../../../_auth/RegisterMap';

const addAddress = async (addressData) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${apiUrl}addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(addressData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error details:", errorData);
    throw new Error(errorData.message || "Failed to add address");
  }

  return response.json();
};

const CustomModel = ({ open, setOpen }) => {
  const [buildingNumber, setBuildingNumber] = useState('');
  const [apartmentNumber, setApartmentNumber] = useState('');
  const [address, setAddress] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [key, setKey] = useState('Home'); 
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationFn: addAddress,
    onSuccess: () => {
      setOpen(false);
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!buildingNumber || !apartmentNumber || !address || !floorNumber || !key || !latitude || !longitude) {
      alert("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    const addressData = {
      building_number: buildingNumber,
      apartment_number: apartmentNumber,
      address,
      floor_number: floorNumber,
      key,
      latitude,
      longitude,
    };

    console.log("📤 Sending address data:", addressData);
    mutate(addressData);
  };

  return (
    <CustomModal open={open} onClose={() => setOpen(false)}>
      <form onSubmit={handleSubmit} className="lg:min-w-[500px] w-[300px] m-4 overflow-auto max-h-[90vh]">
        <div className="bg-[#F5F6F7] w-auto rounded-lg">
          <h2 className="text-lg font-medium flex justify-center p-3 text-center">
            اضافة عنوان
          </h2>
        </div>

        <div className="my-2 flex gap-6">
          <input
            value={buildingNumber}
            onChange={(e) => setBuildingNumber(e.target.value)}
            placeholder="رقم العمارة"
            className="input-field"
            type="number"
          />
          <input
            value={apartmentNumber}
            onChange={(e) => setApartmentNumber(e.target.value)}
            placeholder="رقم الشقة"
            className="input-field"
            type="number"
          />
        </div>

        <div className="my-2">
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="العنوان"
            className="input-field"
            type="text"
          />
        </div>

        <div className="my-2">
          <input
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value)}
            placeholder="رقم الطابق"
            className="input-field"
            type="text"
          />
        </div>

        <div className="my-2 input-field" >
          <label className="block text-gray-800 text-sm font-medium mb-2">
            نوع العنوان:
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="key"
                value="Home"
                checked={key === "Home"}
                onChange={() => setKey("Home")}
                     className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-primary  transition-all"
              />
              المنزل
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="key"
                value="Work"
                checked={key === "Work"}
                onChange={() => setKey("Work")}
                className="appearance-none w-4 h-4 border-2 border-gray-400 rounded-full checked:bg-primary  transition-all"

              />
              العمل
            </label>
          </div>
        </div>

        <div className="my-2">
          <input
            value={latitude}
            placeholder="خط العرض"
            className="input-field"
            type="text"
            disabled
          />
        </div>

        <div className="my-2">
          <input
            value={longitude}
            placeholder="خط الطول"
            className="input-field"
            type="text"
            disabled
          />
        </div>

        <div className="my-4">
          <RegisterMap
            setCoordinates={({ lat, lng }) => {
              setLatitude(lat);
              setLongitude(lng);
            }}
            setFieldValue={(field, value) => {
              if (field === "latitude") setLatitude(value);
              if (field === "longitude") setLongitude(value);
            }}
          />
        </div>

        <div className="flex justify-end w-full">
          <button type="submit" disabled={isLoading} className="flex items-center gap-2">
            <Image className="w-12" alt="Add Icon" width={50} src={addIcon} />
          </button>
        </div>
      </form>

      <style jsx>{`
        .input-field {
          display: block;
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #FBFBFB;
          text-align: right;
        }
      `}</style>
    </CustomModal>
  );
};

export default CustomModel;
