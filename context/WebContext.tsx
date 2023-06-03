import { createContext, ReactNode, useEffect, useState } from "react";
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
} from "@/lib/avatarPresets";

export type AvatarType = {
	topType: string;
	accessoriesType: string;
	hairColor: string;
	facialHairType: string;
	clotheType: string;
	eyeType: string;
	eyebrowType: string;
	mouthType: string;
	skinColor: string;
};

type WebContextType = {
	fetchedWebData: any;
	fetchedContactsData: any;
	fetchedSessionsData: any;
	session: number;
	contacts: any[];
	setContacts: (contacts: any[]) => void;
	setModalVisible: (visible: boolean) => void;
	showDroppedContacts: boolean;
	setShowDroppedContacts: (category: boolean) => void;
	modalVisible: boolean;
	query: string;
	setQuery: (query: string) => void;
	searchFilter: any;
	handleSearchFilter: (e: any) => void;
	searchFilteredContacts: any;
	view: string;
	setView: (view: string) => void;
	avatarSize: string;
	setAvatarSize: (size: string) => void;
	namesVisible: boolean;
	setNamesVisible: (visible: boolean) => void;
	avatarEditWindow: boolean;
	activeAvatarPreset: string;
	setActiveAvatarPreset: (preset: string) => void;
	setEditAvatarWindow: (value: boolean) => void;
	topType: string[];
	setTopType: (types: string[]) => void;
	accessoriesType: string[];
	setAccessoriesType: (types: string[]) => void;
	hairColor: string[];
	setHairColor: (colors: string[]) => void;
	facialHair: string[];
	setFacialHair: (types: string[]) => void;
	clothes: string[];
	setClothes: (types: string[]) => void;
	eyes: string[];
	setEyes: (types: string[]) => void;
	eyebrow: string[];
	setEyebrow: (types: string[]) => void;
	mouth: string[];
	setMouth: (types: string[]) => void;
	skinColor: string[];
	setSkinColor: (colors: string[]) => void;
	handleSwitchAvatarStyles: (item: string[], dir: ">" | "<") => void;
	handlePresetAvatarSubmit: (type: string) => void;
	toggleEditAvatarWindow: () => void;
	customAvatar: AvatarType;
	toggleModalVisibility: () => void;
	thumbnail: string;
	setThumbnail: (value: string) => void;
	type: string;
	setType: (type: string) => void;
	selectedImage: any;
	setSelectedImage: (image: any) => void;
	imageUrl: string;
	setImageUrl: (url: string) => void;
	editAvatarFormIsVisible: boolean;
	setEditAvatarFormIsVisible: (visible: boolean) => void;
};

export const WebContext = createContext<WebContextType | null>(null);

type Props = {
	children: ReactNode;
	fetchedWebData?: any;
	fetchedContactsData?: any;
	fetchedSessionsData?: any;
	contacts?: any;
	setContacts?: any;
	session?: number;
};

export const WebProvider = ({
	children,
	fetchedWebData,
	fetchedContactsData,
	fetchedSessionsData,
	session,
	contacts,
	setContacts,
}: Props) => {
	// States
	const [showDroppedContacts, setShowDroppedContacts] = useState(false);
	const [query, setQuery] = useState("");
	const [view, setView] = useState("grid");
	const [avatarSize, setAvatarSize] = useState<string>("small");
	const [type, setType] = useState("person");
	const [selectedImage, setSelectedImage] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [editAvatarFormIsVisible, setEditAvatarFormIsVisible] = useState(true);
	const [namesVisible, setNamesVisible] = useState(true);
	const [avatarEditWindow, setEditAvatarWindow] = useState(false);
	const [modalVisible, setModalVisible] = useState(false);
	const [thumbnail, setThumbnail] = useState("avatar" || "image");
	const [activeAvatarPreset, setActiveAvatarPreset] = useState("youngManAvatar");

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

	// Handlers
	const handleSearchFilter = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	const searchFilter = (array) => {
		return array.filter((el) => el.name.toLowerCase().includes(query));
	};

	// Check if contacts array exists before filtering
	const searchFilteredContacts = contacts ? searchFilter(contacts) : [];

	const toggleEditAvatarWindow = () => {
		setEditAvatarWindow(!avatarEditWindow);
	};

	const toggleModalVisibility = () => {
		setModalVisible(!modalVisible);
	};

	const handleSwitchAvatarStyles = (item, dir) => {
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

	const handlePresetAvatarSubmit = (type) => {
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
		setThumbnail("avatar");
	};

	return (
		<WebContext.Provider
			value={{
				fetchedWebData,
				fetchedContactsData,
				fetchedSessionsData,
				contacts,
				setContacts,
				modalVisible,
				session,
				setModalVisible,
				showDroppedContacts,
				setShowDroppedContacts,
				query,
				setQuery,
				searchFilter,
				handleSearchFilter,
				searchFilteredContacts,
				avatarSize,
				setAvatarSize,
				view,
				setView,
				namesVisible,
				setNamesVisible,
				avatarEditWindow,
				activeAvatarPreset,
				setActiveAvatarPreset,
				setEditAvatarWindow,
				topType,
				setTopType,
				accessoriesType,
				setAccessoriesType,
				hairColor,
				setHairColor,
				facialHair,
				setFacialHair,
				clothes,
				setClothes,
				eyes,
				setEyes,
				eyebrow,
				setEyebrow,
				mouth,
				setMouth,
				skinColor,
				setSkinColor,
				handleSwitchAvatarStyles,
				handlePresetAvatarSubmit,
				toggleEditAvatarWindow,
				customAvatar,
				toggleModalVisibility,
				thumbnail,
				setThumbnail,
				type,
				setType,
				selectedImage,
				setSelectedImage,
				imageUrl,
				setImageUrl,
				editAvatarFormIsVisible,
				setEditAvatarFormIsVisible,
			}}>
			{children}
		</WebContext.Provider>
	);
};
