import React from "react";

type Props = {
	children: React.ReactNode;
};

export const MainSection = ({ children }: Props) => {
	return <section className={`layout-wrapper h-[calc(100%-12rem)] relative`}>{children}</section>;
};
