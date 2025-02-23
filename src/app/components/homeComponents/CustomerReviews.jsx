"use client";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { SliderVector, userReview } from "../../../../public";

const reviews = [
  {
    id: 1,
    name: "John Doe",
    text: "هذه مراجعة رائعة جدًا! أوصي بهذا المنتج بشدة.",
  },
  {
    id: 2,
    name: "Jane Smith",
    text: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص أو شكل توضع الفقرات في الصفحة التي يقرأها. ولذلك يتم استخدام طريقة لوريم إيبسوم لأنها تعطي توزيعاَ طبيعياَ -إلى حد ما- للأحرف عوضاً عن استخدام "
  },
  {
    id: 3,
    name: "Ali Ahmed",
    text: "منتج جيد جدًا وأنا راضٍ تمامًا عن الخدمة.",
  },
];

const CustomerReviews = () => {
  return (
    <section className="mx-auto max-w-5xl w-full  container py-6 flex flex-col justify-center text-center items-center relative mb-14 ">
      <div className="space-y-2 mb-14">
        <h1 className="font-bold text-3xl ">آراء العملاء</h1>
        <p className="text-[#6D7280] md:text-xl">
          هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة
        </p>
      </div>

      {/* Background Image */}
      <div className="absolute  md:left-1/4  transform  lg:translate-y-1/4 translate-y-1/4 md:w-auto w-full md:translate-x-1/2 translate-x-1/2 opacity-85 ">
        <Image
          className="object-cover"
          src={SliderVector}
          alt="Background"
        />
      </div>

      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        modules={[Navigation]}
        navigation
        className="w-full z-10 "
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id} className="flex justify-center h-full  ">
            <div className="relative max-w-2xl mx-auto cursor-pointer w-full   px-6   ">

              <div className="absolute min-w-3xl   h-64  top-6 -right-7 w-full  bg-white rounded-2xl -z-20 border border-gray-200"></div>
              <div className="absolute  min-w-3xl  h-72 top-3 -right-2 w-full  bg-white rounded-2xl -z-10 border border-gray-200"></div>

              {/* Review Content */}
              <div className="mt-8 pb-4 px-4 bg-white text-black rounded-2xl shadow-lg space-y-4 min-h-56  border border-gray-200 flex flex-col items-center justify-center">
                <p className="text-black md:text-lg text-md p-4">{review.text}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default CustomerReviews;
