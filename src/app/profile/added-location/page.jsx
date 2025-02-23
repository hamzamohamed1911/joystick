"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { addIcon2, deleteIcon } from "../../../../public";
import Cookies from "js-cookie";
import CustomModel from "./_components/custom-model";
import Loading from "./_components/Loading";
import { fetchAddresses, deleteAddress, addAddress,  } from "../../services/fetchAddress";

const AddedLocations = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const { data: addresses, isLoading, isError, error } = useQuery({
    queryKey: ["addresses"],
    queryFn: () => fetchAddresses(token),
  });

  const { mutate: removeAddress } = useMutation({
    mutationFn: (addressId) => deleteAddress(addressId, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });

  const { mutate: addNewAddress } = useMutation({
    mutationFn: (newAddress) => addAddress(newAddress, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["addresses"]);
    },
  });

  const handleDelete = (addressId) => {
    removeAddress(addressId);
  };

  const handleAddAddress = (newAddress) => {
    addNewAddress(newAddress, {
      onSuccess: () => {
        window.location.reload(); 
      },
    });
  };
  

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (error?.message.includes("Unauthorized")) {
      router.push("/login");
    }
  }, [error, router]);

  return (
    <div className="flex flex-col justify-between gap-6 h-full md:p-0 p-4">
      <div className="border-[1px] border-gray-300 h-screen w-full">
        <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 flex justify-between items-center">
          <h1 className="font-semibold">العناوين المضافة</h1>
          <button onClick={handleOpen} className="pl-4">
            <Image alt="add Icon" width={25} src={addIcon2} />
          </button>
        </div>
        <div className="lg:p-8 md:p-6 p-4 space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-500">
              <Loading />
            </div>
          ) : isError ? (
            <p className="text-center text-red-500">Error: {error.message}</p>
          ) : addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                key={address.id}
                className="border-solid border-[#E4E7E9] border-[1px] py-4 px-6 rounded-xl w-full min-h-[100px] flex flex-row"
              >
                <div className="space-y-5 w-full">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-medium">{address.key}</h3>
                    <div className="flex gap-2 justify-center items-center">
                      <input
                        type="checkbox"
                        className="appearance-none cursor-pointer h-6 w-6 rounded-full border-[4px] border-gray-300 checked:border-primary focus:outline-none"
                        defaultChecked={address.is_main === 1}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-[#666666] lg:text-lg md:text-md text-sm max-w-lg">
                      {address.address}
                    </p>
                    <button onClick={() => handleDelete(address.id)}>
                      <Image alt="delete Icon" src={deleteIcon} width={25} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">لا يوجد عناوين مضافة</p>
          )}
        </div>
      </div>
      <CustomModel open={open} setOpen={setOpen} onAddAddress={handleAddAddress} />
    </div>
  );
};

export default AddedLocations;
