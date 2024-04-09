'use client'

import { SidebarItems } from '@/types';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface SidebarMobileProps {
  sidebarItems: SidebarItems;
}

export default function SidebarMobile({sidebarItems}:SidebarMobileProps) {
 return (
    <Sheet>
        <SheetTrigger asChild>
          <Button>
            Open Sidebar
          </Button>
        </SheetTrigger>
      <SheetContent>
        SideBar Content
      </SheetContent>
    </Sheet>
 )
}