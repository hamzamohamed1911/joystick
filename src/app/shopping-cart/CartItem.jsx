import Image from "next/image";
import { deleteIcon, add, minus } from "../../../public";

const CartItem = ({ product, handleRemoveFromCart, handleUpdateQuantity }) => {
  return (
    <div
      key={product.id}
      className="p-4 mb-4 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-12 gap-4 items-center w-full min-h-48"
    >
      <div className="bg-Secondary flex w-full justify-center items-center rounded-xl col-span-12 md:col-span-3">
        <Image width={70} height={70} src={product.main_image} alt="product" className="max-h-36" />
      </div>
      <div className="col-span-12 md:col-span-9 space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg md:text-2xl">
            {product.name.length > 30 ? product.name.slice(0, 30) + "..." : product.name}
          </h2>
          <div className="w-8 cursor-pointer" onClick={() => handleRemoveFromCart(product.id)}>
            <Image src={deleteIcon} alt="Delete Icon" className="w-7 mr-1" />
          </div>
        </div>
        <p className="text-[#737791] max-w-72">
          {product.small_description.length > 80 ? product.small_description.slice(0, 80) + "..." : product.small_description}
        </p>
        <p>
          <div className="flex items-center gap-2">
            اللون :
            <span style={{ backgroundColor: product.selectedColor, display: "inline-block", width: "20px", height: "20px", borderRadius: '50%', marginTop: 5 }}></span>
          </div>
        </p>
        <div className="flex items-center justify-between">
          <h2 className="text-black text-xl font-semibold">{product.price * product.quantity} جنيه</h2>
          <div className="flex gap-3 items-center">
            <button type="button" onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>
              <Image src={minus} alt="Minus Icon" className="w-7" />
            </button>
            <span className="font-bold text-xl">{product.quantity}</span>
            <button type="button" onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}>
              <Image src={add} alt="Add Icon" className="w-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
