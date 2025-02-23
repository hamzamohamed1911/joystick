"use client";
import { ProfilenavLinks } from "@/app/_constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "../../../../public";
import Cookies from "js-cookie"; 

const SideBar = () => {

 
  const handleLogout = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const token = Cookies.get("token"); 
  
    if (!token) {
      console.error("Unauthorized: No token found");
      return;
    }
  
    try {
      const response = await fetch(`${apiUrl}user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        Cookies.remove("token");
        window.location.reload(); 
      } else {
        console.error("فشل تسجيل الخروج");
      }
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    }
  };
  const pathName = usePathname();

  return (
    <div className="lg:w-64 w-full lg:h-screen bg-white border-[1px] border-solid border-gray-300 rounded-sm shadow-sm flex lg:flex-col lg:justify-between">
      <ul className="lg:space-y-4 lg:gap-0 text-xl gap-5 space-x-reverse lg:flex lg:flex-col flex lg:mt-4 mt-0 overflow-x-auto lg:overflow-hidden whitespace-nowrap lg:whitespace-normal flex-grow hide-scrollbar">
        {ProfilenavLinks.map((link, index) => (
          <Link
            href={link.url}
            key={index}
            className={`cursor-pointer lg:text-md text-lg font-semibold px-4 py-3 inline-block lg:block w-auto lg:w-full lg:hover:text-white lg:hover:bg-primary ${
              pathName === link.url
                ? "lg:text-white lg:bg-primary text-primary"
                : "text-black"
            }`}
          >
            <div className="flex items-center gap-2">
              {link.image && (
                <Image
                  src={link.image}
                  alt={link.title}
                  width={22}
                  height={22}
                  className={`transition duration-200 ${
                    pathName === link.url ? "icon-white" : ""
                  }`}
                />
              )}
              <span>{link.title}</span>
            </div>
          </Link>
        ))}
      </ul>

      <div className="hidden lg:flex lg:flex-col lg:justify-end" onClick={handleLogout}>
        <li className="flex cursor-pointer lg:text-md text-lg font-semibold p-2 gap-2 py-4  hover:text-white items-center hover:bg-primary w-full mb-4">
          <Image width={22} src={signOut} alt="sign out" />
          تسجيل الخروج
        </li>
      </div>
    </div>
  );
};

export default SideBar;
