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
		<div className={className}>
			<div className={`web`}>
				<div className="web-inner opacity-20"></div>
				<div className="web-inner scale-[.8] opacity-20"></div>
				<div className="web-inner scale-[.6] opacity-25"></div>
				<div className="web-inner scale-[.4] opacity-25"></div>
				<div className="web-inner scale-[.2] opacity-40"></div>
			</div>
		</div>
	);
};

export default WebIllustration;
