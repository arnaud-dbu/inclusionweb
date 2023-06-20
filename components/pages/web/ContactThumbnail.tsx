import { WebContext } from "@/context/WebContext";
import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon } from "@/public/icons";
import React, { useContext } from "react";

type Props = {
	children: React.ReactNode;
	type: string;
	size?: string;
	className?: string;
};

const ContactThumbnail = ({ children, type, size, className }: Props) => {
	const { view } = useContext(WebContext);

	const iconMd = "w-6 h-6 fill-white";
	const iconSm = "w-4 h-4 fill-white";

	return (
		<div className={`relative rounded-full ${className} `}>
			{children}
			<div
				className={`absolute rounded-full bg-primary-700 p-2 shadow-lg ${
					view === "grid" ? "bottom-1 right-1" : "-bottom-[2px] -right-1 scale-[.85]"
				}`}>
				{type === "person" && <PersonIcon className={size === "sm" ? iconSm : iconMd} />}
				{type === "group" && <GroupIcon className={size === "sm" ? iconSm : iconMd} />}
				{type === "place" && <PlaceIcon className={size === "sm" ? iconSm : iconMd} />}
				{type === "animal" && <AnimalIcon className={size === "sm" ? iconSm : iconMd} />}
			</div>
		</div>
	);
};

export default ContactThumbnail;
