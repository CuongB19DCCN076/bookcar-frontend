"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import menuOpen from "@/public/menu-open.svg";
import menuClose from "@/public/menu-close.svg";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useSidebarStore } from "@/hooks/sidebar-store";
const SidebarToggle = () => {
  const { handleClose } = useSidebarStore();
  return (
    <div className="h-screen w-screen bg-slate-500">
      <Button
        variant="ghost"
        className="lg:hidden"
        onClick={handleClose}
        size="icon">
        <X />
      </Button>

    </div>
  )
}

export default SidebarToggle