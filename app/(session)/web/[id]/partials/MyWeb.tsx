"use client";

import Modal from "@/app/(session)/web/[id]/partials/Modal";
import { useEffect, useState } from "react";
import NetworkSideMenu from "./NetworkSideMenu";
import Web from "./Web";
import { H1 } from "@/components/Headings";

type Props = {
	data: any;
};

const MyWeb = ({ data }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [contacts, setContacts] = useState([]);

	return (
		<>
			<Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
			<NetworkSideMenu
				contacts={contacts}
				setContacts={setContacts}
				data={data}
				setModalVisible={setModalVisible}
			/>
			<Web data={data} setContacts={setContacts} contacts={contacts} />
		</>
	);
};

export default MyWeb;
