"use client";

import { useContext } from "react";
import { NewContactForm } from "./NewContactForm";
import { WebContext } from "@/context/WebContext";
import Modal from "@/components/Modal";

const NewContactModal = () => {
	const { modalVisible } = useContext(WebContext);

	return (
		modalVisible && (
			<>
				<Modal className={`h-[62.5rem]`}>
					<NewContactForm />
				</Modal>
			</>
		)
	);
};

export default NewContactModal;
