const Loading = () => {
  return (
    <section className="flex flex-col md:px-4 px-6 h-full">
      <div className="border-[1px] border-[#E4E7E9] border-solid md:text-lg text-md h-full w-full">
        {/* العنوان */}
        <div className="border-b-[1px] border-solid border-[#E4E7E9] py-4 px-6 items-center flex">
          <h1 className="font-semibold">المفضلة</h1>
        </div>

        {/* شبكة البطاقات الوهمية */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 p-6 max-w-[120vh]">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="p-6 rounded-lg shadow-lg relative flex flex-col md:flex-row items-center gap-6 animate-pulse">
                {/* صورة المنتج الوهمية */}
                <div className="bg-gray-200 flex w-full md:w-auto justify-center items-center rounded-xl h-40 "></div>

                {/* تفاصيل المنتج الوهمية */}
                <div className="flex-1 space-y-3">
                  {/* العنوان وأيقونة الحذف */}
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  </div>

                  {/* الوصف الوهمي */}
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>

                  {/* السعر وأيقونة الإضافة */}
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Loading;
