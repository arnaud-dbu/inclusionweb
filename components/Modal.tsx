import React from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

const Modal = ({ children, className }: Props) => {
	return (
		<>
			<div className="absolute w-full h-full bg-neutral-900 z-50 opacity-40"></div>
			<dialog open className={`absolute-center z-50 rounded-3xl bg-white px-0 m-0  ${className}`}>
				{children}
			</dialog>
		</>
	);
};

export default Modal;
