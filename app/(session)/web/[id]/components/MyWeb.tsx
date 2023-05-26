"use client";

import Modal from "@/app/(session)/web/[id]/components/Modal";
import { useState } from "react";
import SideBar from "./SideBar";
import Web from "./Web";
import { WebProvider } from "@/context/WebContext";
import { EditAvatarProvider } from "@/context/EditAvatarContext";

type Props = {
	fetchedContactsData: any;
	fetchedWebData: any;
};

const MyWeb = ({ fetchedWebData, fetchedContactsData }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [contacts, setContacts] = useState(fetchedContactsData);

	return (
		<WebProvider
			fetchedWebData={fetchedWebData}
			fetchedContactsData={fetchedContactsData}
			contacts={contacts}
			setContacts={setContacts}
			modalVisible={modalVisible}
			setModalVisible={setModalVisible}>
			<EditAvatarProvider>
				<Modal />
			</EditAvatarProvider>
			<SideBar />
			<Web />
		</WebProvider>
	);
};

export default MyWeb;
