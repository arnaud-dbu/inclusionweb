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
			<div className="absolute w-full h-full bg-neutral-900 z-50 opacity-40"></div>
			<dialog open className={`absolute-center z-50 rounded-3xl bg-white px-0 m-0  ${className}`}>
				<div className={`relative`}>
					<button onClick={() => setModalVisible(null)}>
						<CrossIcon className={`w-10 h-10 absolute -right-14 -top-5 fill-neutral-800`} />
					</button>
					{children}
				</div>
			</dialog>
		</>
	);
};

export default Modal;
