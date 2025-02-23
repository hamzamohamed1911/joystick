"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CardIcon, closeBtn, Hamburger, mainLogo } from "../../../public";
import NavLink from "./NavLink";
import { navLinks } from "../_constants";
import Link from "next/link";
import CustomModal from "./CustomModal";
import LoginForm from "../_auth/LoginForm";
import RegisterForm from "../_auth/RegisterForm";
import OTPForm from "../_auth/OTPForm";
import NewPasswordForm from "../_auth/NewPasswordForm";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import OTPFormRegisterForm from "../_auth/OTPFormRegisterForm";
import ForgotPasswordForm from "../_auth/ForgotPasswordForm";
import ProfileDrobDown from "./ProfileDrobDown";
import { fetchCategories } from "../services/fetchCategories";
import { useSnackbar } from "notistack";
import Cookies from "js-cookie";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [otpOpen, setOtpOpen] = useState(false);
  const [otpRegOpen, setOtpRegOpen] = useState(false);
  const [newPasswordOpen, setNewPasswordOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const totalItems = useSelector((state) => state.cart.totalItems);
  const [forgotOpen, setForgotOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
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
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setCatLoading(false);
      }
    };

    getCategories();
  }, []);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleOtpOpen = () => {
    setOtpOpen(true);
    setOpen(false);
  };

  const handleOtpRegiesterOpen = () => {
    setOtpRegOpen(true);
    setActiveTab("login");
    setOpen(false);
  };
  const handleNewPasswordOpen = () => {
    setOtpOpen(false);
    setNewPasswordOpen(true);
  };
  const handleForgotOpen = () => {
    setOpen(false);
    setForgotOpen(true);
  };

  const handleReSignin = () => {
    setNewPasswordOpen(false);
    setOpen(true);
  };
  const handleForgotClose = () => setForgotOpen(false);
  const handleTabChange = (tab) => setActiveTab(tab);
  const handleNewPasswordClose = () => setNewPasswordOpen(false);

  return (
    <nav className="shadow-[#EEEEEE80] shadow-md p-4 ">
      <div className="lg:min-w-screen-2xl w-full container mx-auto flex justify-between items-center">
        <Link href="/" className="w-30 hidden lg:flex">
          <Image
            src={mainLogo}
            alt="Logo"
            width={64}
            height={64}
            className="w-full"
          />
        </Link>

        <div className="lg:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none w-30">
            <Image
              width={50}
              height={50}
              className="w-full"
              alt="Hamburger Logo"
              src={Hamburger}
            />
          </button>
        </div>
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
        <div className="flex items-center gap-2 ">
          <button
            onClick={() => {
              if (!isAuthenticated) {
                enqueueSnackbar("يجب تسجيل الدخول للوصول إلى سلة المشتريات", { variant: "error" });
              } else {
                router.push("/shopping-cart");
              }
            }}
            className="relative h-10 shrink-0"
          >
            <Image
              width={50}
              height={50}
              className="w-full shrink-0"
              alt="Cart Logo"
              src={CardIcon}
            />
            <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-primary text-white text-center rounded-full text-xs">
              {totalItems}
            </span>
          </button>


          <ProfileDrobDown handleOpen={handleOpen} />
        </div>
      </div>

      <div
        className={`fixed inset-0 lg:hidden z-20 bg-black bg-opacity-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed lg:hidden top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex justify-between items-center p-4 ">
          <div className="w-28 ">
            <Image
              src={mainLogo}
              alt="Logo"
              width={40}
              height={40}
              className="w-full h-full"
            />
          </div>
          <button
            onClick={toggleMenu}
            className="text-black text-2xl focus:outline-none"
          >
            <div className="w-8">
              <Image
                src={closeBtn}
                alt="Logo"
                width={20}
                height={20}
                className="w-full"
              />
            </div>
          </button>
        </div>
        <ul className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <NavLink link={link} key={link.title} />
          ))}
          {catLoading ? (
            <li>Loading...</li>
          ) : error ? (
            <li>Error: {error}</li>
          ) : (
            categories.map((category) => (
              <li key={category.id}>
                <a
                  href={`/store/${category.slug}`}
                  className="cursor-pointer  hover:text-primary font-semibold px-2 transition-all hover:-translate-y-1 hover:scale-110 duration-300 gap-6 space-y-6 whitespace-nowrap 2xl:text-lg xl:text-md text-md"
                >
                  {category.name}
                </a>
              </li>
            ))
          )}
        </ul>
      </div>

      <CustomModal open={open} onClose={handleClose}>
        <div className="flex w-full justify-between border-b border-gray-300 rounded-lg mb-2 text-lg font-semibold">
          <button
            onClick={() => handleTabChange("login")}
            className={`px-4 py-3 w-1/2 ${activeTab === "login"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
              }`}
          >
            تسجيل دخول
          </button>
          <div className="border-l border-gray-300"></div>
          <button
            onClick={() => handleTabChange("register")}
            className={`px-4 py-3 w-1/2 ${activeTab === "register"
              ? "text-primary border-b-2 border-primary"
              : "text-gray-500"
              }`}
          >
            انشاء حساب
          </button>
        </div>
        {activeTab === "login" && (
          <LoginForm setOpen={setOpen} onForgotPassword={handleForgotOpen} />
        )}
        {activeTab === "register" && (
          <RegisterForm onRegiester={handleOtpRegiesterOpen} />
        )}
      </CustomModal>
      <CustomModal open={forgotOpen} onClose={handleForgotClose}>
        <ForgotPasswordForm
          onOtpOpen={handleOtpOpen}
          onClose={handleForgotClose}
        />
      </CustomModal>
      <CustomModal open={otpOpen}>
        <OTPForm onNewPasswordOpen={handleNewPasswordOpen} />
      </CustomModal>
      <CustomModal open={otpRegOpen} onClose={() => setOtpRegOpen(false)}>
        <OTPFormRegisterForm onNewPasswordOpen={handleReSignin} />
      </CustomModal>

      <CustomModal open={newPasswordOpen} onClose={handleNewPasswordClose}>
        <NewPasswordForm onOpenLoginModal={handleReSignin} />
      </CustomModal>
    </nav>
  );
}