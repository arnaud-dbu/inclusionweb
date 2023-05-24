"use client";

import { useEffect, useState } from "react";
import {
	accessoriesTypes,
	clothesTypes,
	eyeTypes,
	eyebrowTypes,
	facialHairTypes,
	hairColors,
	mouthTypes,
	skinColors,
	topTypes,
	youngManAvatar,
} from "@/lib/avatarPresets";
import { NewContactAvatar } from "./NewContactAvatar";
import { NewContactForm } from "./NewContactForm";
import { AvatarEditForm } from "./AvatarEditForm";
import { CustomAvatar } from "./CustomAvatar";

type Props = {
	modalVisible: any;
	setModalVisible: any;
};

const Modal = ({ modalVisible, setModalVisible }: Props) => {
	const [avatarEditWindow, setEditAvatarWindow] = useState(false);

	const [topType, setTopType] = useState<string[]>(["ShortHairShortFlat", ...topTypes.slice(1)]);
	const [accessoriesType, setAccessoriesType] = useState<string[]>([
		"Blank",
		...accessoriesTypes.slice(1),
	]);
	const [hairColor, setHairColor] = useState<string[]>(["BrownDark", ...hairColors.slice(1)]);
	const [facialHair, setFacialHair] = useState<string[]>(["Blank", ...facialHairTypes.slice(1)]);
	const [clothes, setClothes] = useState<string[]>(["ShirtCrewNeck", ...clothesTypes.slice(1)]);
	const [eyes, setEyes] = useState<string[]>(["Default", ...eyeTypes.slice(1)]);
	const [eyebrow, setEyebrow] = useState<string[]>(["Default", ...eyebrowTypes.slice(1)]);
	const [mouth, setMouth] = useState<string[]>(["Default", ...mouthTypes.slice(1)]);
	const [skinColor, setSkinColor] = useState<string[]>(["Light", ...skinColors.slice(1)]);

	const handleItem = (item, dir) => {
		const currentIndex = item.indexOf(item.find((type) => type === item[0]));
		let newItem = [];

		if (dir === ">") {
			newItem = [...item.slice(currentIndex + 1), ...item.slice(0, currentIndex + 1)];
		} else {
			newItem = [...item.slice(currentIndex - 1), ...item.slice(0, currentIndex - 1)];
		}

		switch (item) {
			case topType:
				setTopType(newItem);
				break;
			case skinColor:
				setSkinColor(newItem);
				break;
			case accessoriesType:
				setAccessoriesType(newItem);
				break;
			case hairColor:
				setHairColor(newItem);
				break;
			case facialHair:
				setFacialHair(newItem);
				break;
			case clothes:
				setClothes(newItem);
				break;
			case eyes:
				setEyes(newItem);
				break;
			case eyebrow:
				setEyebrow(newItem);
				break;
			case mouth:
				setMouth(newItem);
				break;
		}
	};

	let customAvatar = {
		topType: topType[0],
		accessoriesType: accessoriesType[0],
		hairColor: hairColor[0],
		facialHairType: facialHair[0],
		clotheType: clothes[0],
		eyeType: eyes[0],
		eyebrowType: eyebrow[0],
		mouthType: mouth[0],
		skinColor: skinColor[0],
	};

	const handleCustomAvatarSubmit = () => {
		// setAvatarStyle(customAvatar);
		setEditAvatarWindow(false);
	};

	const handleEditAvatarWindow = () => {
		setEditAvatarWindow(true);
	};

	const handlePresetAvatarSubmit = (type) => {
		console.log(type);
		switch (type) {
			case "youngManAvatar":
				setTopType(["ShortHairShortFlat", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Blank", ...accessoriesTypes.slice(1)]);
				setHairColor(["BrownDark", ...hairColors.slice(1)]);
				setFacialHair(["Blank", ...facialHairTypes.slice(1)]);
				setClothes(["ShirtCrewNeck", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["Default", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);
				setActiveAvatarPreset("youngManAvatar");
				break;
			case "youngWomanAvatar":
				setTopType(["LongHairCurvy", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Blank", ...accessoriesTypes.slice(1)]);
				setHairColor(["BrownDark", ...hairColors.slice(1)]);
				setFacialHair(["Blank", ...facialHairTypes.slice(1)]);
				setClothes(["BlazerShirt", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["Default", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);
				setActiveAvatarPreset("youngWomanAvatar");
				break;
		}
	};

	const [activeAvatarPreset, setActiveAvatarPreset] = useState("youngManAvatar");

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		modalVisible && (
			<>
				<div className="w-screen h-screen bg-neutral-900 relative z-50 opacity-30"></div>
				<dialog
					open
					className="relative flex items-center justify-center m-0 absolute-center z-50 rounded-3xl px-0 bg-primary-100 pt-[3.5rem] pb-[4rem] w-[65rem]">
					<div className="flex items-center justify-between gap-14 relative mx-20">
						{avatarEditWindow ? (
							<CustomAvatar
								customAvatar={customAvatar}
								handlePresetAvatarSubmit={handlePresetAvatarSubmit}
								setEditAvatarWindow={setEditAvatarWindow}
								activeAvatarPreset={activeAvatarPreset}
							/>
						) : (
							<NewContactAvatar avatarStyle={customAvatar} />
						)}

						<div className="w-[1.5px] h-[50rem] bg-neutral-400"></div>

						{avatarEditWindow ? (
							<AvatarEditForm
								setEditAvatarWindow={setEditAvatarWindow}
								handleCustomAvatarSubmit={handleCustomAvatarSubmit}
								handleItem={handleItem}
								skinColor={skinColor}
								topType={topType}
								eyes={eyes}
								mouth={mouth}
								eyebrow={eyebrow}
								clothes={clothes}
								hairColor={hairColor}
								accessoriesType={accessoriesType}
								facialHair={facialHair}
							/>
						) : (
							<NewContactForm
								activeAvatarPreset={activeAvatarPreset}
								setModalVisible={setModalVisible}
								setEditAvatarWindow={setEditAvatarWindow}
								handlePresetAvatarSubmit={handlePresetAvatarSubmit}
								handleEditAvatarWindow={handleEditAvatarWindow}
								customAvatar={customAvatar}
							/>
						)}
					</div>
					{/* <Btn submit onClick={() => setModalVisible(false)}>
                Close
              </Btn> */}
				</dialog>
			</>
		)
	);
};

export default Modal;
