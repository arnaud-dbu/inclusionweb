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
import { type } from "os";
import { Button } from "@/components/form/Button";

type Props = {
	setShowOnWeb?: any;
	className?: string;
};

export const CustomAvatarForm = ({ setShowOnWeb, className }: Props) => {
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
		toggleModalVisibility,
	} = useContext(EditAvatarContext);

	const handleShowAvatarOnWeb = () => {
		setShowOnWeb("avatar");
		toggleModalVisibility();
	};

	return (
		<section className={`${className}`}>
			<ul className="flex flex-col gap-4">
				<AvatarStyle
					name="Huidskleur"
					prevBtn={() => handleSwitchAvatarStyles(skinColor, "<")}
					nextBtn={() => handleSwitchAvatarStyles(skinColor, ">")}>
					<SkinColorIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar"
					prevBtn={() => handleSwitchAvatarStyles(topType, "<")}
					nextBtn={() => handleSwitchAvatarStyles(topType, ">")}>
					<HairIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Ogen"
					prevBtn={() => handleSwitchAvatarStyles(eyes, "<")}
					nextBtn={() => handleSwitchAvatarStyles(eyes, ">")}>
					<EyeIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Mond"
					prevBtn={() => handleSwitchAvatarStyles(mouth, "<")}
					nextBtn={() => handleSwitchAvatarStyles(mouth, ">")}>
					<MouthIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Wenkbrauwen"
					prevBtn={() => handleSwitchAvatarStyles(eyebrow, "<")}
					nextBtn={() => handleSwitchAvatarStyles(eyebrow, ">")}>
					<EyeBrowIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Kleding"
					prevBtn={() => handleSwitchAvatarStyles(clothes, "<")}
					nextBtn={() => handleSwitchAvatarStyles(clothes, ">")}>
					<ClothesIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar Kleur"
					prevBtn={() => handleSwitchAvatarStyles(hairColor, "<")}
					nextBtn={() => handleSwitchAvatarStyles(hairColor, ">")}>
					<HairColorIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Bril"
					prevBtn={() => handleSwitchAvatarStyles(accessoriesType, "<")}
					nextBtn={() => handleSwitchAvatarStyles(accessoriesType, ">")}>
					<GlassesIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Baardgroei"
					prevBtn={() => handleSwitchAvatarStyles(facialHair, "<")}
					nextBtn={() => handleSwitchAvatarStyles(facialHair, ">")}>
					<FacialHairIcon className="w-6 h-6 fill-neutral-900 mr-5" />
				</AvatarStyle>
			</ul>
			{setShowOnWeb ? (
				<Button
					onClick={handleShowAvatarOnWeb}
					style="primary"
					label="Opslaan"
					className="w-full mt-8"
				/>
			) : (
				<Btn tertiary submit onClick={() => setEditAvatarWindow(false)} className="w-full mt-8">
					Opslaan
				</Btn>
			)}
		</section>
	);
};
