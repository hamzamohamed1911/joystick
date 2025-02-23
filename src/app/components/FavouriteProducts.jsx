"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIcon, favouiteHeart, favouiteIcon } from "../../../public";
import Image from "next/image";
import Cookies from "js-cookie";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import Loading from "./Loading";
import { useRouter } from "next/navigation";

const fetchFav = async (token) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${apiUrl}products/favorited`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch favourites");
    }

    const data = await response.json();
    return data.data?.data;
  } catch (error) {
    return error.message;
  }
};

const FavouriteProducts = ({ title }) => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const token = Cookies.get("token");
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [favorites, setFavorites] = useState({});

  const { data: FavData, isLoading, isError } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => fetchFav(token),
  });

  // Load favorites from cookies for only displayed products
  useEffect(() => {
    const storedFavorites = Cookies.get("favorites");
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : {};

    // Filter only displayed products
    const filteredFavorites = Array.isArray(FavData)
      ? Object.keys(parsedFavorites)
        .filter((id) => FavData.some((p) => p.id === id))
        .reduce((acc, id) => {
          acc[id] = parsedFavorites[id];
          return acc;
        }, {})
      : {};

    setFavorites(filteredFavorites);
  }, [FavData]);

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (productId) => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${apiUrl}favorite/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to toggle favorite");
      }

      return response.json();
    },
    onSuccess: (_, productId) => {
      setFavorites((prevFavorites) => {
        const updatedFavorites = { ...prevFavorites };
        if (updatedFavorites[productId]) {
          delete updatedFavorites[productId];
        } else {
          updatedFavorites[productId] = true;
        }

        // Save only currently displayed favorites
        const displayedFavorites = Object.keys(updatedFavorites)
          .filter((id) => Array.isArray(FavData) && FavData.some((p) => p.id === id))
          .reduce((acc, id) => {
            acc[id] = true;
            return acc;
          }, {});

        Cookies.set("favorites", JSON.stringify(displayedFavorites), { expires: 7 });

        return updatedFavorites;
      });

      enqueueSnackbar("تم الإزالة من المفضلة", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        style: { backgroundColor: "#02A09B", color: "#FFFFFF" },
      });

      queryClient.invalidateQueries(["favorites"]);
    },
  });

  const handleAddToCart = (name, id) => {
    const firstName = encodeURIComponent(name.split(" ")[0]);
    router.push(`/store/${firstName}/${id}`);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-red-500 text-center mt-4">حدث خطأ أثناء جلب البيانات</p>;
  }

  return (
    <div className="flex flex-col my-8 container">
      {token && <h1 className="font-bold text-2xl py-4 text-start">{title}</h1>}
      <div className="flex-wrap flex justify-start items-center gap-8">
        {Array.isArray(FavData) && FavData.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md p-4 md:w-[340px] w-[300px] flex flex-col justify-between"
          >
            <div className="relative bg-[#F2FAFA] h-48 rounded-lg flex justify-center items-center">
              <div
                onClick={() => toggleFavoriteMutation.mutate(product.id)}
                className="absolute top-1 left-1 cursor-pointer"
              >
                <Image
                  src={favorites[product.id] ? favouiteIcon : favouiteHeart}
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
              <p className="text-lg font-medium text-primary">{product.price}</p>
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
                  onClick={() => handleAddToCart(product.name, product.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavouriteProducts;

