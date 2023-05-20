"use client";

import Avatar from "avataaars";

type Props = {
    className: string;
};

const AvatarComponent = ({ className }: Props) => {
    return (
        <Avatar
            className={` ${className}`}
            avatarStyle=""
            topType="LongHairStraight"
            accessoriesType="Blank"
            hairColor="BrownDark"
            facialHairType="Blank"
            clotheType="BlazerShirt"
            eyeType="Default"
            eyebrowType="Default"
            mouthType="Default"
            skinColor="Light"
        />
    );
};

export default AvatarComponent;
