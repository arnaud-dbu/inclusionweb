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
			<div className="absolute z-50 h-full w-full bg-neutral-900 opacity-40"></div>
			<dialog open className={`absolute-center z-50 m-0 rounded-3xl bg-white px-0  ${className}`}>
				<div className={`relative h-full`}>
					<button onClick={() => setModalVisible(null)}>
						<CrossIcon className={`absolute -right-14 -top-5 h-10 w-10 fill-neutral-800`} />
					</button>
					{children}
				</div>
			</dialog>
		</>
	);
};

export default Modal;
