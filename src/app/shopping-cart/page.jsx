"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import FavouriteProducts from "../components/FavouriteProducts";
import CartItem from "./CartItem";
import DiscountSection from "./DiscountSection";

const ShoppingCart = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const [discountedTotal, setDiscountedTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const token = Cookies.get("token");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      enqueueSnackbar("من فضلك سجل الدخول أولًا قبل متابعة الطلب.", { variant: "error" });
      return;
    }
    if (cartItems.length === 0) {
      enqueueSnackbar("عربة التسوق فارغة.", { variant: "error" });
      return;
    }
    const total = discountApplied ? discountedTotal : cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    router.push(`/shopping-cart/confirm-request?total=${total}`);
  };

  return (
    <section className="sm:w-full container mx-auto flex flex-col px-4 md:w-[82%]  ">
      <form onSubmit={handleSubmit}>
        <div className="w-full flex lg:flex-row  flex-col justify-between px-6 ">
          <div>
            {cartItems.map(product => (
              <CartItem key={product.id} product={product} handleRemoveFromCart={() => dispatch(removeFromCart({ id: product.id }))} handleUpdateQuantity={(id, quantity) => dispatch(updateQuantity({ id, quantity }))} />
            ))}
          </div>
          <DiscountSection cartItems={cartItems} setDiscountedTotal={setDiscountedTotal} setDiscountApplied={setDiscountApplied} discountApplied={discountApplied} discountedTotal={discountedTotal} handleSubmit={handleSubmit}/>
        </div>
      </form>
      <FavouriteProducts title="المنتجات المفضلة" />
    </section>
  );
};

export default ShoppingCart;
