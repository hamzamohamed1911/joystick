"use client";
import { useState } from "react";
import Image from "next/image";

const MainImageSwitcher = ({ images, image }) => {
  const [selectedImage, setSelectedImage] = useState(image || null);

  if (!images || images.length === 0) {
    return <p className="text-center text-gray-500">No images available.</p>;
  }

  return (
    <div className="flex lg:flex-row flex-col md:gap-4 gap-4 h-full">
      <div className="flex lg:flex-col flex-row justify-center  items-center  md:gap-4 gap-2  h-auto w-auto ">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Product image ${index + 1}`}
            width={80}
            height={80}
            className={`cursor-pointer object-fill border rounded-xl xl:w-32 md:w-28 w-20 hover:border-primary xl:h-28  md:h-24 h-16 p-4 shrink-0 ${
              selectedImage === image
                ? "border-primary border-[2px]"
                : "border-gray-300"
            }`}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>

      <div className="bg-[#F2FAFA] rounded-lg lg:w-[480px]  w-auto flex justify-center items-center">
        {selectedImage ? (
           <div className="relative w-[350px] h-[350px]">
           <Image
             src={selectedImage}
             alt="Selected Product"
             fill
             className="rounded-lg object-contain"
           />
         </div>
        ) : (
          <p className="text-gray-500">No image available</p>
        )}
      </div>
    </div>
  );
};

export default MainImageSwitcher;
