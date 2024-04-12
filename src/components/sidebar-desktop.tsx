'use client';
import SidebarButton from '@/components/sidebar-button';
import { SidebarItems } from '@/types';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, MoreHorizontal, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export default function SidebarDesktop({ sidebarItems }: SidebarDesktopProps) {
  const [activeSubMenus, setActiveSubMenus] = useState<string[]>([]);
  const pathname = usePathname();

  const toggleSubMenu = (href: string) => {
    if (activeSubMenus.includes(href)) {
      setActiveSubMenus(activeSubMenus.filter((item) => item !== href));
    } else {
      setActiveSubMenus([...activeSubMenus, href]);
    }
  };

  const handleMenuItemClick = (href: string) => {
    toggleSubMenu(href);
  };

  return (
    <aside className="w-[270px] max-w-xs h-screen fixed left-0 top-0 z-40 border-r">
      <div className="h-full px-3 py-4">
        <h3 className="mx-3 text-lg font-semibold text-foreground w-full">
          Twitter
        </h3>
        <div className="mt-5">
          <div className="flex flex-col gap-1 w-full">
            {sidebarItems.links.map((link, index) =>
              !link.menus ? (
                <React.Fragment key={link.href}>
                  <Link href={link.href}>
                    <SidebarButton
                      variant={pathname === link.href ? 'secondary' : 'ghost'}
                      icon={link.icon}
                      className="w-full"
                    >
                      {link.label}
                    </SidebarButton>
                  </Link>
                </React.Fragment>
              ) : (
                <React.Fragment key={link.href}>
                  <React.Fragment>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between"
                    >
                      <SidebarButton
                        variant={pathname === link.href ? 'secondary' : 'ghost'}
                        icon={link.icon}
                        onClick={() => handleMenuItemClick(link.href)}
                      >
                        <div className="h-6 w-6">{link.label}</div>
                      </SidebarButton>
                      <svg
                        onClick={(e) => {
                          e.preventDefault();
                          toggleSubMenu(link.href);
                        }}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className={`cursor-pointer inline w-4 h-4 mt-1 ml-1 transition-transform
                        duration-200 transform md:-mt-1 ${activeSubMenus.includes(link.href) ? 'rotate-0' : 'rotate-180'}`}
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </React.Fragment>
                  {activeSubMenus.includes(link.href) && (
                    <div className="ml-6">
                      {link.menus.map((menu, index) => (
                        <Link href={menu.href} key={menu.href}>
                          <SidebarButton
                            variant={
                              pathname === menu.href ? 'secondary' : 'ghost'
                            }
                            icon={menu.icon}
                            className="w-full"
                          >
                            {menu.label}
                          </SidebarButton>
                        </Link>
                      ))}
                    </div>
                  )}
                </React.Fragment>
              ),
            )}
            {sidebarItems.extras}
          </div>
          <div className="absolute left-0 bottom-3 w-full px-3">
            <Separator className="absolute -top-3 left-0 w-full" />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-2">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://github.com/max-programming.png" />
                        <AvatarFallback>Max Programming</AvatarFallback>
                      </Avatar>
                      <span>Max Programming</span>
                    </div>
                    <MoreHorizontal size={20} />
                  </div>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mb-2 w-56 p-3 rounded-[1rem]">
                <div className="space-y-1">
                  <Link href="/">
                    <SidebarButton size="sm" icon={Settings} className="w-full">
                      Account Settings
                    </SidebarButton>
                  </Link>
                  <SidebarButton size="sm" icon={LogOut} className="w-full">
                    Log Out
                  </SidebarButton>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </aside>
  );
}
