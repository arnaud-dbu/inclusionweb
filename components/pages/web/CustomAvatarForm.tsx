"use client";

import { useContext } from "react";
import AvatarStyle from "@/components/avatar/AvatarStyle";
import {
	ClothesIcon,
	EyeBrowIcon,
	EyeIcon,
	FacialHairIcon,
	GlassesIcon,
	HairColorIcon,
	HairIcon,
	MouthIcon,
	SkinColorIcon,
} from "@/public/icons";
import { WebContext } from "@/context/WebContext";

type Props = {
	setShowOnWeb?: any;
	className?: string;
};

export const CustomAvatarForm = ({ className }: Props) => {
	const {
		skinColor,
		topType,
		eyes,
		mouth,
		handleSwitchAvatarStyles,
		eyebrow,
		clothes,
		hairColor,
		accessoriesType,
		facialHair,
	} = useContext(WebContext);

	return (
		<section className={`${className}`}>
			<ul className="flex flex-col">
				<AvatarStyle
					name="Huidskleur"
					prevBtn={() => handleSwitchAvatarStyles(skinColor, "<")}
					nextBtn={() => handleSwitchAvatarStyles(skinColor, ">")}>
					<SkinColorIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar"
					prevBtn={() => handleSwitchAvatarStyles(topType, "<")}
					nextBtn={() => handleSwitchAvatarStyles(topType, ">")}>
					<HairIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar Kleur"
					prevBtn={() => handleSwitchAvatarStyles(hairColor, "<")}
					nextBtn={() => handleSwitchAvatarStyles(hairColor, ">")}>
					<HairColorIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Ogen"
					prevBtn={() => handleSwitchAvatarStyles(eyes, "<")}
					nextBtn={() => handleSwitchAvatarStyles(eyes, ">")}>
					<EyeIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Mond"
					prevBtn={() => handleSwitchAvatarStyles(mouth, "<")}
					nextBtn={() => handleSwitchAvatarStyles(mouth, ">")}>
					<MouthIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Wenkbrauwen"
					prevBtn={() => handleSwitchAvatarStyles(eyebrow, "<")}
					nextBtn={() => handleSwitchAvatarStyles(eyebrow, ">")}>
					<EyeBrowIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Kleding"
					prevBtn={() => handleSwitchAvatarStyles(clothes, "<")}
					nextBtn={() => handleSwitchAvatarStyles(clothes, ">")}>
					<ClothesIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>

				<AvatarStyle
					name="Bril"
					prevBtn={() => handleSwitchAvatarStyles(accessoriesType, "<")}
					nextBtn={() => handleSwitchAvatarStyles(accessoriesType, ">")}>
					<GlassesIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
				<AvatarStyle
					name="Baardgroei"
					prevBtn={() => handleSwitchAvatarStyles(facialHair, "<")}
					nextBtn={() => handleSwitchAvatarStyles(facialHair, ">")}>
					<FacialHairIcon className="mr-5 h-7 w-7 fill-neutral-900" />
				</AvatarStyle>
			</ul>
		</section>
	);
};
