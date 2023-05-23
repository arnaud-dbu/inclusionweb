import React from 'react';
import Avatar from 'avataaars';

type Props = {
    className?: string;
    data?: any;
};

const AvatarComponent = ({ className, data }: Props) => {
    let avatarData;

    if (typeof data === 'string') {
        try {
            avatarData = JSON.parse(data);
        } catch (error) {
            console.log('Error occurred while parsing data:', error);
            return null;
        }
    } else {
        avatarData = data;
    }

    if (!avatarData) {
        console.log('No data provided');
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
    } = avatarData;

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
