import React from "react";
import { playIcon } from "../../../../../public";
import Image from "next/image";
import { Link } from "@mui/material";

const PreviousOperations = () => {
  return (
    <section className="flex flex-col md:px-4 px-6 h-full">
      <div className=" border-[1px] border-[#E4E7E9] border-solid h-auto    w-full">
        <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 items-center flex ">
          <h1 className=" font-semibold"> العمليات السابقة</h1>
        </div>
        <div className="lg:p-8 md:p-6 p-4 space-y-4">

          <Link href="/devices" className="no-underline	 border-solid border-[#E4E7E9] border-[1px] py-4 px-6 rounded-xl max-w-5xl min-h-[100px] flex flex-row ">
            <div className="border-l-[1px] font-medium text-black text-md space-y-2 px-2 text-center">
              <span className="block ">03:00 ص</span>
              <span className="block">25 مايو 2024</span>
            </div>
            <div className="flex justify-between w-full">
              <div className="px-2 space-y-2">
                <h3 className="text-[#C1C2B8]">
                  رقم الطلب: <strong className="text-black"> 001</strong>
                </h3>
                <p className="text-[#666666] lg:text-lg md:text-md text-sm max-w-lg">
                  هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء هناك
                  حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء
                </p>
              </div>

              <div className="self-center shrink-0">
                <Image alt="play Icon" src={playIcon} width={30} />
              </div>
            </div>
          </Link>
          
     
        </div>
      </div>
    </section>
  );
};

export default PreviousOperations;
