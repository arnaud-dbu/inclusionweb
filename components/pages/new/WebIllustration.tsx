"use client";

import Image from "next/image";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { UserIcon } from "@/public/icons";
import LoadingSkeleton from "@/components/LoadingSkeleton";

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
				<div className={`absolute-center h-[42%] w-[42%]`}>
					{thumbnail === "loading" && <LoadingSkeleton className="h-full w-full rounded-full" />}
					{thumbnail === "default" && (
						<div className="overflow-hidden rounded-full bg-primary-500">
							<UserIcon className={`h-full w-full`} />
						</div>
					)}
					{thumbnail === "customImage" && (
						<Image
							className="h-[100%] w-[100%] rounded-full object-cover shadow-sm"
							alt="profile picture"
							src={image || "/"}
							width={200}
							height={200}
						/>
					)}
					{thumbnail === "avatar" && <AvatarComponent className="h-full w-full" avatar={avatar} />}
				</div>
			</div>
		</div>
	);
};

export default WebIllustration;
