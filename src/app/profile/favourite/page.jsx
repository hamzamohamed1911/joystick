"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIcon, favouiteHeart, favouiteIcon } from "../../../../public";

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

const Favourite = ({ title }) => {
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

  useEffect(() => {
    const storedFavorites = Cookies.get("favorites");
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : {};

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
    <section className="flex flex-col md:px-4 px-6 h-full max-w-[1120px]">
    <div className="border-[1px] border-[#E4E7E9] border-solid md:text-lg text-md h-full w-full">
      <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 items-center flex">
        {token && <h1 className="font-semibold">{title}</h1>}
      </div>
      {FavData?.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 p-6 lg:mx-20">
          {FavData.map((product) => (
            <div key={product.id} className="w-full">
              <div className="p-6 rounded-lg shadow-lg relative flex flex-col md:flex-row items-center gap-6">
                <div className="bg-[#F2FAFA] flex w-full md:w-auto justify-center items-center rounded-xl">
                  <Image width={160} height={160} src={product.main_image} alt={product.name} />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="font-medium md:text-2xl text-lg">
                      {product.name.length > 25 ? product.name.slice(0, 25) + "..." : product.name}
                    </h2>
                    <div
                      onClick={() => toggleFavoriteMutation.mutate(product.id)}
                      className="md:w-14 w-12 cursor-pointer shrink-0"
                    >
                      <Image
                        src={favorites[product.id] ? favouiteIcon : favouiteHeart}
                        alt="Favorite Icon"
                        className="transition duration-200 ease-in-out md:w-14 w-12"
                      />
                    </div>
                  </div>
                  <p className="text-[#737791] max-w-72">
                    {product.small_description.length > 60
                      ? product.small_description.slice(0, 60) + "..."
                      : product.small_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <h2 className="text-primary font-semibold">{product.price}</h2>
                    <div onClick={() => handleAddToCart(product.name, product.id)} className="cursor-pointer md:w-14 w-12">
                      <Image src={addIcon} alt="Add Icon" className="md:w-14 w-12" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-[50vh]">
          <p className="text-xl font-semibold">عذراً، لا توجد بيانات لعرضها</p>
        </div>
      )}
    </div>
  </section>
  
  );
};

export default Favourite;