"use client";

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
import dayjs from "dayjs";

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

export const WebContext = createContext(null);

type Props = {
	children: ReactNode;
	fetchedWebData?: any;
	fetchedWebsData?: any;
	fetchedContactsData?: any;
	fetchedSessionsData?: any;
	user?: any;
	contacts?: any;
	setContacts?: any;
	session?: number;
	params?: any;
};

export const WebProvider = ({
	children,
	fetchedWebData,
	fetchedWebsData,
	fetchedContactsData,
	fetchedSessionsData,
	session,
}: Props) => {
	// Data
	const [sessions, setSessions] = useState(fetchedSessionsData);
	const [web, setWeb] = useState(fetchedWebData);
	const [webs, setWebs] = useState(fetchedWebsData);

	const currentSession = sessions?.filter((x) => x.session == session)[0];
	const currentSessionContacts = fetchedContactsData?.filter((contact) => {
		return contact.session_id === currentSession?.id;
	});

	const [contacts, setContacts] = useState(currentSessionContacts);

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

	// Convert session to string
	const getSession = (session) => {
		const sessionString = session.session.toString();
		const formattedDate = dayjs(session.created_at).format("MM/DD/YYYY");
		return `Versie ${sessionString} -  ${session.name || formattedDate}`;
	};

	// States
	const [modalVisible, setModalVisible] = useState(null);
	const [mobileNavVisible, setMobileNavVisible] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [clickPosition, setClickPosition] = useState(null);
	const [validationMessage, setValidationMessage] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
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
	const [editAvatarWindow, setEditAvatarWindow] = useState(false);
	const [thumbnail, setThumbnail] = useState("avatar");
	const [activeAvatarPreset, setActiveAvatarPreset] = useState("youngManAvatar");
	const [selectedReceivedSupport, setSelectedReceivedSupport] = useState<string[]>([]);
	const [selectedGivenSupport, setSelectedGivenSupport] = useState<string[]>([]);
	const [sidebarOpen, setSidebarOpen] = useState(true);

	// Handlers
	const searchFilter = (array) => {
		return array.filter((el) => el.name.toLowerCase().includes(query));
	};

	const toggleEditAvatarWindow = () => {
		setEditAvatarWindow(!editAvatarWindow);
	};

	const toggleModalVisibility = (modalName, isVisible) => {
		setModalVisible("session");
	};

	const handlePresetImageChangeUpload = async (image: any) => {
		setImageUrl(image);
		setThumbnail("presetImage");
	};

	// Add custom image
	const handleCustomImageChangeUpload = (e: any) => {
		setThumbnail("loading");

		setTimeout(() => {
			if (e.target.files[0]) {
				setSelectedImage(e.target.files[0]);
				setThumbnail("customImage");
			}
		}, 500);
	};

	const handleClosingModal = () => {
		setModalVisible(null);
		setEditContact(null);
		setThumbnail("avatar");
		setSelectedGivenSupport([""]);
		setSelectedReceivedSupport([""]);
		setActiveAvatarPreset("youngManAvatar");
		handlePresetAvatarSubmit("youngManAvatar");
		setType("person");
	};

	// Check if contacts array exists before filtering
	const searchFilteredContacts = contacts ? searchFilter(contacts) : [];

	// Custom image
	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage, setImageUrl]);

	// Custom avatar
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

	const handleSwitchAvatarStyles = (item, dir) => {
		setThumbnail("avatar");
		setActiveAvatarPreset(null);

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
				setThumbnail("avatar");
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
				setThumbnail("avatar");
				break;
			case "middleAgeWomanAvatar":
				setTopType(["LongHairBigHair", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Prescription02", ...accessoriesTypes.slice(1)]);
				setHairColor(["Black", ...hairColors.slice(1)]);
				setFacialHair(["Blank", ...facialHairTypes.slice(1)]);
				setClothes(["ShirtVNeck", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["RaisedExcited", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);

				setActiveAvatarPreset("middleAgeWomanAvatar");
				setThumbnail("avatar");
				break;
			case "middleAgeManAvatar":
				setTopType(["ShortHairDreads01", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Prescription02", ...accessoriesTypes.slice(1)]);
				setHairColor(["Brown", ...hairColors.slice(1)]);
				setFacialHair(["BeardMajestic", ...facialHairTypes.slice(1)]);
				setClothes(["ShirtVNeck", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["RaisedExcited", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);

				setActiveAvatarPreset("middleAgeManAvatar");
				setThumbnail("avatar");
				break;
			case "middleAgeWomanAvatar":
				setTopType(["LongHairBigHair", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Prescription02", ...accessoriesTypes.slice(1)]);
				setHairColor(["Black", ...hairColors.slice(1)]);
				setFacialHair(["Blank", ...facialHairTypes.slice(1)]);
				setClothes(["ShirtVNeck", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["DefaultNatural", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);

				setActiveAvatarPreset("middleAgeWomanAvatar");
				setThumbnail("avatar");
				break;
			case "oldManAvatar":
				setTopType(["ShortHairSides", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Blank", ...accessoriesTypes.slice(1)]);
				setHairColor(["Brown", ...hairColors.slice(1)]);
				setFacialHair(["Brown", ...facialHairTypes.slice(1)]);
				setClothes(["BlazerSweater", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["Default", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);

				setActiveAvatarPreset("oldManAvatar");
				setThumbnail("avatar");
				break;
			case "oldWomanAvatar":
				setTopType(["LongHairCurly", ...topTypes.slice(1)]);
				setSkinColor(["Light", ...skinColors.slice(1)]);
				setAccessoriesType(["Blank", ...accessoriesTypes.slice(1)]);
				setHairColor(["SilverGray", ...hairColors.slice(1)]);
				setFacialHair(["Brown", ...facialHairTypes.slice(1)]);
				setClothes(["ShirtScoopNeck", ...clothesTypes.slice(1)]);
				setEyes(["Default", ...eyeTypes.slice(1)]);
				setEyebrow(["RaisedExcited", ...eyebrowTypes.slice(1)]);
				setMouth(["Default", ...mouthTypes.slice(1)]);

				setActiveAvatarPreset("oldManAvatar");
				setThumbnail("avatar");
				break;
		}
	};

	return (
		<WebContext.Provider
			value={{
				web,
				setWeb,
				webs,
				setWebs,
				sessions,
				setSessions,
				contacts,
				setContacts,
				inputValue,
				setInputValue,
				handleInputChange,
				toggleModalVisibility,
				editInfoVisible,
				setEditInfoVisible,
				handlePresetImageChangeUpload,
				clickPosition,
				setClickPosition,
				isValid,
				setIsValid,
				getSession,
				currentSession,
				editAvatarWindow,
				activeAvatarPreset,
				modalVisible,
				setModalVisible,
				session,
				handleCustomImageChangeUpload,
				mobileNavVisible,
				setMobileNavVisible,
				validationMessage,
				setValidationMessage,
				isLoading,
				setIsLoading,
				fetchedWebData,
				fetchedWebsData,
				fetchedContactsData,
				fetchedSessionsData,
				sidebarOpen,
				setSidebarOpen,
				handleClosingModal,
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
