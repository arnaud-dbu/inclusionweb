import AvatarComponent from "@/components/avatar/AvatarComponent";
import { EditAvatarContext } from "@/context/EditAvatarContext";
import { ArrowLeftIcon } from "@/public/icons";
import React, { useContext, useState } from "react";

export const CustomAvatar = () => {
	const { activeAvatarPreset, handlePresetAvatarSubmit, setEditAvatarWindow, customAvatar } =
		useContext(EditAvatarContext);

	const handleReset = () => {
		handlePresetAvatarSubmit(activeAvatarPreset);
		setEditAvatarWindow(false);
	};

	return (
		<>
			<div onClick={handleReset} className="absolute top-0 left-0 flex items-center gap-3">
				<ArrowLeftIcon className="w-7 h-7 fill-neutral-800" />
				Ga Terug
			</div>
			<div className="flex flex-col gap-5 items-center">
				<AvatarComponent
					avatar={customAvatar}
					className="w-[12.5rem] h-[12.5rem] bg-primary-500 rounded-full object-cover"
				/>
			</div>
		</>
	);
};
