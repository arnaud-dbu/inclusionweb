"use client";

import Avatar from "avataaars";

type Props = {
    className: string;
    data: string;
};

const AvatarComponent = ({ className, data }: Props) => {
    const parsedData = JSON.parse(data);
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
    } = parsedData;

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
