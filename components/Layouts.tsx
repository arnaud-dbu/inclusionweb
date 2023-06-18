import React from "react";

type Props = {
	children: React.ReactNode;
	overflowHidden?: boolean;
};

export const MainSection = ({ children, overflowHidden }: Props) => {
	return (
		<div
			className={`relative top-[4rem] h-[calc(100vh-4rem)] xl:left-[6rem] xl:h-screen xl:w-[calc(100vw-6rem)] ${
				overflowHidden ? "overflow-hidden" : ""
			}`}>
			{children}
		</div>
	);
};
