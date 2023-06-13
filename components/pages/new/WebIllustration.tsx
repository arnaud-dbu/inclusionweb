"use client";

import Image from "next/image";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { UserIcon } from "@/public/icons";

type Props = {
	className?: string;
	image?: string;
	avatar?: any;
	thumbnail?: string;
};

const WebIllustration = ({ className, avatar, image = "", thumbnail }: Props) => {
	return (
		<>
			<div className={`web ${className}`}>
				{thumbnail === "default" && (
					<div className="absolute left-1/2 top-1/2 z-10 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-primary-500 object-cover">
						<UserIcon className={`h-[24rem] w-[24rem] fill-white`} />
					</div>
				)}
				{thumbnail === "customImage" && (
					<Image
						className="absolute left-1/2 top-1/2 z-10 aspect-square h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
						alt="profile picture"
						src={image || "/"}
						width={700}
						height={700}
					/>
				)}
				{thumbnail === "avatar" && (
					<AvatarComponent className="absolute-center z-50 h-[24rem] w-[24rem]" avatar={avatar} />
				)}
				<div className="web-inner opacity-20"></div>
				<div className="web-inner scale-[.8] opacity-20"></div>
				<div className="web-inner scale-[.6] opacity-25"></div>
				<div className="web-inner scale-[.4] opacity-30"></div>
				<div className="web-inner scale-[.4] opacity-30"></div>
			</div>
		</>
	);
};

export default WebIllustration;
