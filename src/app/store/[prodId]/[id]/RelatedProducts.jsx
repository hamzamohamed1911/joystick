"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { favouiteHeart, favouiteIcon, addIcon } from "../../../../../public";
import Cookies from "js-cookie";

const RelatedProducts = ({ title, categoryId, currentProductId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const token = Cookies.get("token");
  useEffect(() => {
    const fetchRelatedProducts = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      console.log("🔹 Fetching related products...");
      console.log("🟢 API URL:", `${apiUrl}products/filter`);
      console.log("🟠 Sending category_id:", categoryId);
  
      try {
        const response = await fetch(`${apiUrl}products/filter`, {
          method: "POST", // تغيير الميثود إلى POST
          headers: {
            "Content-Type": "application/json",
            "lang": "ar",
          },
          body: JSON.stringify({ category_id: categoryId }), // إرسال الكاتيجوري في البودي
        });
  
        console.log("🔵 Response Status:", response.status);
  
        if (!response.ok) {
          throw new Error(`❌ Failed to fetch related products. Status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("🟢 Fetched Data:", data);
  
        setRelatedProducts(data.data?.data.filter((p) => p.id !== currentProductId));
      } catch (error) {
        console.error("🔴 Error fetching related products:", error);
      }
    };
  
    if (categoryId) {
      fetchRelatedProducts();
    }
  }, [categoryId, currentProductId]);
  

  return (
    <div className="flex flex-col my-8 container">
      {token && <h1 className="font-bold text-2xl py-4 text-start">{title}</h1>}
      <div className="flex-wrap flex justify-start items-center gap-8">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 md:w-[340px] w-[300px] flex flex-col justify-between"
          >
            <div className="relative bg-[#F2FAFA] h-48 rounded-lg flex justify-center items-center">
              <div className="absolute top-1 left-1 cursor-pointer">
                <Image
                  src={favouiteHeart} 
                  alt="Favorite Icon"
                  width={56}
                  height={56}
                  className="transition duration-200 ease-in-out"
                />
              </div>
              <Image
                src={product.main_image}
                alt={product.name}
                width={80}
                height={80}
                className="fill max-h-40"
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <h3 className="text-sm text-gray-700 font-semibold">
                {product.name.length > 25 ? product.name.slice(0, 25) + "..." : product.name}
              </h3>
              <p className="text-lg font-medium text-primary">{product.price} ج.م</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-700">
                {product.small_description.length > 60
                  ? product.small_description.slice(0, 40) + "..."
                  : product.small_description}
              </p>
              <div>
                <Image
                  src={addIcon}
                  alt="Add Icon"
                  className="cursor-pointer"
                  onClick={() => console.log("Add to cart:", product.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
