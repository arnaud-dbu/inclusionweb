"use client";

import React from "react";
import { CirclePlusIcon, SettingsIcon, SignOutIcon } from "@/public/icons";
import MenuButton from "./MenuButton";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { OrganizationIllustration } from "@/public/illustrations";

const MenuButtons = () => {
	const { supabase } = useSupabase();
	const router = useRouter();

	const handleLogout = async () => {
		await supabase.auth.signOut();
		router.push("/login");
	};

	return (
		<div className="flex gap-y-8 flex-wrap justify-between items-start w-[60rem] h-fit mt-8">
			<MenuButton
				type="link"
				label="Nieuw web"
				icon={<CirclePlusIcon className={`opacity-60 w-[6rem] h-[6rem]`} />}
				color="bg-secondary-800"
				href="/new"
			/>
			<MenuButton
				type="link"
				label="Instellingen"
				icon={<SettingsIcon className={`opacity-60 w-[6rem] h-[6rem]`} />}
				color="bg-neutral-700"
				href="/settings"
			/>
			<MenuButton
				type="button"
				label="Afmelden"
				icon={<SignOutIcon className={`opacity-60 w-[6rem] h-[6rem]`} />}
				color="bg-neutral-900"
				onClick={handleLogout}
			/>
			<MenuButton
				type="link"
				label="Over Resokit"
				href="/about"
				color="bg-primary-600"
				image={OrganizationIllustration}
				onClick={handleLogout}
			/>
		</div>
	);
};

export default MenuButtons;
