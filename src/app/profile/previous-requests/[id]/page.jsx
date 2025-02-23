"use client"
import React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie"; 
import { truckIcon } from "../../../../../public";


const fetchData = async (type) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Unauthorized: No token found");
  }

  const response = await fetch(`${apiUrl}History/GetAll?type=${type}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      lang: "ar",
    },
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: Please log in again");
  }

  const data = await response.json();
  if (!data.success) throw new Error("Failed to fetch Data");
  return data.data || [];
};

const OrderDetail = ({ params }) => {
  const { id } = params;

  // Fetch data using useQuery
  const {
    data: orderData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["store"],
    queryFn: () => fetchData("store"),
  });

  // Find the specific order
  const order = orderData?.find((order) => order.id === parseInt(id));

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error.message}</p>;
  if (!order) return <p className="text-center text-gray-500">Order not found.</p>;

  return (
    <section className="flex flex-col h-full">
      <div className="border-[1px] border-[#E4E7E9] border-solid md:text-lg text-md h-full w-full">
        <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 items-center flex">
          <h1 className="font-semibold">تفاصيل الطلب - {order.order_number}</h1>
        </div>

        <div className="max-w-6xl px-6">
          <div className="flex items-center w-full h-4 bg-[#FAFAFA] rounded-full relative md:my-20 my-14">
            <div
              className="bg-primary h-full rounded-full"
              style={{ width: "30%" }}
            ></div>

            <Image
              src={truckIcon}
              alt="Truck Icon"
              className="absolute -top-11"
              style={{ left: "70%", transform: "translateX(-50%)" }}
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2 md:my-20 my-14">
            <h2 className="text-sm font-medium text-[#474747]">اجمالي الدفع</h2>
            <span className="text-3xl font-medium">
              {order.total_price} جنيه
            </span>
          </div>
          <div className="grid lg:grid-cols-2 grid-cols-1 md:gap-8 gap-6">
            <div>
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex md:flex-row flex-col items-center mb-4 p-3 border border-[#EDEDED] rounded-lg gap-3 md:h-44 h-auto"
                >
                  <div className="bg-[#F2FAFA] p-4 flex justify-center items-center h-36 md:w-36 w-full rounded-lg">
                    <Image
                      src={product.image || "/default-product-image.png"} // Add a fallback image
                      alt={product.product_name}
                      width={80}
                      height={80}
                      className="mr-3 rounded-md"
                    />
                  </div>
                  <div className="flex flex-col h-full w-full p-2">
                    <div className="flex-grow space-y-2">
                      <p className="text-lg font-semibold">
                        {product.product_name}
                      </p>
                      <p className="text-sm font-medium text-[#737791]">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                    <p className="text-lg text-black font-medium">
                      {product.price} جنيه
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="gap-4 flex-col flex">
              <div className="text-xl font-medium p-3 rounded-lg gap-2 border border-[#EDEDED]">
                <label className="text-sm text-[#707070]">رقم الطلب</label>
                <h2 className="text-gray-800 text-lg">{order.order_number}</h2>
              </div>

              <div className="text-xl font-medium p-3 rounded-lg gap-2 border border-[#EDEDED]">
                <label className="text-sm text-[#707070]">طريقة الدفع</label>
                <h2 className="text-gray-800 text-lg">{order.paymentMethod}</h2>
              </div>

              <div className="text-xl font-medium p-3 rounded-lg gap-2 border border-[#EDEDED]">
                <label className="text-sm text-[#707070]">وقت الدفع</label>
                <h2 className="text-gray-800 text-lg">{order.created_at}</h2>
              </div>

              <div className="text-xl font-medium p-3 rounded-lg gap-2 border border-[#EDEDED]">
                <label className="text-sm text-[#707070]">حالة العملية</label>
                <h2 className="text-gray-800 text-lg">{order.status}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetail;