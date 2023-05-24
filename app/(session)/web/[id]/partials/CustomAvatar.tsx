import AvatarComponent from "@/components/avatar/AvatarComponent";
import { ArrowLeftIcon } from "@/public/icons";
import React, { useState } from "react";

type Props = {
	customAvatar: any;
	setEditAvatarWindow: any;
	handlePresetAvatarSubmit: any;
	activeAvatarPreset: any;
};

export const CustomAvatar = ({
	customAvatar,
	handlePresetAvatarSubmit,
	activeAvatarPreset,
	setEditAvatarWindow,
}: Props) => {
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
					data={customAvatar}
					className="w-[12.5rem] h-[12.5rem] bg-primary-500 rounded-full object-cover"
				/>
			</div>
		</>
	);
};
