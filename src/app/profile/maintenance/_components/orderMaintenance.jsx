import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import GoogleMapMaintenance from "@/app/components/profileComponents/GoogleMapMaintenance";

const fetchAddresses = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("Unauthorized: No token found");
    }

    const response = await fetch(`${apiUrl}user/get-details`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === 401) {
        throw new Error("Unauthorized: Please log in again");
    }

    const data = await response.json();
    if (!data.success) throw new Error("Failed to fetch addresses");

    return data.data.addresses || [];
};

const OrderMaintenance = () => {
    const queryClient = useQueryClient();
    const { data: addresses, isLoading, isError } = useQuery({
        queryKey: ["addresses"],
        queryFn: fetchAddresses,
    });

    const [selectedAddress, setSelectedAddress] = useState("");
    const [selectedBuilding, setSelectedBuilding] = useState("");
    const [selectedFloor, setSelectedFloor] = useState("");
    const [selectedApartment, setSelectedApartment] = useState("");

    // Handle address selection
    const handleAddressChange = (e) => {
        const addressValue = e.target.value;
        setSelectedAddress(addressValue);

        // Find the corresponding address details
        const selectedData = addresses.find((addr) => addr.address === addressValue);
        if (selectedData) {
            setSelectedBuilding(selectedData.building_number || "");
            setSelectedFloor(selectedData.floor_number || "");
            setSelectedApartment(selectedData.apartment_number || "");
        }
    };

    if (isLoading) return <p>Loading addresses...</p>;
    if (isError) return <p>Error fetching addresses</p>;

    return (
        <div className="border-b-[1px] border-solid border-[rgb(228,231,233)] py-4 px-6 items-center">
            <h1 className="font-medium">طلب صيانة</h1>
            <form className="p-6 w-full">
                <div className="grid md:grid-cols-12 grid-cols-1 gap-6">
                    {/* Address Dropdown */}
                    <div className="col-span-6 w-full">
                        <label> العنوان</label>
                        <select
                            className="text-xs mb-3 mt-1 focus:border-primary px-5 py-3 border border-gray-300 text-gray-800 shadow-sm focus:outline-none rounded-[8px] w-full"
                            value={selectedAddress}
                            onChange={handleAddressChange}
                        >
                            <option value="">اختر العنوان</option>
                            {addresses.map((address, index) => (
                                <option key={index} value={address.address}>
                                    {address.address}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Building, Floor, Apartment Dropdowns (Disabled) */}
                    <div className="col-span-6 w-full grid grid-cols-3 gap-x-2">
                        <div>
                            <label> رقم العمارة</label>
                            <select
                                className="text-xs mb-3 mt-1 focus:border-primary px-5 py-3 border border-gray-300 text-gray-800 shadow-sm focus:outline-none rounded-[8px] w-full"
                                value={selectedBuilding}
                                disabled
                            >
                                <option value="">{selectedBuilding || "اختر رقم العمارة"}</option>
                            </select>
                        </div>
                        <div>
                            <label> رقم الدور</label>
                            <select
                                className="text-xs mb-3 mt-1 focus:border-primary px-5 py-3 border border-gray-300 text-gray-800 shadow-sm focus:outline-none rounded-[8px] w-full"
                                value={selectedFloor}
                                disabled
                            >
                                <option value="">{selectedFloor || "اختر رقم الدور"}</option>
                            </select>
                        </div>
                        <div>
                            <label> رقم الشقة</label>
                            <select
                                className="text-xs mb-3 mt-1 focus:border-primary px-5 py-3 border border-gray-300 text-gray-800 shadow-sm focus:outline-none rounded-[8px] w-full"
                                value={selectedApartment}
                                disabled
                            >
                                <option value="">{selectedApartment || "اختر رقم الشقة"}</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Google Map Component */}
                <GoogleMapMaintenance />

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="w-[150px] text-lg text-center py-2 my-2 bg-primary text-white rounded-lg"
                    >
                        تأكيد
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderMaintenance;
