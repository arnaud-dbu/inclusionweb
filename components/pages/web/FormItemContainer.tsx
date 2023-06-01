import DivisionLine from "@/components/DivisionLine";
import { BlockTitle } from "@/components/form/BlockTitle";
import React from "react";

type Props = {
	title: string;
	children: React.ReactNode;
};

const FormItemContainer = ({ title, children }: Props) => {
	return (
		<>
			<div className={`flex items-center justify-between mb-7`}>
				<BlockTitle title={title} className={`!mb-0`} />
				<div className={`w-[30rem]`}>{children}</div>
			</div>
		</>
	);
};

export default FormItemContainer;
