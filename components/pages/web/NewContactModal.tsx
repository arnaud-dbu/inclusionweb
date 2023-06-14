"use client";

import { useContext } from "react";
import { NewContactForm } from "./NewContactForm";
import { WebContext } from "@/context/WebContext";
import Modal from "@/components/Modal";

const NewContactModal = () => {
	const { modalVisible } = useContext(WebContext);

	return (
		modalVisible === "contact" && (
			<>
				<Modal className={`h-[55rem] w-[55rem] py-12`}>
					<NewContactForm />
				</Modal>
			</>
		)
	);
};

export default NewContactModal;
