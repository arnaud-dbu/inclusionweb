import { EditIcon, ImageIcon, ImageSquareIcon, PencilIcon } from "@/public/icons";
import AvatarComponent from "../avatar/AvatarComponent";

type Props = {
	type: string;
	onClick?: any;
	className?: string;
};

type EditProps = {
	onClick?: any;
	className?: string;
};

export const SelectAvatar = ({ type, onClick, className }: Props) => {
	let avatarStyles;

	if (type === "man") {
		avatarStyles = {
			topType: "ShortHairShortFlat",
			accessoriesType: "Blank",
			hairColor: "BrownDark",
			facialHairType: "Blank",
			clotheType: "ShirtCrewNeck",
			eyeType: "Default",
			// clotheColor="Blue03",
			eyebrowType: "Default",
			mouthType: "Default",
			skinColor: "Light",
		};
	} else if (type === "woman") {
		avatarStyles = {
			topType: "LongHairCurvy",
			accessoriesType: "Blank",
			hairColor: "BrownDark",
			facialHairType: "Blank",
			clotheType: "BlazerShirt",
			eyeType: "Default",
			eyebrowType: "Default",
			mouthType: "Default",
			skinColor: "Light",
		};
	}

	return (
		<div onClick={onClick} className={`cursor-pointer bg-primary-500 rounded-full ${className}`}>
			<AvatarComponent className="rounded-full w-10 h-10" avatar={avatarStyles} />
		</div>
	);
};

export const SelectEditAvatar = ({ className, onClick }: EditProps) => {
	return (
		<div
			onClick={onClick}
			className={`w-10 h-10 cursor-pointer rounded-full border-[1.5px] border-neutral-500 relative ${className}`}>
			<PencilIcon className="absolute-center fill-neutral-800 w-6 h-6" />
		</div>
	);
};

export const SelectImageThumbnail = ({ className, onClick }: EditProps) => {
	return (
		<div
			onClick={onClick}
			className={`w-10 h-10 cursor-pointer rounded-full border-[1.5px] border-neutral-500 relative ${className}`}>
			<ImageIcon className="absolute-center fill-neutral-800 w-6 h-6" />
		</div>
	);
};
