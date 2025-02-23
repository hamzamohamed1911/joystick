"use client";
import CustomBreadcrumbs from "../components/CustomBreadcrumbs";
import SideBar from "../components/profileComponents/SideBar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Layout = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CustomBreadcrumbs />
        <div className="flex flex-col lg:flex-row w-full container mx-auto gap-6">
          <SideBar />

          <main className="flex-grow lg:w-[calc(100%-16rem)] w-full">
            {children}
          </main>
        </div>
      </QueryClientProvider>
    </>
  );
};

export default Layout;
