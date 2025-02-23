"use client"; 

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchBrands = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch brands");
    }

    const data = await response.json();
    return Array.isArray(data?.data?.data) ? data.data.data : [];
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
};

const Brands = ({ onBrandChange }) => {
  const { data: headphoneBrands = [], isLoading, error } = useQuery({
    queryKey: ["brands"],
    queryFn: fetchBrands,
  });

  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleBrandChange = (brandId) => {
    const newSelectedBrands = selectedBrands.includes(brandId)
      ? selectedBrands.filter((id) => id !== brandId)
      : [...selectedBrands, brandId];
  
    setSelectedBrands(newSelectedBrands);
  
    onBrandChange(newSelectedBrands);
  };
  
  return (
    <div>
      <h3 className="font-medium text-xl">الأقسام</h3>

      {isLoading ? (
        <p className="text-gray-500 mt-4">جار تحميل الأقسام...</p>
      ) : error ? (
        <p className="text-red-500 mt-4">حدث خطأ في تحميل البيانات.</p>
      ) : (
        <ul className="space-y-2 text-lg flex flex-col mt-4 overflow-x-auto overflow-hidden whitespace-normal flex-grow">
          {headphoneBrands.map((brand) => (
            <li key={brand.id} className="flex items-center gap-2">
              <input
                id={`brand-${brand.id}`}
                type="checkbox"
                className="appearance-none cursor-pointer h-5 w-5 rounded-full border-[4px] border-gray-300 checked:border-primary focus:outline-none"
                onChange={() => handleBrandChange(brand.id)}
                checked={selectedBrands.includes(brand.id)}
              />
              <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Brands;
