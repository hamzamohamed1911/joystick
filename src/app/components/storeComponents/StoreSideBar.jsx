"use client";

import { useState } from "react";
import { FiXCircle, FiFilter } from "react-icons/fi";
import Brands from "./brands";
import SalaryRange from "./SalaryRange";
import PopularTag from "./PopularTag";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../redux/filterSlice"; 

const StoreSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch(); 
  const filters = useSelector((state) => state.filters); 

  const toggleSidebar = () => {
    setIsSidebarOpen((open) => !open);
  };

  const handleBrandChange = (brandIds) => {
    let updatedFilters = { ...filters };
  
    if (!brandIds || brandIds.length === 0) {
      updatedFilters.brand_id = null;
    } else {
      // Ensure brandIds is an array before calling join
      updatedFilters.brand_id = Array.isArray(brandIds) ? brandIds.join(',') : brandIds;
    }
  
    dispatch(setFilters(updatedFilters));
  };
  
  
  const handleTagChange = (tags) => {
    let updatedFilters = { ...filters }; 
  
    if (!tags || tags.length === 0) {
      updatedFilters.tags = null; 
    } else {
      updatedFilters.tags = tags.join(','); 
    }
  
    dispatch(setFilters(updatedFilters)); 
  };
  
  const handlePriceRangeChange = (range) => {
    const updatedFilters = { ...filters };
    if (range.price_from === null && range.price_to === null) {
      delete updatedFilters.price_from;
      delete updatedFilters.price_to;
    } else {
      updatedFilters.price_from = range.price_from;
      updatedFilters.price_to = range.price_to;
    }
    dispatch(setFilters(updatedFilters));
  };
  

  
  return (
    <div className="lg:w-80 w-full lg:h-screen flex lg:flex-col relative">
      {/* Hamburger Menu Icon */}
      <div className="lg:hidden flex justify-center items-center w-full p-4">
        <button className="text-3xl" onClick={toggleSidebar}>
          <FiFilter />
        </button>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar Content */}
      <div
        className={`fixed top-0 left-0 z-50 h-full bg-white md:w-1/2 w-full lg:w-full lg:overflow-visible overflow-auto hide-scrollbar lg:relative p-6 shadow-lg lg:shadow-none transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Close Icon */}
        <button className="lg:hidden text-3xl mb-4" onClick={toggleSidebar}>
          <FiXCircle />
        </button>

        {/* Brands */}
        <Brands onBrandChange={handleBrandChange} />

        {/* Divider and Additional Components */}
        <div className="border-[1px] my-4 border-[#E4E7E9]"></div>
        <SalaryRange onPriceRangeChange={handlePriceRangeChange} />
        <div className="border-[1px] my-4 border-[#E4E7E9]"></div>
        <PopularTag onTagChange={handleTagChange} />
      </div>
    </div>
  );
};

export default StoreSideBar;