"use client";

import Modal from "@/app/(session)/web/[id]/partials/Modal";
import { useState } from "react";
import NetworkSideMenu from "./NetworkSideMenu";
import Web from "./Web";

type Props = {
	data: any;
	contacts: any;
};

const MyWeb = ({ data, contacts }: Props) => {
	const [modalVisible, setModalVisible] = useState(false);

	return (
		<>
			<Modal modalVisible={modalVisible} setModalVisible={setModalVisible} />
			<NetworkSideMenu contacts={contacts} data={data} setModalVisible={setModalVisible} />
			<Web data={data} />
		</>
	);
};

export default MyWeb;
