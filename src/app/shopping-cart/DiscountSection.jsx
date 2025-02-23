import { useState } from "react";
import Cookies from "js-cookie";
import { useSnackbar } from "notistack";

const DiscountSection = ({ cartItems, setDiscountedTotal, setDiscountApplied, discountApplied, discountedTotal, handleSubmit }) => {
    const [discountCode, setDiscountCode] = useState("");
    const { enqueueSnackbar } = useSnackbar();

    const snackbarStyles = {
        success: { backgroundColor: "#02A09B", color: "#FFFFFF" },
    };

    const applyDiscount = async () => {
        const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            const response = await fetch(`${apiUrl}coupons/apply-coupon`, {
                method: 'POST',
                headers: {
                    "lang": "ar",
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('token')}`
                },
                body: JSON.stringify({ code: discountCode, total_price: totalPrice })
            });

            const data = await response.json();
            if (data.success) {
                setDiscountedTotal(data.data);
                setDiscountApplied(true);
                enqueueSnackbar("تم تطبيق الخصم بنجاح!", { variant: "success", style: snackbarStyles.success });
            } else {
                enqueueSnackbar("كود الخصم غير صالح", { variant: "error" });
            }
        } catch (error) {
            enqueueSnackbar("حدث خطأ أثناء تطبيق الخصم", { variant: "error" });
        }
    };

    return (
        <div className="xl:max-w-[400px] lg:max-w-[350px] w-full my-6">
            <h1 className="text-2xl font-medium">كود الخصم</h1>
            <div className="flex row gap-1 items-center">
                <input
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="ادخل كود الخصم"
                    className="my-4 px-5 py-3 text-sm border bg-[#FBFBFB] border-[#8686861A] text-gray-800 shadow-sm rounded-[8px] w-full"
                    type="text"
                />
                <button type="button" onClick={applyDiscount} className="text-center max-h-12 bg-primary text-white rounded-lg p-[10px]">
                    تطبيق
                </button>
            </div>
            <div className="text-[#A6A798] flex justify-between font-semibold text-lg my-4">
                <span>السعر :</span>
                <span>{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)} جنيه</span>
            </div>
            {discountApplied && (
                <div className="text-[#A6A798] flex justify-between font-semibold text-lg my-4">
                    <span>السعر بعد الخصم:</span>
                    <span>{discountedTotal} جنيه</span>
                </div>
            )}
            <button
                type="button"
                onClick={handleSubmit}
                className={`w-full text-center py-3 my-2 rounded-lg ${cartItems.length === 0
                        ? "bg-primary text-white hover:bg-[#028b85] cursor-not-allowed"
                        : "bg-primary text-white hover:bg-[#028b85] transition-all"
                    }`}
                disabled={cartItems.length === 0}
            >
                استكمال عملية الشراء
            </button>

        </div>
    );
};

export default DiscountSection;
