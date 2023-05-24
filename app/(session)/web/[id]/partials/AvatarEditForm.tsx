"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
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

type Props = {
	setEditAvatarWindow: any;
	handleCustomAvatarSubmit: any;
	handleItem: any;
	skinColor: string[];
	topType: string[];
	eyes: string[];
	mouth: string[];
	eyebrow: string[];
	clothes: string[];
	hairColor: string[];
	accessoriesType: string[];
	facialHair: string[];
};

export const AvatarEditForm = ({
	setEditAvatarWindow,
	handleCustomAvatarSubmit,
	handleItem,
	skinColor,
	topType,
	eyes,
	mouth,
	eyebrow,
	clothes,
	hairColor,
	accessoriesType,
	facialHair,
}: Props) => {
	return (
		<section>
			<ul className="flex flex-col gap-4">
				<AvatarStyle
					name="Huidskleur"
					prevBtn={() => handleItem(skinColor, "<")}
					nextBtn={() => handleItem(skinColor, ">")}>
					<SkinColorIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar"
					prevBtn={() => handleItem(topType, "<")}
					nextBtn={() => handleItem(topType, ">")}>
					<HairIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Ogen"
					prevBtn={() => handleItem(eyes, "<")}
					nextBtn={() => handleItem(eyes, ">")}>
					<EyeIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Mond"
					prevBtn={() => handleItem(mouth, "<")}
					nextBtn={() => handleItem(mouth, ">")}>
					<MouthIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Wenkbrauwen"
					prevBtn={() => handleItem(eyebrow, "<")}
					nextBtn={() => handleItem(eyebrow, ">")}>
					<EyeBrowIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Kleding"
					prevBtn={() => handleItem(clothes, "<")}
					nextBtn={() => handleItem(clothes, ">")}>
					<ClothesIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Haar Kleur"
					prevBtn={() => handleItem(hairColor, "<")}
					nextBtn={() => handleItem(hairColor, ">")}>
					<HairColorIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Bril"
					prevBtn={() => handleItem(accessoriesType, "<")}
					nextBtn={() => handleItem(accessoriesType, ">")}>
					<GlassesIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
				<AvatarStyle
					name="Baardgroei"
					prevBtn={() => handleItem(facialHair, "<")}
					nextBtn={() => handleItem(facialHair, ">")}>
					<FacialHairIcon className="fill-neutral-900 mr-5" />
				</AvatarStyle>
			</ul>

			<Btn tertiary submit onClick={handleCustomAvatarSubmit} className="w-full mt-8">
				Opslaan
			</Btn>
		</section>
	);
};
