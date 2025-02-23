import React from 'react'

const PaymentDetails = () => {
    
    return (
        <div>
            <div className="w-full border-[1px] my-12 border-[#E4E7E9]"></div>
            <h3 className="text-2xl  font-medium my-6">تفاصيل الدفع</h3>
            <div className="flex flex-col md:flex-row lg:gap-8 gap-4  w-full">
                <div className="my-4 w-full">
                    <label className="block mb-3 font-medium"> الاسم الأول</label>
                    <input
                        className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                        type="email"
                    />
                </div>
                <div className="my-4 w-full">
                    <label className="block mb-3 font-medium"> الاسم الثاني </label>
                    <input
                        className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                        type="email"
                    />
                </div>
            </div>
            <div className="flex flex-col md:flex-row lg:gap-8 gap-4  w-full">
                <div className="my-4 w-full">
                    <label className="block mb-3 font-medium">  العنوان</label>
                    <input
                        className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                        type="email"
                    />
                </div>
                <div className="my-4 w-full">
                    <label className="block mb-3 font-medium">رقم الهاتف</label>
                    <input
                        className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
                        type="email"
                    />
                </div>
            </div>
        </div>
    )
}

export default PaymentDetails