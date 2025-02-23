import PreviousRequestsTabs from "@/app/components/profileComponents/PreviousRequestsTabs";

const Previousrequests = () => {
  return (
    <section className="flex flex-col md:px-4 px-6 h-full">
      <div className=" border-[1px] border-[#E4E7E9] border-solid  md:text-lg text-md h-full  w-full">
        <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 items-center flex ">
          <h1 className=" font-semibold">الطلبات السابقة</h1>
        </div>
        <div className="max-w-6xl md:p-6 p-0"> 
        <PreviousRequestsTabs />
        </div>
      </div>
    </section>
  );
};

export default Previousrequests;
