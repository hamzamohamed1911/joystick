"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { addIcon3, deleteIcon, joystic2 } from "../../../../../public";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AddedDevices() {
  const router = useRouter();

  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [device, setdevice] = useState({
    device_name: "",
    serial_number: "",
    purchase_date: "",
    status: "",
  });

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);

        const token = Cookies.get("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`${apiUrl}devices/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch Devices");
        }

        const data = await response.json();
        setDevices(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setdevice({
      ...device,
      [name]: value,
    });
  };

  const handleAddDevice = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const token = Cookies.get("token");
      if (!token) {
        throw new Error("User not authenticated");
      }

      const response = await fetch(`${apiUrl}devices/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(device),
      });

      if (!response.ok) {
        throw new Error("Failed to add device");
      }

      const data = await response.json();
      setDevices([...devices, data.data]);
      setdevice({
        device_name: "",
        serial_number: "",
        purchase_date: "",
        status: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full lg:p-6 md:p-3 p-2">
      <form className="flex flex-col justify-between gap-6 h-full md:p-0 p-4" onSubmit={handleAddDevice}>
        <div className="border-[1px] border-[#E4E7E9] border-solid h-full w-full">
          <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 items-center flex justify-between">
            <h1 className="font-semibold">اضافة جهاز</h1>
          </div>
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="my-2 w-full">
                <label className="block mb-3 font-medium">اسم الجهاز *</label>
                <input
                  className="block mb-3 mt-1 focus:border-primary px-5 py-3 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[10px] w-full"
                  type="text"
                  name="device_name"
                  value={device.device_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-2 w-full">
                <label className="block mb-3 font-medium">رقم الجهاز *</label>
                <input
                  className="block mb-3 mt-1 focus:border-primary px-5 py-3 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[10px] w-full"
                  type="text"
                  name="serial_number"
                  value={device.serial_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="my-2 w-full">
                <label className="block mb-3 font-medium">تاريخ الشراء *</label>
                <input
                  className="block mb-3 mt-1 focus:border-primary px-5 py-3 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[10px] w-full"
                  type="date"
                  name="purchase_date"
                  value={device.purchase_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="my-2 w-full">
                <label className="block mb-3 font-medium">حالة الجهاز *</label>
                <input
                  className="block mb-3 mt-1 focus:border-primary px-5 py-3 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[10px] w-full"
                  type="text"
                  name="status"
                  value={device.status}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button type="submit" className="w-12 h-6">
                <Image alt="add Icon" src={addIcon3} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}