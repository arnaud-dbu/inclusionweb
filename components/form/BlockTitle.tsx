import React from "react";

type Props = {
	title: string;
	className?: string;
	description?: string;
};

export const BlockTitle = ({ title, className, description }: Props) => {
	return (
		<div className={`mb-3 ${className}`}>
			<span className={`text-md block font-semibold text-neutral-800 `}>{title}</span>
			<p className={`text-sm text-neutral-800`}>{description}</p>
		</div>
	);
};
