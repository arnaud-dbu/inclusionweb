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
			}}>
			{children}
		</WebContext.Provider>
	);
};
