import { createContext } from "react";

export const WebContext = createContext(null);

export const WebProvider = ({
	children,
	fetchedWebData,
	fetchedContactsData,
	contacts,
	setContacts,
	modalVisible,
	setModalVisible,
}) => {
	return (
		<WebContext.Provider
			value={{
				fetchedWebData,
				fetchedContactsData,
				contacts,
				setContacts,
				modalVisible,
				setModalVisible,
			}}>
			{children}
		</WebContext.Provider>
	);
};
