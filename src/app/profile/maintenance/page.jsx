"use client";
import { useState } from "react";
import MaintanceModal from "./modal";
import Devices from "./_components/devices";
import OrderMaintenance from "./_components/orderMaintenance";

export default function Maintenance() {
  const [open, setOpen] = useState(false);

  return (
    <section className="flex flex-col justify-between gap-6 h-full md:p-0 p-4">
      <Devices setOpen={setOpen} />
      <div className="border-[1px] border-[#E4E7E9] border-solid h-full w-full">
       <OrderMaintenance/> 
      </div>
      
      <MaintanceModal open={open} setOpen={setOpen} />
      
    </section>
  );
}
