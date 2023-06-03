"use client";

import { useState, useRef } from "react";
import SideBar from "./SideBar";
import { WebProvider } from "@/context/WebContext";
import Web from "./Web";
import Modal from "./Modal";

type Props = {
	fetchedContactsData: any;
	fetchedWebData: any;
	fetchedSessionsData: any;
	session: number;
};

const MyWeb = ({ fetchedWebData, fetchedContactsData, fetchedSessionsData, session }: Props) => {
	const [contacts, setContacts] = useState(fetchedContactsData);
	// const [contacts, setContacts] = useLocalStorage("contacts", fetchedContactsData);

	return (
		<WebProvider
			fetchedWebData={fetchedWebData}
			fetchedContactsData={fetchedContactsData}
			fetchedSessionsData={fetchedSessionsData}
			contacts={contacts}
			setContacts={setContacts}
			session={session}>
			<Modal />
			<SideBar />
			<Web />
		</WebProvider>
	);
};

export default MyWeb;
