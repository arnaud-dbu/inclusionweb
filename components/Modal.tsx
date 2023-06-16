"use client";

import { WebContext } from "@/context/WebContext";
import { CrossIcon } from "@/public/icons";
import React, { useContext } from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

const Modal = ({ children, className }: Props) => {
	const { setModalVisible } = useContext(WebContext);
	return (
		<>
			<div
				onClick={() => setModalVisible(null)}
				className="absolute z-40 h-full w-full  bg-neutral-600 bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter"></div>
			<dialog open className={`absolute-center z-50 m-0 rounded-3xl bg-white px-0 `}>
				<div className={`relative  ${className}`}>
					{/* <button onClick={() => setModalVisible(null)}>
						<CrossIcon className={`absolute right-3 top-0 h-10 w-10 fill-neutral-800`} />
					</button> */}
					{children}
				</div>
			</dialog>
		</>
	);
};

export default Modal;
