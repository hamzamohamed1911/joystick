"use client";
import Address from "./_component/address";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice"; 
import OrderSummary from "./OrderSummary";
import PaymentDetails from "./PaymentDetails";
import { useSnackbar } from "notistack";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ConfirmRequest = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = Cookies.get("token");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const cartItems = useSelector((state) => state.cart.items);
  const total = searchParams.get("total") || 0;
  const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
  

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    console.log("Selected Address:", address);
  };

  const handleSubmit = async () => {
    if (!selectedAddress) {
      enqueueSnackbar("يرجى اختيار عنوان التوصيل", { variant: "error" });
            return;
    }
  
    if (!cartItems || cartItems.length === 0) {
      enqueueSnackbar("عربة التسوق فارغة", { variant: "error" });
      return;
    }
  
    const orderData = {
      address_id: selectedAddress.id,
      final_price: Number(total) + 50,
      payment_method: "cashOnDelivery",
      invoice: {
        items: cartItems.map((item) => ({
          item_id: item.id,
          quantity: parseInt(item.quantity),
          price: parseFloat(item.price),
        })),
      },
    };
  
    try {
      const response = await fetch(`${apiUrl}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
  
      if (data.success) {
        enqueueSnackbar("تم انشاء الطلب بنجاح", { variant: "success",
          anchorOrigin: { vertical: "top", horizontal: "right" },
          style: { backgroundColor: "#02A09B", color: "#FFFFFF" }, });
        dispatch(clearCart());
        router.push(`/shopping-cart`);
      } else {
        enqueueSnackbar("فشل في الطلب", { variant: "error" });      }
    } catch (error) {
      console.error("Error creating order:", error);
      enqueueSnackbar("حدث خطأ", { variant: "error" });    }
  };
  
  return (
    <section className="w-full container mx-auto flex flex-col px-4 md:w-[82%]">
      <div className="w-full flex lg:flex-row flex-col justify-between px-6">
        <div className="xl:max-w-[700px] lg:max-w-[500px] w-full">
          {token && <Address onSelectAddress={handleAddressSelect} />}
          <div className="w-full border-[1px] my-12 border-[#E4E7E9]"></div>
          <PaymentDetails 
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            selectedAddress={selectedAddress}
            phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          />
        </div>
        <OrderSummary total={total} handleSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default ConfirmRequest;
