"use client";

import { useState } from "react";
import SideBar from "./SideBar";
import { WebProvider } from "@/context/WebContext";
import { EditAvatarProvider } from "@/context/EditAvatarContext";
import Modal from "./Modal";
import Web from "./Web";

type Props = {
	fetchedContactsData: any;
	fetchedWebData: any;
};

const MyWeb = ({ fetchedWebData, fetchedContactsData }: Props) => {
	const [contacts, setContacts] = useState(fetchedContactsData);
	// const [contacts, setContacts] = useLocalStorage("contacts", fetchedContactsData);

	return (
		<WebProvider
			fetchedWebData={fetchedWebData}
			fetchedContactsData={fetchedContactsData}
			contacts={contacts}
			setContacts={setContacts}>
			<EditAvatarProvider>
				<Modal />
			</EditAvatarProvider>
			<SideBar />
			<Web />
		</WebProvider>
	);
};

export default MyWeb;
