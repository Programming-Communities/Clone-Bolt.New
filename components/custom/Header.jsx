import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";

function Header() {
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  return (
    <div className="p-4 flex justify-between items-center">
      {/* <Image src="/logo.svg" alt="logo" width={40} height={40} /> */}
      <Link href="/">
  <div className="relative w-10 h-10 cursor-pointer group">
    <Image
      src="/logo.svg"
      alt="logo"
      fill
      priority
      style={{ objectFit: "contain" }}
    />
    <span className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded">
      Go to Home
    </span>
  </div>
</Link>

     {!userDetail.name && <div className="flex gap-5">
        <Button variant="ghost">Sign In</Button>
        <Button
          className="text-white"
          style={{
            background: "linear-gradient(90deg, #00C0FF 0%, #92FE9D 100%)",
          }}
        >
          Get Started
        </Button>
      </div>}
    </div>
  );
}

export default Header;
