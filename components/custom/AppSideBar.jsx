import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { MessageCircleCode } from "lucide-react";
import { Button } from "../ui/button";
import WorkspaceHistory from "./WorkspaceHistory";
import SideBarFooter from "./SideBarFooter";
function AppSideBar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-5">
        <div style={{ position: "relative", width: "30%", height: "30px" }}>
          <Image
            src="/logo.svg"
            alt="logo"
            fill
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
        <Button variant="ghost" className="p-5">
          {" "}
          <MessageCircleCode /> Start New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent className="p-5">
        <SidebarGroup>
          <WorkspaceHistory />
        </SidebarGroup>
        {/* <SidebarGroup /> */}
      </SidebarContent>
      <SidebarFooter>
        <SideBarFooter />
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSideBar;
