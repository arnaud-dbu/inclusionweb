"use client";

import { useContext } from "react";
import { NewContactForm } from "./NewContactForm";
import { WebContext } from "@/context/WebContext";
import { motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";

const NewContactModal = () => {
	const { modalVisible, setModalVisible } = useContext(WebContext);

	const dropIn = {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 25,
				stiffness: 500,
			},
		},
		exit: {
			y: "100vh",
			opacity: 0,
		},
	};

	return (
		<>
			{modalVisible === "contact" && (
				<Backdrop onClick={() => setModalVisible(null)}>
					<motion.dialog
						open
						className="fixed left-1/2 top-1/2 z-50 m-0 h-[95%] w-[95%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white px-0 lg:h-fit lg:w-fit"
						variants={dropIn}
						initial="hidden"
						animate="visible"
						onClick={(e) => e.stopPropagation()}
						exit="exit">
						<div className="relative py-6 lg:h-[55rem] lg:w-[55rem] lg:py-12">
							<NewContactForm />
						</div>
					</motion.dialog>
				</Backdrop>
			)}
		</>
	);
};

export default NewContactModal;
