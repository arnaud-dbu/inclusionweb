import { H2 } from "@/components/Headings";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import React from "react";

type Props = {
	avatarStyle: any;
};

export const NewContactAvatar = ({ avatarStyle }: Props) => {
	return (
		<div className="flex flex-col gap-5 items-center">
			<AvatarComponent
				data={avatarStyle}
				className="w-[12.5rem] h-[12.5rem] bg-primary-500 rounded-full object-cover"
			/>
			<H2 className="mb-0 text-5xl">Nieuw contact</H2>
		</div>
	);
};
