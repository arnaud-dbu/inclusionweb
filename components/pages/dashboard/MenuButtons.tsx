"use client";

import React, { useContext } from "react";
import { CirclePlusIcon, SettingsIcon, SignOutIcon } from "@/public/icons";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { OrganizationIllustration } from "@/public/illustrations";
import Image from "next/image";
import { WebContext } from "@/context/WebContext";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { log } from "console";

type Props = {
	label: string;
	icon?: React.ReactNode;
	color?: string;
	href?: string;
	presetImage?: any;
	customImage?: any;
	filter?: boolean;
	imageStyling?: string;
	avatar?: any;
	className?: string;
} & React.HTMLAttributes<HTMLButtonElement>;

const MenuButtons = () => {
	const { webs, sessions } = useContext(WebContext);
	const { supabase } = useSupabase();
	const router = useRouter();

	// Sort webs by last opened
	const sortWebs = webs?.sort((a, b) => {
		return new Date(b.last_opened).getTime() - new Date(a.last_opened).getTime();
	});

	const lastWeb = sortWebs?.[0];

	// Get all sessions from the last opened web
	const lastWebSessions = sessions?.filter((session) => session.web_id === lastWeb?.id);

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push("/login");
	};
	return (
		<div className="mb-8 hidden h-[75vh] w-[55rem] grid-cols-2 grid-rows-3 gap-6 xl:pointer-events-auto xl:grid xl:opacity-100">
			<MenuButton
				onClick={() => router.push("/new")}
				label="Nieuw web"
				className={webs.length >= 2 ? "" : "row-span-2"}
				icon={<CirclePlusIcon className={`h-[4.5rem] w-[4.5rem] opacity-60`} />}
				color="bg-secondary-800"
			/>

			<MenuButton
				onClick={() => router.push("/settings")}
				label="Instellingen"
				icon={<SettingsIcon className={`h-[4.5rem] w-[4.5rem] opacity-60`} />}
				color="bg-neutral-700"
			/>
			{/* If less then 2 webs, don't show the 'last opened session' button */}
			{webs.length >= 2 && (
				<MenuButton
					filter
					onClick={() => router.push("/new")}
					label="Laatst geopend"
					avatar={sortWebs?.[0]?.avatar}
					customImage={sortWebs?.[0]?.image_path}
					color="bg-secondary-800"
				/>
			)}
			<MenuButton
				onClick={() => router.push("/about")}
				label="Over Resokit"
				className="row-span-2"
				color="bg-primary-600"
				imageStyling="absolute bottom-40 scale-[2]"
				presetImage={OrganizationIllustration}
			/>
			<MenuButton
				onClick={handleLogout}
				label="Afmelden"
				icon={<SignOutIcon className={`h-[4.5rem] w-[4.5rem] opacity-60`} />}
				color="bg-neutral-900"
			/>
		</div>
	);
};

const MenuButton = ({
	label,
	icon,
	color,
	presetImage,
	customImage,
	className,
	imageStyling,
	avatar,
	filter,
	...rest
}: Props) => {
	const buttonClass = `relative overflow-hidden shadow-lg flex flex-col gap-2 justify-end px-6 py-6 rounded-2xl  outline-none focus ${color} h-full w-full hover:opacity-80 hover:shadow-lg transition-opacity`;
	const labelClass = `text-start font-primary text-white uppercase text-3xl z-10 font-bold`;
	const cover = `absolute left-0 top-0 h-full w-full `;

	return (
		<button {...rest} className={`${className} ${buttonClass}`}>
			{icon}
			{/* Preset Image Background */}
			{presetImage && (
				<Image className={imageStyling} alt="" src={presetImage} width={300} height={300} />
			)}
			{/* Custom Image Background */}
			{customImage && (
				<Image
					className={`${cover} object-cover`}
					alt="web profile picture"
					src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${customImage}`}
					width={300}
					height={300}
				/>
			)}

			{/* Avatar Background */}
			{avatar && (
				<AvatarComponent
					avatar={avatar}
					className="absolute left-0 top-0 h-full w-full !rounded-lg"
				/>
			)}
			{/* Label */}
			<span className={labelClass}>{label}</span>

			{/* Filter */}
			{filter && (
				<div
					className={`absolute bottom-0 left-0 z-0 h-2/3 w-full bg-gradient-to-t from-neutral-900 opacity-50`}></div>
			)}
		</button>
	);
};

export default MenuButtons;
