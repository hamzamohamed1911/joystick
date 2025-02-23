"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";

const fetchProducts = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${apiUrl}products`);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const jsonData = await response.json();
  return jsonData.data.data;
};

const SalaryRange = ({ onPriceRangeChange }) => {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const prices = products?.map((product) => parseFloat(product.price)) || [];
  const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
  const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

  const [range, setRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    setRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const debouncedPriceChange = debounce((newRange) => {
    onPriceRangeChange({ price_from: newRange[0], price_to: newRange[1] });
  }, 500); // تأخير 500ms

  const handleInputChange = (index, value) => {
    const newRange = [...range];
    newRange[index] = value === "" ? "" : Number(value);
    newRange[index] = isFinite(newRange[index]) ? newRange[index] : range[index];
    setRange(newRange);
  };

  const handleSliderChange = (event, newValue) => {
    const [priceFrom, priceTo] = newValue;
    const validatedPriceFrom = isFinite(priceFrom) ? priceFrom : minPrice;
    const validatedPriceTo = isFinite(priceTo) ? priceTo : maxPrice;
    setRange([validatedPriceFrom, validatedPriceTo]);
    debouncedPriceChange([validatedPriceFrom, validatedPriceTo]);
  };

  const handleBlur = () => {
    const validatedRange = [
      Math.max(minPrice, Math.min(maxPrice, range[0])) || minPrice,
      Math.max(minPrice, Math.min(maxPrice, range[1])) || maxPrice,
    ];
    setRange(validatedRange);
    onPriceRangeChange({ price_from: validatedRange[0], price_to: validatedRange[1] });
  };

  if (isLoading) return <p className="text-gray-500 mt-4">جار تحميل السعر ...</p>;
  if (error) return <p>حدث خطأ</p>;

  return (
    <div className="flex flex-col">
      <h3 className="font-medium text-xl mb-4">السعر</h3>
      <Slider
        value={range}
        onChange={handleSliderChange}
        min={minPrice}
        max={maxPrice}
        disableSwap
        valueLabelDisplay="auto"
        
        sx={{
          color: "#02A09B",
          maxWidth: 300,
          direction: 'rtl',
        }}
      />
      <div className="flex mt-4 gap-4 w-full">
        <div className="w-full">
          <label className="block text-sm font-medium my-1">أقل سعر</label>
          <input
            type="number"
            value={range[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            onBlur={handleBlur}
            min={minPrice}
            max={range[1]}
            className="border px-2 py-2 focus:border-primary text-md border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium my-1">أعلى سعر</label>
          <input
            type="number"
            value={range[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            onBlur={handleBlur}
            min={range[0]}
            max={maxPrice}
            className="border px-2 py-2 focus:border-primary text-md border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SalaryRange;