"use client";

import HouseIcon from "@/public/icons/house.svg";
import { SettingsIcon } from "@/public/icons";
import { usePathname } from "next/navigation";
import { InclusionWebLogo } from "@/public/logos";
import Link from "next/link";
import Hamburger from "hamburger-react";
import { useContext } from "react";
import { WebContext } from "@/context/WebContext";
import { motion } from "framer-motion";

type SideMenuProps = {
	className?: string;
};

type NavItemProps = {
	href: string;
	icon: React.ReactNode;
	active?: boolean;
	name?: string;
};

const NavBar = ({ className }: SideMenuProps) => {
	const pathname = usePathname();
	const { mobileNavVisible, setMobileNavVisible } = useContext(WebContext);

	return (
		<aside
			className={`fixed left-0 top-0 z-30 flex h-16 w-screen items-center justify-between bg-primary-700 p-2 shadow-md xl:h-[100dvh] xl:w-[6rem] xl:flex-col xl:p-0 ${className}`}>
			<Link href="/dashboard">
				<InclusionWebLogo
					className={`relative w-[12.5rem] fill-white opacity-90 xl:top-[9rem] xl:w-[20rem] xl:-rotate-90`}
				/>
			</Link>
			<div className={`fixed right-2 top-2 z-50 xl:hidden`}>
				<Hamburger color="white" rounded toggled={mobileNavVisible} toggle={setMobileNavVisible} />
			</div>

			{mobileNavVisible && <MobileNav />}

			<ul className="hidden w-full flex-col xl:pointer-events-auto xl:flex xl:opacity-100 ">
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
		</aside>
	);
};

const NavItem = ({ href, icon, active, name, ...rest }: NavItemProps) => {
	const { setMobileNavVisible } = useContext(WebContext);

	return (
		<Link href={href} onClick={() => setMobileNavVisible(false)}>
			<li
				className={`relative flex cursor-pointer items-center justify-center py-6 transition active:bg-primary-500  ${
					active
						? " before:absolute before:left-0 before:top-0 before:h-full before:w-2 before:bg-white"
						: "before:bg-primary-700"
				}   before:content-[''] hover:bg-primary-600 `}>
				{!name && icon}
				{name && (
					<span
						className={`pl-2 font-primary text-4xl font-medium uppercase ${
							active ? "font-bold text-white" : "font-thin text-white opacity-60"
						}`}>
						{name}
					</span>
				)}
			</li>
		</Link>
	);
};

const MobileNav = () => {
	const pathname = usePathname();

	const fadeIn = {
		hidden: {
			y: "-100vh",
			opacity: 0,
			transition: {
				duration: 1,
			},
		},
		visible: {
			y: "0",
			opacity: 1,
			transition: {
				duration: 0.15,
				damping: 100,
				stiffness: 500,
			},
		},
		exit: {
			y: "-100vh",
			transition: {
				duration: 0.15,
			},
		},
	};

	return (
		<motion.div
			variants={fadeIn}
			initial="hidden"
			animate="visible"
			onClick={(e) => e.stopPropagation()}
			exit="exit"
			className={`fixed left-0 top-0 h-screen w-screen bg-primary-700`}>
			<div className={`absolute top-1/2 w-screen -translate-y-1/2`}>
				<NavItem
					href="/dashboard"
					name="Home"
					icon={<HouseIcon className={`${pathname !== "/dashboard" && "opacity-60"}`} />}
					active={pathname === "/dashboard"}
				/>
				<NavItem
					href="/settings"
					name="Instellingen"
					icon={<SettingsIcon className={`${pathname !== "/settings" && "opacity-60"}`} />}
					active={pathname === "/settings"}
				/>
				<NavItem
					href="/about"
					name="Over Resokit"
					icon={<SettingsIcon className={`${pathname !== "/about" && "opacity-60"}`} />}
					active={pathname === "/about"}
				/>
			</div>
		</motion.div>
	);
};

export default NavBar;
