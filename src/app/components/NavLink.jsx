"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ link }) => {
  const pathName = usePathname();
  return (
    <Link
      href={link.url}
      className={`cursor-pointer hover:text-primary font-semibold px-2 transition-all hover:-translate-y-1 hover:scale-110 duration-300 whitespace-nowrap 2xl:text-lg xl:text-md text-md ${
        pathName === link.url ? "text-primary" : "text-black"
      }`}
    >
      {link.title}
    </Link>
  );
};

export default NavLink;
