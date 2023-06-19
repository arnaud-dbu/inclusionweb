"use client";

import { useContext } from "react";
import { NewContactForm } from "./NewContactForm";
import { WebContext } from "@/context/WebContext";
import Modal from "@/components/Modal";

const NewContactModal = () => {
	const { modalVisible, setModalVisible } = useContext(WebContext);

	return (
		modalVisible === "contact" && (
			<>
				<div
					onClick={() => setModalVisible(null)}
					className="fixed left-0 top-0 z-40 h-full w-full  bg-neutral-600 bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter"></div>
				<dialog
					open
					className={`fixed left-1/2 top-1/2 z-50 m-0 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white px-0 `}>
					<div className={`relative py-6 md:h-[55rem] md:w-[55rem] md:py-12 `}>
						<NewContactForm />
					</div>
				</dialog>
			</>
		)
	);
};

export default NewContactModal;
