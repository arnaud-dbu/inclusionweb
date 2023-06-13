"use client";

import Image from "next/image";
import AvatarComponent from "@/components/avatar/AvatarComponent";

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
				<div className="web-inner opacity-20"></div>
				<div className="web-inner opacity-20 scale-[.8]"></div>
				<div className="web-inner opacity-25 scale-[.6]"></div>
				{/* {thumbnail === "default" && (
					<div className="absolute rounded-full object-cover left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"></div>
				)} */}
				{thumbnail === "image" && (
					<Image
						className="absolute rounded-full w-[20rem] aspect-square object-cover left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
						alt="test"
						src={image || "/"}
						width={700}
						height={700}
					/>
				)}
				{thumbnail === "avatar" && (
					<AvatarComponent
						className="absolute-center w-[20rem] z-50 h-[20rem] bg-primary-500 mb-2 rounded-full object-cover"
						avatar={avatar}
					/>
				)}
				<div className="web-inner opacity-30 scale-[.4]"></div>
				<div className="web-inner opacity-30 scale-[.2]"></div>
			</div>
		</>
	);
};

export default WebIllustration;
