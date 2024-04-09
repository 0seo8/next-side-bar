'use client'

import React from 'react';
import SidebarDesktop from "@/components/sidebar-desktop";
import {
	Bell,
	Bookmark,
	Home,
	List,
	Mail,
	MoreHorizontal,
	User,
	Users
} from "lucide-react";
import { SidebarItems } from "@/types";
import SidebarButton from "@/components/sidebar-button";
import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from '@/components/sidebar-mobile';

const sidebarItems: SidebarItems = {

	links: [
		{ label: 'Home', href:'/', icon: Home },
		{ label: 'Notifications', href:'/item/notifications', icon: Bell },
		{ label: 'Messages', href:'/item/messages', icon: Mail },
		{ label: 'Lists', href:'/item/lists', icon: List },
		{ label: 'Bookmark', href:'/item/bookmarks', icon: Bookmark },
		{ label: 'Communities', href:'/item/communities', icon: Users },
		{ label: 'Users', href:'/item/profile', icon: User },
	],
	extras:(
		<div className="flex flex-col gap-2">
			<SidebarButton icon={MoreHorizontal} className="w-full">
				More
			</SidebarButton>
			<SidebarButton className="w-full justify-center text-white" variant="default">
				Tweet
			</SidebarButton>
		</div>
	)
}

export default function Sidebar() {
	const isDesktop = useMediaQuery('(min-width: 640px)')

	if(isDesktop)  return (
		<SidebarDesktop sidebarItems={sidebarItems}/>
 );

	return <SidebarMobile sidebarItems={sidebarItems} />;
}
