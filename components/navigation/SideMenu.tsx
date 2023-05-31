"use client";

import HouseIcon from "@/public/icons/house.svg";
import { SettingsIcon } from "@/public/icons";
import { usePathname } from "next/navigation";
import { NavItem } from "./NavItem";

type Props = {};

const SideMenu = (props: Props) => {
	const pathname = usePathname();

	return (
		<aside className="bg-primary-700 fixed left-0 top-0 h-full py-6 flex flex-col items-center">
			<nav className="relative top-1/2 -translate-y-1/2">
				<ul className="flex flex-col gap-6">
					<NavItem
						href="/dashboard"
						icon={<HouseIcon className={`${pathname !== "/dashboard" && "opacity-60"}`} />}
						active={pathname === "/dashboard"}
					/>
					<NavItem
						href="/settings"
						icon={<SettingsIcon className={`${pathname !== "/settings" && "opacity-60"}`} />}
						active={pathname === "/settings"}
					/>
				</ul>
			</nav>
		</aside>
	);
};

export default SideMenu;
