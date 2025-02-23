"use client";

import React from "react";

const UserDetailsForm = ({ formik, isUpdating }) => {
  return (
    <div className="col-span-9">
      <div className="my-4">
        <label htmlFor="username" className="block mb-2 font-medium">
          الاسم
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={formik.values.username}
          onChange={formik.handleChange}
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
        />
      </div>

      <div className="my-4">
        <label htmlFor="phone" className="block mb-2 font-medium">
          رقم الهاتف
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
        />
      </div>

      <div className="my-4">
        <label htmlFor="email" className="block mb-2 font-medium">
          البريد الالكتروني
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="block mb-3 mt-1 focus:border-primary px-5 py-2 text-md border border-gray-300 text-gray-800 text-lg shadow-sm focus:outline-none rounded-[8px] w-full"
        />
      </div>

      <div className="flex justify-end my-3">
        <button
          type="submit"
          className="bg-primary text-white py-3 px-8 rounded-xl"
          disabled={isUpdating}
        >
          {isUpdating ? "جاري الحفظ..." : "حفظ التغييرات"}
        </button>
      </div>
    </div>
  );
};

export default UserDetailsForm;