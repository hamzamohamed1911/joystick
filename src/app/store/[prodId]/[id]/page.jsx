"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSnackbar } from "notistack";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/cartSlice";
import "react-loading-skeleton/dist/skeleton.css";
import MainImageSwitcher from "@/app/components/MainImageSwitcher";
import FavouriteProducts from "@/app/components/FavouriteProducts";
import { add, addIcon4, favouiteHeart, favouiteIcon, minus } from "../../../../../public";
import ProductDetailLoader from "@/app/components/ProductDetailLoader";
import ProductDescription from "@/app/components/ProductDescription";
import { useToggleFavorite } from "../../../components/homeComponents/_favFunctions/useToggleFavorite";
import Cookies from "js-cookie";
import { useMutation } from '@tanstack/react-query';
import RelatedProducts from "./RelatedProducts";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [availableQuantity, setAvailableQuantity] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  // Use the same useToggleFavorite hook
  const [favorites, setFavorites] = useState({});
  const { toggleFavorite } = useToggleFavorite(setFavorites);

  // Mutation for adding to cart
  const addToCartMutation = useMutation({
    mutationFn: async (cartItem) => {
      const response = await fetch(`${apiUrl}carts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
          , 'Authorization': `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add product to cart');
      }

      return response.json();
    },
    onSuccess: () => {
      enqueueSnackbar("تمت إضافة المنتج إلى السلة بنجاح!", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "right" },
        style: { backgroundColor: "#02A09B", color: "#FFFFFF" },
      });
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    },
  });


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${apiUrl}products/${id}`, {
          headers: {
            "Content-Type": "application/json",
            "lang": "ar",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.data);

        // Retrieve favorite products from cookies
        const storedFavorites = Cookies.get("favorites");
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const token = Cookies.get('token');

    if (!token) {
      enqueueSnackbar("يرجى تسجيل الدخول لإضافة المنتج إلى السلة", { variant: "error" });
      return;
    }

    if (!selectedColor) {
      enqueueSnackbar("يرجى اختيار لون قبل الإضافة إلى السلة", { variant: "error" });
      return;
    }

    const cartItem = {
      product_id: product.id,
      quantity,
      color: selectedColor,
    };

    addToCartMutation.mutate(cartItem);

    dispatch(addToCart({
      ...product,
      selectedColor,
      quantity,
    }));
  };


  const handleColorSelect = (color) => {
    const colorData = product.product_colors.find((c) => c.color === color);
    if (colorData) {
      setSelectedColor(color);
      setAvailableQuantity(colorData.quantity);
      setQuantity(1);
    }
  };

  const handleIncrease = () => {
    if (quantity < availableQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (loading) {
    return <ProductDetailLoader />;
  }

  if (error) {
    return (
      <section className="flex flex-col justify-center items-center my-8">
        <h1 className="font-bold text-2xl py-4 text-center">حدث خطأ</h1>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="flex flex-col justify-center items-center my-8">
        <h1 className="font-bold text-2xl py-4 text-center">
          لم يتم العثور على المنتج
        </h1>
      </section>
    );
  }

  return (
<section className="mx-auto p-6 md:p-16 md:space-y-16 space-y-6 justify-center max-w-[1350px]">
<div className="flex lg:flex-row flex-col w-full h-full gap-8">
        <MainImageSwitcher image={product.main_image} images={product.images} />
        <div className="flex w-full flex-col gap-2 space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">{product.name}</h1>
            <button
              className="shrink-0"
              onClick={() => toggleFavorite(product.id)}
            >
              <Image
                width={70}
                src={favorites[product.id] ? favouiteHeart : favouiteIcon}
                alt="Favorite Icon"
                className="shrink-0"
              />
            </button>
          </div>

          <ProductDescription description={product.description} />

          <div className="flex flex-col gap-2">
            <label className="text-lg font-medium">الألوان</label>
            <div className="flex items-center gap-4">
              {product.product_colors?.map(({ color, quantity }) => (
                <label
                  key={color}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    className="hidden"
                    onChange={() => handleColorSelect(color)}
                  />
                  <span
                    className={`w-6 h-6 rounded-full border-2 ${selectedColor === color
                      ? "border-primary"
                      : "border-gray-300"
                      }`}
                    style={{ backgroundColor: color }}
                  ></span>
                </label>
              ))}
            </div>
          </div>

          <p className="text-3xl font-medium">{product.price}</p>

          <div className="flex justify-between gap-4 font-bold">
            <div className="flex flex-col gap-2 ">
              <div className="gap-3 items-center flex">
                <button onClick={handleDecrease} disabled={quantity === 1}>
                  <Image src={minus} alt="Minus Icon" className="w-7" />
                </button>
                <span className="text-xl">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  disabled={quantity >= availableQuantity}
                >
                  <Image src={add} alt="Add Icon" className="w-7" />
                </button>
              </div>
              <p className="text-sm">
                {selectedColor
                  ? `الكمية المتاحة: ${availableQuantity}`
                  : "يرجى اختيار لون"}
              </p>
            </div>
            <button
              className="w-48 bg-primary py-4 px-2 rounded-xl text-white flex gap-3 items-center justify-center "
              onClick={handleAddToCart}
            >

              <Image alt="Add Icon" src={addIcon4} />
              أضف الى العربة
            </button>
          </div>
        </div>
      </div>
      {/* <RelatedProducts
        title="منتجات ذات صلة"
        categoryId={product.category_id}
        currentProductId={product.id}
      />     */}
      </section>
  );
};

export default ProductDetail;