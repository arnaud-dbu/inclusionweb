import AvatarComponent from "@/components/avatar/AvatarComponent";
import { ArrowLeftIcon } from "@/public/icons";
import React, { useContext, useState } from "react";
import { WebContext } from "@/context/WebContext";
import { type } from "os";

type Props = {
	className?: string;
};

export const CustomAvatar = ({ className }) => {
	const { activeAvatarPreset, handlePresetAvatarSubmit, setEditAvatarWindow, customAvatar } =
		useContext(WebContext);

	const handleReset = () => {
		handlePresetAvatarSubmit(activeAvatarPreset);
		setEditAvatarWindow(false);
	};

	return (
		<>
			<div className={`flex flex-col gap-5 items-center ${className}`}>
				<AvatarComponent
					avatar={customAvatar}
					className="w-full h-full bg-primary-500 rounded-full object-cover"
				/>
			</div>
		</>
	);
};
