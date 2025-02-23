"use client";
import { useParams } from "next/navigation";
import { joystic2 } from "../../../../../../public";
import Image from "next/image";

const DevicePage = () => {
  const { device } = useParams();

  return (
    <section className="flex flex-col px-4 md:px-6 h-full text-lg">
      <div className="border border-[#E4E7E9] h-full w-full rounded-md shadow-md">
        <div className="border-b border-[#E4E7E9] py-4 px-4 md:px-6">
          <h1 className="font-semibold ">الاجهزة</h1>
        </div>

        {/* Centered Image and Device Title */}
        <div className="flex flex-col items-center mx-auto space-y-6  max-w-5xl container h-full w-full px-4">
          <div className="my-8">
            <Image alt="joystick image" width={200} src={joystic2} />
          </div>
          <h1 className="text-lg font-semibold text-center">جهاز: {device}</h1>
          <div className="border-b border-[#E4E7E9] w-full pb-5"></div>

          {/* Left-Aligned Device Information */}
          <div className="w-full px-2 md:px-6 font-medium space-y-10">
            <div className="grid grid-cols-12 gap-4 md:gap-10">
              <h3 className="col-span-12 md:col-span-6 lg:col-span-4">
                عدد الأجهزة: <strong>1</strong>
              </h3>
              <h3 className="col-span-12 md:col-span-6 lg:col-span-4">
                رقم الطلب: <strong>001</strong>
              </h3>
            </div>
            <div className="grid grid-cols-12 gap-4 md:gap-10 ">
              <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-1">
                <h3>الوقت والتاريخ</h3>
                <p>25 مايو 2024 03:00ص</p>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-1">
                <h3>العنوان </h3>
                <p>عباس العقاد - مدينة نصر </p>
              </div>
              <div className="col-span-12 md:col-span-6 lg:col-span-4 space-y-1">
                <h3>رقم الهاتف </h3>
                <p>0123456789</p>
              </div>
            </div>
            <div>
              <h3>تفاصيل الطلب</h3>
              <p className="my-3 max-w-3xl lg:text-lg  text-sm leading-normal md:text-base">
              هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن هنالك العديد من الأنواع المتوفرة لنصوص لوريم إيبسوم، ولكن الغالبية تم تعديلها بشكل ما عبر إدخال بعض النوادر أو الكلمات العشوائية إلى النص. إن كنت تريد أن 
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevicePage;
