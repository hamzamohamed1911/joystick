import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const ProductDetailLoader = () => {
  return (
     <section  className=" mx-auto p-16 md:space-y-20 space-y-5  justify-center max-w-[1350px]">
          <div className="flex lg:flex-row flex-col w-full h-full gap-8 p-4">
            {/* صورة المنتج */}
            <div className="w-full lg:w-1/2 h-[400px]">
              <Skeleton height={400} />
            </div>
    
            {/* المعلومات النصية */}
            <div className="flex w-full flex-col gap-2 space-y-5">
              {/* اسم المنتج وزر المفضلة */}
              <div className="flex items-center justify-between">
                <Skeleton width={200} height={30} />
                <Skeleton circle width={40} height={40} />
              </div>
    
              {/* وصف المنتج */}
              <Skeleton count={3} />
    
              {/* الألوان */}
              <div className="flex flex-col gap-2">
                <Skeleton width={100} height={20} />
                <div className="flex items-center gap-4">
                  <Skeleton circle width={24} height={24} />
                  <Skeleton circle width={24} height={24} />
                  <Skeleton circle width={24} height={24} />
                </div>
              </div>
    
              {/* السعر */}
              <Skeleton width={100} height={30} />
    
              {/* أزرار التحكم في الكمية */}
              <div className="lg:flex-row flex-col flex gap-4 font-bold">
                <div className="flex flex-col gap-2">
                  <div className="gap-3 items-center flex">
                    <Skeleton circle width={28} height={28} />
                    <Skeleton width={40} height={30} />
                    <Skeleton circle width={28} height={28} />
                  </div>
                  <Skeleton width={120} height={20} />
                </div>
    
                {/* أزرار الشراء */}
                <div className="flex md:flex-row flex-col gap-4">
                  <Skeleton width={180} height={50} />
                  <Skeleton width={180} height={50} />
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default ProductDetailLoader
