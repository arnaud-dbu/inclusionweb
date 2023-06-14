import { BlockTitle } from "@/components/form/BlockTitle";
import React from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
	title?: string;
	icon?: React.ReactNode;
	alignStart?: boolean;
};

export const FormBlock = ({ children, className, alignStart }: Props) => {
	return <div className={`flex flex-col gap-8 py-4 ${className}`}>{children}</div>;
};

export const FormBlockItem = ({ title, children, icon, alignStart }: Props) => {
	return (
		<>
			<div className={`flex ${alignStart ? "items-start" : "items-center"}`}>
				<div className={`flex items-start gap-2`}>
					<BlockTitle title={title} className={`!mb-0 w-[12rem]`} />
					{/* {icon && <div className={``}>{icon}</div>} */}
				</div>
				<div className={`w-full`}>{children}</div>
			</div>
		</>
	);
};
