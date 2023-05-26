import { createContext, useState } from "react";

export const WebContext = createContext(null);

export const WebProvider = ({
	children,
	fetchedWebData,
	fetchedContactsData,
	contacts,
	setContacts,
}) => {
	const [modalVisible, setModalVisible] = useState(false);
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
