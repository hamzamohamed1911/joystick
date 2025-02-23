"use client";
import { useEffect, useState } from "react";
import { addIcon, favouiteHeart, favouiteIcon } from "../../../../public";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {  useQueryClient } from '@tanstack/react-query';
import { useToggleFavorite } from "./_favFunctions/useToggleFavorite";

import Cookies from "js-cookie";



const FilteredProducts = ({ products }) => {
  const [favorites, setFavorites] = useState({});
  const [filteredProducts, setFilteredProducts] = useState(products);
  const route = useRouter()
  const queryClient = useQueryClient();
  const { toggleFavorite } = useToggleFavorite(setFavorites);

  useEffect(() => {
    const storedFavorites = Cookies.get("favorites");
    setFavorites(storedFavorites ? JSON.parse(storedFavorites) : {});
  }, []);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  const dispatch = useDispatch();

  const handleAddToCart = (name, id) => {
    const firstName = encodeURIComponent(name.split(' ')[0]);
    route.push(`/store/${firstName}/${id}`);
  };

  return (
    <section className="flex flex-col justify-center items-center my-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-1">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 lg:max-w-72 md:max-w-64 max-w-60 flex flex-col justify-between "
          >
            {/* Product Image */}
            <div className="relative bg-[#F2FAFA] h-48 rounded-lg flex justify-center items-center">
              {/* Favorite Icon */}
              <div
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-1 left-1 cursor-pointer"
              >
                <Image
                  src={favorites[product.id] ? favouiteHeart : favouiteIcon}
                  alt="Favorite Icon"
                  className={`transition duration-200 ease-in-out ${favorites[product.id] ? "text-red-500" : "text-gray-400"
                    }`}
                />
              </div>

              {/* Product Image */}
              <Image
                src={product.main_image}
                alt={product.description}
                width={120}
                height={120}
                className="fill max-h-40"
              />
            </div>

            {/* Product Info */}
            <div className="flex justify-between items-center mt-4">
              <h3 className="text-sm text-gray-700 font-semibold">
                {truncateText(product.name, 30)}
              </h3>
              <p className="text-lg font-medium text-primary mr-1">
                {product.price}
              </p>
            </div>

            {/* Product Description */}
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-gray-700">
                {truncateText(product.small_description, 90)}
              </p>
              <Image
                src={addIcon.src}
                alt="Add Icon"
                width={38}
                height={38}
                className="cursor-pointer mr-1"
                onClick={() => handleAddToCart(product.name, product.id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};



export default FilteredProducts;
