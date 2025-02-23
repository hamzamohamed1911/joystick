import Image from "next/image";
import React from "react";
import Link from "next/link"; // Import Link from next/link
import { ChatIcon } from "../../../../public";

const Chat = () => {
  return (
    <div className="container fixed md:bottom-20 md:right-20 bottom-6 right-6 bg-primary md:w-20 md:h-20 w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-primary-dark z-40">
      <Link href="/profile/help-center" className="flex items-center justify-center w-full h-full">
        <Image src={ChatIcon} alt="Chat Icon" width={24} height={24} />
      </Link>
    </div>
  );
};

export default Chat;
