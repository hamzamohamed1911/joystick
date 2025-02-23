"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import Loading from "@/app/components/Loading";
import FavouriteProducts from "@/app/components/FavouriteProducts";
import { addIcon, favouiteHeart, favouiteIcon } from "../../../../public";
import { useToggleFavorite } from "../../components/homeComponents/_favFunctions/useToggleFavorite";
import { useQuery } from "@tanstack/react-query"; 
import { useState } from "react";

const CategoryProducts = () => {
  const { prodId } = useParams();
  const router = useRouter();
  const filters = useSelector((state) => state.filters);

  // Initialize favorites from cookies
  const storedFavorites = Cookies.get("favorites");
  const [favorites, setFavorites] = useState(
    storedFavorites ? JSON.parse(storedFavorites) : {}
  );

  // Use custom hook to handle favorite toggling
  const { toggleFavorite } = useToggleFavorite(setFavorites);

  // Fetch Products Function
  const fetchProducts = async (filters) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${apiUrl}products/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        lang: "ar",
      },
      body: JSON.stringify({ ...filters, category_id: prodId }),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  };

  // Use useQuery to fetch and cache products
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", prodId, filters], // مفتاح فريد لكل مجموعة منتجات
    queryFn: () => fetchProducts(filters),
    staleTime: 1000 * 60 * 5, // البيانات تصبح قديمة بعد 5 دقائق
    cacheTime: 1000 * 60 * 10, // البيانات تُحذف من الذاكرة المؤقتة بعد 10 دقائق
  });

  // Function to Navigate to Product Page
  const handleAddToCart = (name, id) => {
    const firstName = encodeURIComponent(name.split(" ")[0]);
    router.push(`/store/${firstName}/${id}`);
  };

  // Function to Truncate Text
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  // Show Loading Spinner if Data is Loading
  if (isLoading) return <Loading />;

  // Show Error Message if API Call Fails
  if (error)
    return (
      <section className="flex flex-col justify-center items-center my-8">
        <h1 className="font-bold text-2xl py-4 text-center">حدث خطأ</h1>
        <p className="text-red-500">{error.message}</p>
      </section>
    );

  // Show message if no products are found
  if (!isLoading && products.length === 0) {
    return (
      <section className="flex flex-col justify-center items-center my-8">
        <h1 className="font-bold text-2xl py-4 text-center">لا توجد منتجات متاحة</h1>
        <p className="text-gray-500">جرّب تعديل الفلاتر أو استكشاف فئات أخرى.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-1">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 lg:max-w-72 md:max-w-64 max-w-60 flex flex-col justify-between"
          >
            {/* Product Image & Favorite Icon */}
            <div className="relative bg-[#F2FAFA] h-48 rounded-lg flex justify-center items-center">
              <div
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-1 left-1 cursor-pointer"
              >
                <Image
                  src={favorites[product.id] ? favouiteHeart : favouiteIcon}
                  alt="Favorite Icon"
                  className="transition duration-200 ease-in-out"
                />
              </div>
              <Image
                src={product.main_image}
                alt={product.name}
                width={90}
                height={90}
                className="object-cover"
              />
            </div>

            {/* Product Name & Price */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-sm text-gray-700 font-semibold">
                {truncateText(product.name, 50)}
              </h3>
              <p className="text-lg font-medium text-primary mr-1">
                {product.price}
              </p>
            </div>

            {/* Description & Add to Cart */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-700">
                {truncateText(product.small_description, 100)}
              </p>
              <Image
                src={addIcon.src}
                alt="Add Icon"
                width={38}
                height={38}
                className="cursor-pointer mr-1"
                onClick={() => handleAddToCart(product.name, product.id)}
              />
            </div>
          </div>
        ))}
      </div>
      <FavouriteProducts title="المنتجات المفضلة" />
    </section>
  );
};

export default CategoryProducts;