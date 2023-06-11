import DivisionLine from "@/components/DivisionLine";
import { BlockTitle } from "@/components/form/BlockTitle";
import { PersonIcon } from "@/public/icons";
import React from "react";

type Props = {
	children: React.ReactNode;
	className?: string;
	title?: string;
	icon?: React.ReactNode;
};

export const FormBlock = ({ children, className }: Props) => {
	return <div className={`flex flex-col ${className}`}>{children}</div>;
};

export const FormBlockItem = ({ title, children, icon }: Props) => {
	return (
		<>
			<div className={`flex flex-col mb-5`}>
				<div className={`flex gap-2 items-center mb-3`}>
					{icon && <div className={``}>{icon}</div>}
					<BlockTitle title={title} className={`!mb-0`} />
				</div>
				<div className={`w-[30rem]`}>{children}</div>
			</div>
		</>
	);
};
