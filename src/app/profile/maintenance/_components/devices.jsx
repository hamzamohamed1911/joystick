"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  addIcon2,
  deleteIcon,
  historyIcon,
  joystic2,
} from "../../../../../public";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const Devices = ({ setOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("token");
        if (!token) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`${apiUrl}devices/all`, {
          method: "GET",
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

  return (
    <div className="border-[1px] border-[#E4E7E9] border-solid h-full w-full">
      <div className="border-b-[1px] border-solid border-[rgb(228,231,233)] py-4 px-6 items-center flex justify-between">
        <h1 className="font-medium">اختر جهاز</h1>
        <div className="gap-4 flex">
          <button onClick={() => router.push("/profile/maintenance/previous-operations")}>
            <Image alt="history Icon" width={25} src={historyIcon} />
          </button>
          <button onClick={() => router.push("/profile/maintenance/added-devices")}>
            <Image alt="add Icon" width={25} src={addIcon2} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-6">جاري تحميل الأجهزة...</div>
      ) : error ? (
        <div className="text-center py-6 text-red-600">{error}</div>
      ) : (
        <div className="p-4 flex gap-6 flex-wrap">
          {devices.map((device) => (
            <div
              key={device.id}
              onClick={() => setOpen(true)} 
              className="grid grid-cols-12 gap-2 items-center border-[1px] border-solid rounded-lg shadow-lg w-[410px] border-gray-300 cursor-pointer p-3 h-36 relative"
            >
              <div className="col-span-4">
                <Image alt="joystick" width={200} className="object-contain" src={joystic2} />
              </div>
              <div className="col-span-8 space-y-3">
                <button className="absolute left-4 top-3">
                  <Image width={18} alt="delete Icon" src={deleteIcon} />
                </button>
                <h1 className="font-medium text-md">{device.device_name}</h1>
                <h3 className="text-sm">
                  رقم الجهاز: <strong>{device.serial_number}</strong>
                </h3>
                <div className="flex justify-between">
                  <h3 className="text-sm">
                    تاريخ الشراء: <strong>{device.purchase_date}</strong>
                  </h3>
                  <h3 className="text-sm">
                    حالة الجهاز: <strong>{device.status}</strong>
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Devices;
