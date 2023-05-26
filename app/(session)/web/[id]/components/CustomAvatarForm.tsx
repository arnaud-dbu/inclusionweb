"use client";

import React, { useContext, useState } from "react";
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
import { Btn } from "@/components/Buttons";
import { EditAvatarContext } from "@/context/EditAvatarContext";

export const CustomAvatarForm = () => {
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
		setEditAvatarWindow,
	} = useContext(EditAvatarContext);

	return (
		<section>
			<ul className="flex flex-col gap-4">
				<AvatarStyle
					name="Huidskleur"
					prevBtn={() => handleSwitchAvatarStyles(skinColor, "<")}
					nextBtn={() => handleSwitchAvatarStyles(skinColor, ">")}>
					<SkinColorIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar"
					prevBtn={() => handleSwitchAvatarStyles(topType, "<")}
					nextBtn={() => handleSwitchAvatarStyles(topType, ">")}>
					<HairIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Ogen"
					prevBtn={() => handleSwitchAvatarStyles(eyes, "<")}
					nextBtn={() => handleSwitchAvatarStyles(eyes, ">")}>
					<EyeIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Mond"
					prevBtn={() => handleSwitchAvatarStyles(mouth, "<")}
					nextBtn={() => handleSwitchAvatarStyles(mouth, ">")}>
					<MouthIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Wenkbrauwen"
					prevBtn={() => handleSwitchAvatarStyles(eyebrow, "<")}
					nextBtn={() => handleSwitchAvatarStyles(eyebrow, ">")}>
					<EyeBrowIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Kleding"
					prevBtn={() => handleSwitchAvatarStyles(clothes, "<")}
					nextBtn={() => handleSwitchAvatarStyles(clothes, ">")}>
					<ClothesIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar Kleur"
					prevBtn={() => handleSwitchAvatarStyles(hairColor, "<")}
					nextBtn={() => handleSwitchAvatarStyles(hairColor, ">")}>
					<HairColorIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Bril"
					prevBtn={() => handleSwitchAvatarStyles(accessoriesType, "<")}
					nextBtn={() => handleSwitchAvatarStyles(accessoriesType, ">")}>
					<GlassesIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Baardgroei"
					prevBtn={() => handleSwitchAvatarStyles(facialHair, "<")}
					nextBtn={() => handleSwitchAvatarStyles(facialHair, ">")}>
					<FacialHairIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
			</ul>

			<Btn tertiary submit onClick={() => setEditAvatarWindow(false)} className="w-full mt-8">
				Opslaan
			</Btn>
		</section>
	);
};
