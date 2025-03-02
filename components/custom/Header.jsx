"use client"; // Ensure this is a Client Component

import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { UserDetailContext } from "@/context/UserDetailContext";
import Link from "next/link";
import { ActionContext } from "@/context/ActionContext";
import { LucideDownload, Rocket } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/ui/sidebar";
import Colors from "@/data/Colors";



function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { toggleSidebar } = useSidebar(); // Use useSidebar hook
  const { action, setAction } = useContext(ActionContext);
  const path = usePathname();

  const onActionBtn = (action) => {
    setAction({
      actionType: action,
      timeStamp: Date.now(),
    });
  };

  return (
    <div className="p-4 flex justify-between items-center border-b border-gray-200">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={40} height={40} />
      </Link>

      {!userDetail?.name ? (
        <div className="flex gap-5">
          <Button variant="ghost">Sign In</Button>
          <Button
            className="text-white"
            style={{
              backgroundColor: Colors.BLUE,
            }}
          >
            Get Started
          </Button>
        </div>
      ) : (
        path?.includes("workspace") && (
          <div className="flex gap-2 items-center">
            <Button variant="ghost" onClick={() => onActionBtn("export")}>
              <LucideDownload /> Export
            </Button>
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
              onClick={() => onActionBtn("deploy")}
            >
              <Rocket /> Deploy
            </Button>
            {userDetail && (
              <Image
                src={userDetail?.picture}
                alt="user"
                width={40}
                height={40}
                className="rounded-full w-[30px]"
                onClick={toggleSidebar}
              />
            )}
          </div>
        )
      )}
    </div>
  );
}

export default Header;