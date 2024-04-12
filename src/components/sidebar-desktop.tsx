'use client'

import SidebarButton from "@/components/sidebar-button";
import {SidebarMenu} from "@/types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, MoreHorizontal, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import React, {ReactNode, useState} from "react";


export interface SidebarItems {
  links: Array<SidebarMenu>
  extras?:ReactNode;
}
interface SidebarDesktopProps {
    sidebarItems: SidebarItems;
}

export default function SidebarDesktop({ sidebarItems }:SidebarDesktopProps) {
  const [activeMenuHref, setActiveMenuHref] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubMenu = (href: string) => {
    setActiveMenuHref(activeMenuHref === href ? null : href);
  };

  const filterSubMenus = (menus: SidebarMenu[], parentHref: string) => {
    return menus.filter(menu => menu.depth === 2 && parentHref === menu.href);
  };

  return (
    <aside
      className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground">
          Twitter
        </h3>
        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {sidebarItems.links.map((link, index) => {
              const isSubMenu = link.depth === 2;
              if (isSubMenu) return null;

              const isActive = activeMenuHref === link.href;
              return (
                <React.Fragment key={index}>
                  <SidebarButton
                    variant="ghost"
                    className="w-full"
                    onClick={() => toggleSubMenu(link.href)}
                    icon={link.icon}>
                    {link.label}
                  </SidebarButton>
                  {isActive && sidebarItems.links.filter(subLink => subLink.depth === 2 && subLink.href.startsWith(activeMenuHref)).map(subLink => (
                    <div key={subLink.href} className="ml-4">
                      <Link href={subLink.href}>
                        <SidebarButton
                          variant="ghost"
                          className="w-full">
                          {subLink.label}
                        </SidebarButton>
                      </Link>
                    </div>
                  ))}
                </React.Fragment>
              )
            })}
          {sidebarItems.extras}
        </div>
      </div>
      </div>
    </aside>
  )
}


