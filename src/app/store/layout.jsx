"use client"
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import StoreSideBar from "../components/storeComponents/StoreSideBar";
import { usePathname } from "next/navigation";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const isProductDetailPage =
    pathname.includes("/store/") && pathname.split("/").length === 4;

  return (
    <>
      <CustomBreadcrumbs />
      <div className="flex flex-col lg:flex-row w-full container mx-auto gap-6">
        {!isProductDetailPage && <StoreSideBar />}
        <main className={`flex-grow w-full ${!isProductDetailPage ? "lg:w-[calc(100%-20rem)]" : ""}`}>
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;