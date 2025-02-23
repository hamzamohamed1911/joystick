"use client";
import React from "react";
import Image from "next/image";
import { facebook, instagram, mainLogo, twitter } from "../../../public";
import NavLink from "./NavLink";
import { navLinks } from "../_constants";
import Link from "next/link";
import { useState, useEffect } from "react";
import { fetchCategories } from "../services/fetchCategories"; // Import utility
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const Footer = () => {
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [error, setError] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false); 

  useEffect(() => {
    const token = Cookies.get("token"); 
    if (token) {
      setIsAuthenticated(true); 
    } else {
      setIsAuthenticated(false); 
    }
  }, []);

  const handleMaintenanceClick = () => {
    if (!isAuthenticated) {
      enqueueSnackbar("يجب تسجيل الدخول للوصول إلى صفحة الصيانة", { variant: "error" });
    } else {
      router.push("/profile/maintenance");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        setCatLoading(true);
        const data = await fetchCategories(); // Use utility
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCatLoading(false);
      }
    };

    getCategories();
  }, []);

  return (
    <footer className="p-6 flex flex-col items-center space-y-8">
      <Link href="/" className="w-30 flex justify-center">
        <Image
          src={mainLogo}
          alt="Logo"
          width={64}
          height={64}
          className="w-full h-full"
        />
      </Link>

      <p className="text-center md:text-xl text-lg max-w-md text-[#6D7280] px-4 md:px-0">
        هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي
      </p>

      <div className="flex justify-center mb-4">
        <ul className="hidden lg:flex lg:gap-4 md:gap-2 gap-1 justify-center">
          {navLinks.map((link) => (
            <li key={link.title}>
              {link.title === "صيانة" ? (
                <button
                  onClick={handleMaintenanceClick}
                  className="cursor-pointer hover:text-primary 2xl:text-lg xl:text-md text-md font-semibold px-2 transition-all hover:-translate-y-1 hover:scale-110 duration-300 text-center whitespace-nowrap"
                >
                  {link.title}
                </button>
              ) : (
                <NavLink link={link} />
              )}
            </li>
          ))}
          {catLoading ? (
            <li></li>
          ) : error ? (
            <li>Error: {error}</li>
          ) : (
            categories.map((category) => (
              <Link
                key={category.id}
                href={`/store/${category.id}`}
                className="cursor-pointer hover:text-primary 2xl:text-lg xl:text-md text-md font-semibold px-2 transition-all hover:-translate-y-1 hover:scale-110 duration-300 text-center whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))
          )}
        </ul>
      </div>

      <div className="flex justify-center space-x-reverse space-x-8 ">
        <a href="#" className="text-black">
          <Image alt="instagaramIcon" src={instagram} />
        </a>
        <a href="#" className="text-black">
          <Image alt="twitterIcon" src={twitter} />
        </a>
        <a href="#" className="text-black">
          <Image alt="facebookIcon" src={facebook} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;