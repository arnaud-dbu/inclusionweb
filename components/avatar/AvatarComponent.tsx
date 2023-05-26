import Avatar from "avataaars";

type Props = {
	className?: string;
	avatar?: any;
};

const AvatarComponent = ({ className, avatar }: Props) => {
	let avatarStyles;

	if (typeof avatar === "string") {
		try {
			avatarStyles = JSON.parse(avatar);
		} catch (error) {
			console.log("Error occurred while parsing data:", error);
			return null;
		}
	} else {
		avatarStyles = avatar;
	}

	if (!avatarStyles) {
		return null;
	}

	const {
		topType,
		accessoriesType,
		hairColor,
		facialHairType,
		clotheType,
		eyeType,
		eyebrowType,
		mouthType,
		skinColor,
	} = avatarStyles;

	return (
		<Avatar
			className={`${className}`}
			avatarStyle=""
			topType={topType}
			accessoriesType={accessoriesType}
			hairColor={hairColor}
			facialHairType={facialHairType}
			clotheType={clotheType}
			eyeType={eyeType}
			eyebrowType={eyebrowType}
			mouthType={mouthType}
			skinColor={skinColor}
		/>
	);
};

export default AvatarComponent;