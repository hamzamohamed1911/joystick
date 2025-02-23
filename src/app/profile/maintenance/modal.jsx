import Image from "next/image";
import {

  joystic2,
} from "../../../../public";

export default function MaintanceModal({open , setOpen}) {

  const hadleModalDisplay = (e) => {
    if (e.target === e.currentTarget) {
      setOpen(!open);
    }
  }

  return(
    <>
    {
      open &&  <section onClick={hadleModalDisplay} className="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className=" border-[1px] border-[#E4E7E9] border-solid bg-white max-h-[90vh] h-[60vh] max-w-2xl overflow-auto rounded-md">
          <div className=" py-4 px-6 bg-gray-100 m-4 rounded-md">
            <h1 className=" font-semibold text-center"> تفاصيل العطل</h1>
          </div>
          <form className="p-8">
         

            <div className="my-3">
              <h3 className="text-lg font-medium"> اختر مكان العطل </h3>
              <div className="flex md:flex-row flex-col gap-6 md:justify-between justify-center my-8">
                <div className="md:max-w-[180px] w-[200px] gap-4 flex items-center flex-wrap">
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">1</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">2</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">3</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">4</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">5</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">6</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">7</span>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <input
                      type="checkbox"
                      className="appearance-none cursor-pointer h-4 w-4 rounded-full border-[4px] border-gray-300 checked:border-primary  focus:outline-none"
                    />
                    <span className="font-semibold text-xl">8</span>
                  </div>
                </div>
                <div className="flex md:justify-start justify-center md:items-start  ml-6">
                  <Image
                    alt="joy stick"
                    width={300}
                    className="object-contain"
                    src={joystic2}
                  />
                </div>
              </div>
            </div>

            <div className="my-3">
              <h3 className="text-md font-medium">  تفاصيل الطلب</h3>
              <textarea className="block mb-3 mt-2 focus:border-primary px-5 min-h-52 text-md border border-[#E4E7E9] border-solid text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"></textarea>
            </div>
            <div className="flex justify-end">
              <button className="w-[150px] text-lg text-center py-3 my-2 bg-primary text-white rounded-lg">
                تأكيد
              </button>
            </div>
          </form>
        </div>
      </section>
    }
     
    </>
  )
  
}
