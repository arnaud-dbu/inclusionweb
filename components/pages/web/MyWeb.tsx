"use client";

import { useState, useRef } from "react";
import SideBar from "./SideBar";
import { WebProvider } from "@/context/WebContext";
import { EditAvatarProvider } from "@/context/EditAvatarContext";
import Web from "./Web";
import html2canvas from "html2canvas";
import Modal from "./Modal";

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
			<Modal />
			<SideBar />
			<Web />
		</WebProvider>
	);
};

export default MyWeb;
