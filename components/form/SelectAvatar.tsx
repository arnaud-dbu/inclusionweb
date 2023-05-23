import { EditIcon, ImageIcon, ImageSquareIcon, PencilIcon } from "@/public/icons";
import AvatarComponent from "../avatar/AvatarComponent"

type Props = {
    type: string;
}

export const SelectAvatar = ({ type }: Props) => {
    let avatarStyles;

    if (type === "man") {
        avatarStyles = {
            topType: 'ShortHairShortFlat',
            accessoriesType: 'Blank',
            hairColor: 'BrownDark',
            facialHairType: 'Blank',
            clotheType: 'ShirtCrewNeck',
            eyeType: 'Default',
            // clotheColor="Blue03",
            eyebrowType: 'Default',
            mouthType: 'Default',
            skinColor: 'Light',
        };
    } else if ((type === "woman")) {
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
        <button className="bg-primary-500 rounded-full">
            <AvatarComponent className="rounded-full w-10 h-10" data={avatarStyles} />
        </button>
    )
}

export const SelectEditAvatar = () => {
    return (
        <button className="w-10 h-10 rounded-full border-[1.5px] border-neutral-500 relative">
            <PencilIcon className="absolute-center fill-neutral-800 w-6 h-6" />
        </button>
    )
}

export const SelectImageThumbnail = ({ label, icon }: any) => {
    return (
        <button className="w-10 h-10 rounded-full border-[1.5px] border-neutral-500 relative">
            <ImageIcon className="absolute-center fill-neutral-800 w-6 h-6" />
        </button>
    )
}