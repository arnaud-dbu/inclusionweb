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

// type WebContextType = {

// };

export const WebContext = createContext(null);

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
}: Props) => {
	// Data
	const [contacts, setContacts] = useState(fetchedContactsData);
	const [web, setWeb] = useState(fetchedWebData);
	const [sessions, sesSessions] = useState(fetchedSessionsData);

	// Search function
	const [query, setQuery] = useState<string>("");
	const [inputValue, setInputValue] = useState<string>("");

	const handleSearchFilter = (e: any) => {
		setQuery(e.target.value.toLowerCase());
	};

	const handleInputChange = (e: any) => {
		setInputValue(e.target.value);
		handleSearchFilter(e);
	};

	// States
	const [modalVisible, setModalVisible] = useState(false);

	const [showDroppedContacts, setShowDroppedContacts] = useState<boolean>(false);
	const [editContact, setEditContact] = useState(null);
	const [view, setView] = useState("grid");

	const [editInfoVisible, setEditInfoVisible] = useState("Gegevens");

	const [avatarSize, setAvatarSize] = useState<string>(fetchedWebData?.images_size);
	const [namesVisible, setNamesVisible] = useState(fetchedWebData?.names_visible);

	const [type, setType] = useState<string>("person");
	const [selectedImage, setSelectedImage] = useState<any>("");
	const [imageUrl, setImageUrl] = useState("");
	const [dragContacts, setDragContacts] = useState(fetchedContactsData);
	const [avatarEditWindow, setEditAvatarWindow] = useState(false);
	const [thumbnail, setThumbnail] = useState("avatar" || "image");
	const [activeAvatarPreset, setActiveAvatarPreset] = useState("youngManAvatar");
	const [selectedReceivedSupport, setSelectedReceivedSupport] = useState([]);
	const [selectedGivenSupport, setSelectedGivenSupport] = useState([]);

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

	const searchFilter = (array) => {
		return array.filter((el) => el.name.toLowerCase().includes(query));
	};

	// Check if contacts array exists before filtering
	const searchFilteredContacts = contacts ? searchFilter(contacts) : [];

	const toggleEditAvatarWindow = () => {
		setEditAvatarWindow(!avatarEditWindow);
	};

	const toggleModalVisibility = (modalName, isVisible) => {
		if (modalName === "contact") {
			setModalVisible(isVisible);
		}
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
				web,
				setWeb,
				sessions,
				sesSessions,
				contacts,
				setContacts,
				inputValue,
				setInputValue,
				handleInputChange,
				toggleModalVisibility,
				editInfoVisible,
				setEditInfoVisible,

				fetchedWebData,
				fetchedContactsData,
				fetchedSessionsData,

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
				thumbnail,
				setThumbnail,
				type,
				setType,
				selectedImage,
				setSelectedImage,
				imageUrl,
				setImageUrl,
				dragContacts,
				setDragContacts,
				editContact,
				setEditContact,
				selectedGivenSupport,
				setSelectedGivenSupport,
				selectedReceivedSupport,
				setSelectedReceivedSupport,
			}}>
			{children}
		</WebContext.Provider>
	);
};
