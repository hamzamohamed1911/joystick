"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { Autoplay } from "swiper/modules";

const WhyChooseJoyStick = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}HomePage`, { cache: "no-store" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch banners");
        }
        return response.json();
      })
      .then((data) => {
        setBanners(Array.isArray(data?.data?.banners) ? data.data.banners : []);
      })
      .catch((error) => {
        console.error("❌ Error fetching banners:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="lg:max-w-screen-xl w-full container mx-auto lg:py-6 justify-center items-center p-4  ">
      <Swiper
        spaceBetween={10}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        modules={[Navigation, Autoplay]}
        breakpoints={{
          400: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
          },
        }}
      >
        {loading ? (
          <SwiperSlide></SwiperSlide>
        ) : error ? (
          <SwiperSlide>
            <p className="text-red-500">{error}</p>
          </SwiperSlide>
        ) : banners.length > 0 ? (
          banners.map((banner) => (
            <SwiperSlide key={banner.id}>
              <Image
                src={banner.banner}
                alt="Banner Image"
                width={500}
                height={300}
                className="rounded-2xl w-full  object-cover max-h-[250px] max-w-2xl"
                priority
                quality={100}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <p className="text-gray-500">No banners available.</p>
          </SwiperSlide>
        )}
      </Swiper>
    </section>
  );
};

export default WhyChooseJoyStick;
