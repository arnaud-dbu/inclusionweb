import { type } from "os";
import React from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export const Card = ({ children, className }) => {
	return (
		<div className={`bg-white rounded-3xl border-2 border-neutral-500 shadow-lg ${className}`}>
			{children}
		</div>
	);
};
