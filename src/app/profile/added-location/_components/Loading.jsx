const Loading = () => {
  return (
    <div className="lg:p-8 md:p-6 p-4 space-y-4">
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="border-solid border-[#E4E7E9] border-[1px] py-4 px-6 rounded-xl w-full min-h-[100px] flex flex-row animate-pulse"
          >
            <div className="space-y-5 w-full">
              <div className="flex justify-between">
                <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-full"></div>
              </div>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
