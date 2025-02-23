const PaymentDetails = ({ firstName, setFirstName, lastName, setLastName, selectedAddress, phoneNumber, setPhoneNumber }) => {
    return (
      <>
        <h3 className="text-2xl font-medium my-6">تفاصيل الدفع</h3>
        <div className="flex flex-col md:flex-row lg:gap-8 gap-4 w-full">
          <div className="my-4 w-full">
            <label className="block mb-3 font-medium">الاسم الأول</label>
            <input
              className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="my-4 w-full">
            <label className="block mb-3 font-medium">الاسم الثاني</label>
            <input
              className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
  
        <div className="flex flex-col md:flex-row lg:gap-8 gap-4 w-full">
          <div className="my-4 w-full">
            <label className="block mb-3 font-medium">العنوان</label>
            <input
              className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
              type="text"
              value={selectedAddress ? selectedAddress.address : ""}
              readOnly
            />
          </div>
          <div className="my-4 w-full">
            <label className="block mb-3 font-medium">رقم الهاتف</label>
            <input
              className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
      </>
    );
  };
  
  export default PaymentDetails;
  