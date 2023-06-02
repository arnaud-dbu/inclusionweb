import React from "react";

type Props = { children: React.ReactNode };

const OverFlowContainer = ({ children }: Props) => {
	return <div className={`overflow-y-scroll h-[40rem]`}>{children}</div>;
};

export default OverFlowContainer;
