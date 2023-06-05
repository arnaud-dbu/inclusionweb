"use client";

import { useContext } from "react";
import { NewContactForm } from "./NewContactForm";
import { WebContext } from "@/context/WebContext";

const Modal = () => {
	const { modalVisible } = useContext(WebContext);

	return (
		modalVisible && (
			<>
				<div className="absolute w-screen h-screen bg-neutral-900 z-50 opacity-30"></div>
				<dialog
					open
					className="absolute-center z-50 rounded-3xl bg-primary-100 py-16 px-0 w-[55rem]">
					<NewContactForm />
				</dialog>
			</>
		)
	);
};

export default Modal;
