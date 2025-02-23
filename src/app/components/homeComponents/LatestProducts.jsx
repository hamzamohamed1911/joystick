"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { addIcon, favouiteIcon, favouiteHeart } from "../../../../public";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { useQueryClient } from '@tanstack/react-query';
import { useToggleFavorite } from "./_favFunctions/useToggleFavorite";
import Cookies from "js-cookie";



export const ProductCard = ({ product, favorites, toggleFavorite }) => {
  const route = useRouter();

  const handleAddToCart = (name, id) => {
    const firstName = encodeURIComponent(name.split(" ")[0]);
    route.push(`/store/${firstName}/${id}`);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div className="rounded-lg shadow-md p-4 m-4 lg:max-w-72 md:max-w-64 flex flex-col shrink-0 lg:w-[275px] w-64">
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
        <Link href={`/store/${encodeURIComponent(product.name.split(' ')[0])}/${product.id}`}>
          <Image
            src={product.main_image}
            alt={product.name}
            width={120}
            height={120}
            className="fill max-h-40"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center mt-4">
        <h3 className="text-sm text-gray-700 font-semibold max-w-[20ch]">
          {truncateText(product.name, 30)}
        </h3>
        <p className="text-lg font-medium text-primary">{product.price}</p>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm text-gray-700">
          {truncateText(product.small_description, 60)}
        </p>
        <Image
          src={addIcon}
          alt="Add Icon"
          className="cursor-pointer"
          onClick={() => handleAddToCart(product.name, product.id)}
        />
      </div>
    </div>
  );
};

const LatestProducts = () => {
  const [favorites, setFavorites] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const queryClient = useQueryClient();
  const { toggleFavorite } = useToggleFavorite(setFavorites);

  useEffect(() => {
    const storedFavorites = Cookies.get("favorites");
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : {});
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
          headers: {
            "Content-Type": "application/json",
            "lang": "ar",
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <section className="lg:max-w-screen-xl w-full container mx-auto py-6 flex flex-col justify-center items-center p-10 space-y-8">
      <h1 className="font-bold text-2xl py-4 text-center">احدث المنتجات</h1>

      <Swiper
        modules={[Navigation]}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 0 },
          900: { slidesPerView: 3 },
          1204: { slidesPerView: 4 },
        }}
        className="w-full flex justify-around items-center"
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard
              product={product}
              favorites={favorites}
              toggleFavorite={(id) => toggleFavorite(id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};


export default LatestProducts;
