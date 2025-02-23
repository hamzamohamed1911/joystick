import CustomBreadcrumbs from "../components/CustomBreadcrumbs";

const Layout = ({ children }) => {
  return (
    <>
      <CustomBreadcrumbs />
      <main>{children}</main>
    </>
  );
};

export default Layout;
