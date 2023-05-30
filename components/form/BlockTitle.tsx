import React from "react";

type Props = {
	title: string;
	className?: string;
};

export const BlockTitle = ({ title, className }: Props) => {
	return (
		<span className={`text-md font-semibold text-neutral-800 block ${className}`}>{title}</span>
	);
};
