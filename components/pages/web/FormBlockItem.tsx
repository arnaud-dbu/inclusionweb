import DivisionLine from "@/components/DivisionLine";
import { BlockTitle } from "@/components/form/BlockTitle";
import React from "react";

type Props = {
	title?: string;
	children: React.ReactNode;
	alignStart?: boolean;
};

const FormBlockItem = ({ title, children, alignStart }: Props) => {
	return (
		<>
			<div className={`flex flex-col mb-5`}>
				<BlockTitle title={title} className={`mb-3`} />
				<div className={`w-[30rem]`}>{children}</div>
			</div>
		</>
	);
};

export default FormBlockItem;
