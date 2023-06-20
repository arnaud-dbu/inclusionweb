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

	switch (type) {
		case "youngManAvatar":
			avatarStyles = {
				topType: "ShortHairShortFlat",
				accessoriesType: "Blank",
				hairColor: "BrownDark",
				facialHairType: "Blank",
				clotheType: "ShirtCrewNeck",
				eyeType: "Default",
				eyebrowType: "Default",
				mouthType: "Default",
				skinColor: "Light",
			};

			break;
		case "youngWomanAvatar":
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

			break;
		case "middleAgeWomanAvatar":
			avatarStyles = {
				topType: "LongHairBigHair",
				accessoriesType: "Prescription02",
				hairColor: "Black",
				facialHairType: "Blank",
				clotheType: "ShirtVNeck",
				eyeType: "Default",
				eyebrowType: "RaisedExcited",
				mouthType: "Default",
				skinColor: "Light",
			};

			break;
		case "middleAgeManAvatar":
			avatarStyles = {
				topType: "ShortHairDreads01",
				accessoriesType: "Prescription02",
				hairColor: "Brown",
				facialHairType: "BeardMajestic",
				clotheType: "ShirtVNeck",
				eyeType: "Default",
				eyebrowType: "RaisedExcited",
				mouthType: "Default",
				skinColor: "Light",
			};

			break;
		case "oldManAvatar":
			avatarStyles = {
				topType: "ShortHairSides",
				accessoriesType: "Blank",
				hairColor: "Brown",
				facialHairType: "Brown",
				clotheType: "BlazerSweater",
				eyeType: "Default",
				eyebrowType: "Default",
				mouthType: "Default",
				skinColor: "Light",
			};

			break;
		case "oldWomanAvatar":
			avatarStyles = {
				topType: "LongHairCurly",
				accessoriesType: "Blank",
				hairColor: "SilverGray",
				facialHairType: "Brown",
				clotheType: "ShirtScoopNeck",
				eyeType: "Default",
				eyebrowType: "RaisedExcited",
				mouthType: "Default",
				skinColor: "Light",
			};

			break;
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className={`cursor-pointer rounded-full bg-primary-500 ${className}`}>
			<AvatarComponent className="h-10 w-10 rounded-full" avatar={avatarStyles} />
		</button>
	);
};

export const SelectEditAvatar = ({ className, onClick }: EditProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`relative h-10 w-10 cursor-pointer rounded-full border-[1.5px] border-neutral-500 ${className}`}>
			<PencilIcon className="absolute-center h-6 w-6 fill-neutral-800" />
		</button>
	);
};

export const SelectImageThumbnail = ({ className, onClick }: EditProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={`relative h-10 w-10 cursor-pointer rounded-full border-[1.5px] border-neutral-500 ${className}`}>
			<ImageIcon className="absolute-center h-6 w-6 fill-neutral-800" />
		</button>
	);
};
