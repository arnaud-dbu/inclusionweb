import { createContext, ReactNode, useState } from "react";

type WebContextType = {
	fetchedWebData: any;
	fetchedContactsData: any;
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
};

export const WebContext = createContext<WebContextType | null>(null);

type Props = {
	children: ReactNode;
	fetchedWebData: any;
	fetchedContactsData: any;
	contacts: any[];
	setContacts: (contacts: any[]) => void;
};

export const WebProvider = ({
	children,
	fetchedWebData,
	fetchedContactsData,
	contacts,
	setContacts,
}: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [showDroppedContacts, setShowDroppedContacts] = useState(false);
	const [query, setQuery] = useState("");
	const [view, setView] = useState("grid");
	const [avatarSize, setAvatarSize] = useState("small");
	const [namesVisible, setNamesVisible] = useState(true);

	// Search filter function
	const searchFilter = (array) => {
		return array.filter((el) => el.name.toLowerCase().includes(query));
	};

	const searchFilteredContacts = searchFilter(contacts);

	//Handling the input on our search bar
	const handleSearchFilter = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	return (
		<WebContext.Provider
			value={{
				fetchedWebData,
				fetchedContactsData,
				contacts,
				setContacts,
				modalVisible,
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
			}}>
			{children}
		</WebContext.Provider>
	);
};
