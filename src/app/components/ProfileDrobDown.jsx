"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, MenuItem, IconButton, ListItemIcon } from "@mui/material";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { LoginIcon, profile } from "../../../public";
import Cookies from "js-cookie";

const ProfileDrobDown = ({ handleOpen }) => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  // Initialize token as null
  const [token, setToken] = useState(null); 

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    setToken(cookieToken);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    router.push("/profile/control-panel");
    handleClose();
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}user/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        // Remove cookies and any other relevant session data
        Cookies.remove("token");
        Cookies.remove("favorites");  // Remove the favorites cookie
        localStorage.clear(); // Clear local storage
        sessionStorage.clear(); // Clear session storage
  
        // Redirect or reload the page after clearing data
        window.location.reload();
      } else {
        console.error("فشل تسجيل الخروج");
      }
    } catch (error) {
      console.error("خطأ أثناء تسجيل الخروج:", error);
    } finally {
      handleClose();
    }
  };
  
  if (token === null) return null;
  

  return (
    <>
      {token ? (
        <div>
          <IconButton onClick={handleClick}>
            <Image
              width={30}
              height={30}
              className="rounded-full"
              alt="User Profile"
              src={profile}
            />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            <MenuItem onClick={handleProfile}>
              <ListItemIcon>
                <FaUser size={18} />
              </ListItemIcon>
              الملف الشخصي
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <FaSignOutAlt size={18} />
              </ListItemIcon>
              تسجيل الخروج
            </MenuItem>
          </Menu>
        </div>
      ) : (
        <button onClick={handleOpen} className="h-10 shrink-0">
          <Image
            width={50}
            height={50}
            className="w-full shrink-0"
            alt="Login Logo"
            src={LoginIcon}
          />
        </button>
      )}
    </>
  );
};

export default ProfileDrobDown;
