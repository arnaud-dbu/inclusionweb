import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon } from "@/public/icons";
import React from "react";

type Props = {
	children: React.ReactNode;
	type: string;
	size?: string;
};

const ContactThumbnail = ({ children, type, size }: Props) => {
	const iconMd = "w-6 h-6 fill-white";
	const iconSm = "w-4 h-4 fill-white";

	return (
		<div className={`relative rounded-full  `}>
			{children}
			<div className={`absolute bottom-1 right-1 bg-primary-700 rounded-full p-2 shadow-lg`}>
				{type === "person" && <PersonIcon className={size === "sm" ? iconSm : iconMd} />}
				{type === "group" && <GroupIcon className={size === "sm" ? iconSm : iconMd} />}
				{type === "place" && <PlaceIcon className={size === "sm" ? iconSm : iconMd} />}
				{type === "animal" && <AnimalIcon className={size === "sm" ? iconSm : iconMd} />}
			</div>
		</div>
	);
};

export default ContactThumbnail;
