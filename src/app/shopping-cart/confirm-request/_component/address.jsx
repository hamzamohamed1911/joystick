// Address.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchAddresses } from "../../../services/fetchAddress";
import Loading from "@/app/profile/added-location/_components/Loading";

const Address = ({ onSelectAddress }) => {
  const token = Cookies.get("token");
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const getAddresses = async () => {
      try {
        const data = await fetchAddresses(token);
        setAddresses(data);
      } catch (err) {
        setIsError(true);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAddresses();
  }, [token]);

  useEffect(() => {
    if (error?.message.includes("Unauthorized")) {
      router.push("/login");
    }
  }, [error, router]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    onSelectAddress(address); 
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between font-medium my-6">
        <h3 className="text-2xl">العنوان</h3>
        <Link href="/profile/added-location" className="text-primary text-lg">
          تغير
        </Link>
      </div>
      <div className="border-[1px] flex flex-col space-y-4 justify-center p-6 border-[#E8EAED] h-auto rounded-lg">
        {isLoading ? (
          <div className="text-center text-gray-500">
            <Loading />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500">
            <p>Error: {error.message}</p>
          </div>
        ) : addresses.length > 0 ? (
          addresses.map((address) => (
            <div
              key={address.id}
              className="border-solid border-[#E4E7E9] border-[1px] py-4 px-6 rounded-xl w-full min-h-[100px] flex flex-row"
              onClick={() => handleAddressSelect(address)}
            >
              <div className="space-y-5 w-full">
                <div className="flex justify-between">
                  <h3 className="text-xl font-medium">{address.key}</h3>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="radio"
                      className="appearance-none cursor-pointer h-6 w-6 rounded-full border-[4px] border-gray-300 checked:border-primary focus:outline-none"
                      name="mainAddress"
                      defaultChecked={address.is_main === 1}
                      checked={selectedAddress?.id === address.id}
                      onChange={() => handleAddressSelect(address)}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p className="text-[#666666] lg:text-lg md:text-md text-sm max-w-lg">
                    {address.address}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">لا يوجد عناوين مضافة</p>
        )}
      </div>
    </div>
  );
};

export default Address;
