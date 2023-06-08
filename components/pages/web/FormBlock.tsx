import DivisionLine from "@/components/DivisionLine";
import { BlockTitle } from "@/components/form/BlockTitle";
import React from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
	title?: string;
};

export const FormBlock = ({ children, className }: Props) => {
	return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export const FormBlockItem = ({ title, children }: Props) => {
	return (
		<>
			<div className={`flex flex-col mb-5`}>
				<BlockTitle title={title} className={`mb-3`} />
				<div className={`w-[30rem]`}>{children}</div>
			</div>
		</>
	);
};
