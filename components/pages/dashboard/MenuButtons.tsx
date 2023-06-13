"use client";

import React from "react";
import { CirclePlusIcon, SettingsIcon, SignOutIcon } from "@/public/icons";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { OrganizationIllustration } from "@/public/illustrations";
import Image from "next/image";
import Link from "next/link";

type Props = {
	label: string;
	icon?: React.ReactNode;
	color?: string;
	href?: string;
	image?: any;
	onClick?: () => void;
};

const MenuButtons = () => {
	const { supabase } = useSupabase();
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push("/login");
	};

	return (
		<div className="flex gap-y-8 flex-wrap justify-between items-start w-[60rem] h-fit">
			<MenuButton
				onClick={() => router.push("/new")}
				label="Nieuw web"
				icon={<CirclePlusIcon className={`opacity-60 w-[6rem] h-[6rem]`} />}
				color="bg-secondary-800"
			/>
			<MenuButton
				onClick={() => router.push("/settings")}
				label="Instellingen"
				icon={<SettingsIcon className={`opacity-60 w-[6rem] h-[6rem]`} />}
				color="bg-neutral-700"
			/>
			<MenuButton
				onClick={handleLogout}
				label="Afmelden"
				icon={<SignOutIcon className={`opacity-60 w-[6rem] h-[6rem]`} />}
				color="bg-neutral-900"
			/>
			<MenuButton
				onClick={() => router.push("/about")}
				label="Over Resokit"
				color="bg-primary-600"
				image={OrganizationIllustration}
			/>
		</div>
	);
};

const MenuButton = ({ label, icon, color, image, onClick }: Props) => {
	const buttonClass = `relative overflow-hidden shadow-lg w-[47.5%] h-[17.5rem] flex flex-col gap-2 justify-end px-6 py-6 rounded-2xl aspect-square outline-none focus ${color}`;
	const labelClass = `text-start font-primary text-white uppercase text-4xl font-bold`;

	return (
		<button onClick={onClick} className={buttonClass}>
			{icon}
			{image && (
				<Image
					className={`w-[20rem] h-[20rem] -top-10 object-contain absolute`}
					alt=""
					src={image}
				/>
			)}
			<span className={labelClass}>{label}</span>
		</button>
	);
};

export default MenuButtons;
