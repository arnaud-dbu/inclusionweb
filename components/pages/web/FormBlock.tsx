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
	return (
		<div
			className={`flex h-[calc(100vh-27rem)] flex-col gap-4 overflow-y-auto py-1 lg:h-full lg:gap-8 lg:overflow-y-visible ${className}`}>
			{children}
		</div>
	);
};

export const FormBlockItem = ({ title, children, icon, alignStart }: Props) => {
	return (
		<>
			<div
				className={`flex flex-col md:flex-row ${alignStart ? "items-start" : "md:items-center"}`}>
				<div className={`flex items-start gap-2`}>
					<BlockTitle title={title} className={`!mb-2 w-[12rem] text-sm md:!mb-0 lg:text-base`} />
					{/* {icon && <div className={``}>{icon}</div>} */}
				</div>
				<div className={`w-full`}>{children}</div>
			</div>
		</>
	);
};
