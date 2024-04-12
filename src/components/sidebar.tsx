'use client'

import SidebarDesktop from "@/components/sidebar-desktop";
import {
	Home,
	MoreHorizontal,
	ShoppingCart
} from "lucide-react";
import {SidebarItems, SidebarMenu} from "@/types";
import SidebarButton from "@/components/sidebar-button";
import { useMediaQuery } from 'usehooks-ts'
import SidebarMobile from '@/components/sidebar-mobile';


const menus: SidebarMenu []=  [
	{
		depth: 1,
		sort_order: 1,
		icon: Home,
		label: '대시보드',
		href: '/dashboard',
		operator_menu_permission: 1
	},
	{
		depth: 1,
		sort_order: 2,
		icon: Home,
		label: '공급 대시보드',
		href: '/supplier-dashboard',
		operator_menu_permission: 1
	},
	{
		depth: 1,
		sort_order: 3,
		icon: Home,
		label: '회원 관리',
		href: '/member',
		operator_menu_permission: 1
	},
	{
		depth: 1,
		sort_order: 4,
		icon: Home,
		label: '영양제 배송 및 물류',
		href: '/supplier-ordering',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 1,
		icon: ShoppingCart,
		label: '주문 내역',
		href: '/supplier-order',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 2,
		icon: ShoppingCart,
		label: '생산 및 포장',
		href: '/supplier-packaging',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 3,
		icon: ShoppingCart,
		label: '배송',
		href: '/supplier-delivery',
		operator_menu_permission: 1
	},
	{
		depth: 1,
		sort_order: 5,
		icon: Home,
		label: '정산',
		href: '/supplier-reconcile',
		operator_menu_permission: 1
	},
	{
		depth: 1,
		sort_order: 6,
		icon: Home,
		label: '영양제 레시피',
		href: '/recipe',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 1,
		icon: ShoppingCart,
		label: '영양소',
		href: '/nutrient',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 2,
		icon: ShoppingCart,
		label: '소분 영양제',
		href: '/nutraceutical',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 3,
		icon: ShoppingCart,
		label: '건강 고민',
		href: '/health-concern',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 4,
		icon: ShoppingCart,
		label: '솔루션',
		href: '/nutrient-solution',
		operator_menu_permission: 1
	},
	{
		depth: 1,
		sort_order: 7,
		icon: Home,
		label: '설정',
		href: '/setting',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 1,
		icon: ShoppingCart,
		label: '공급사 관리',
		href: '/supplier',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 2,
		icon: ShoppingCart,
		label: '운영자 관리',
		href: '/operator',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 3,
		icon: ShoppingCart,
		label: '운영자 관리 (Supplier)',
		href: '/supplier-operator',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 4,
		icon: ShoppingCart,
		label: '운영자 관리 (Channel)',
		href: '/channel-operator',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 5,
		icon: ShoppingCart,
		label: '메뉴 관리',
		href: '/menu',
		operator_menu_permission: 1
	},
	{
		depth: 2,
		sort_order: 6,
		icon: ShoppingCart,
		label: '메뉴 권한 관리',
		href: '/menu-permission',
		operator_menu_permission: 1
	}
]
const generateSidebarItems = (menus: SidebarMenu[]): SidebarItems => {
	const sidebarItems: SidebarItems = {
		links: [],
		extras: (
			<div className="flex flex-col gap-2">
				<SidebarButton icon={MoreHorizontal} className="w-full">
					More
				</SidebarButton>
				<SidebarButton className="w-full justify-center text-white" variant="default">
					Tweet
				</SidebarButton>
			</div>
		)
	};

	// 메뉴 아이템을 depth에 따라 정렬하고, 계층적 구조로 변환하는 함수
	const organizeMenusByDepth = (menus: SidebarMenu[], depth = 1, parentSortOrder = 0):SidebarMenu[] => {
		return menus
			.filter(menu => menu.depth === depth && menu.sort_order >= parentSortOrder)
			.map(menu => ({
				...menu,
				subMenus: organizeMenusByDepth(menus, depth + 1, menu.sort_order)
			}));
	};

	sidebarItems.links = organizeMenusByDepth(menus);

	return sidebarItems;
};


const sidebarItems: SidebarItems = generateSidebarItems(menus);

export default function Sidebar() {
	const isDesktop = useMediaQuery('(min-width: 640px)', {
		initializeWithValue: false
	});

	return isDesktop ? (
		<SidebarDesktop sidebarItems={sidebarItems} />
	) : (
		<SidebarMobile sidebarItems={sidebarItems} />
	);
}
