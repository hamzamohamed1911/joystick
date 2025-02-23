const Loading = () => {
    return (
      <section className="lg:max-w-screen-xl w-full container mx-auto py-6 flex flex-col justify-center items-center p-4 space-y-8">
        {/* <h1 className="font-bold text-2xl py-4 text-center">احدث المنتجات</h1> */}
        <div className="lg:grid lg:grid-cols-4 overflow-auto w-full flex gap-6 ">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 lg:max-w-72 md:max-w-64 max-w-60 flex flex-col justify-between animate-pulse"
            >
              <div className="relative bg-[#F2FAFA] h-48 rounded-lg flex justify-center items-center">
                <div className="absolute top-1 left-1 cursor-pointer">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
              </div>
  
              <div className="flex justify-between items-center mt-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
  
              <div className="flex justify-between items-center mt-4">
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default Loading;
  