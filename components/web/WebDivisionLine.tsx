import React from "react";

type Props = {
	className?: any;
	rotation: any;
};

const WebDivisionLine = ({ className, rotation }: Props) => {
	return (
		<div
			className={`border-[1.25px] origin-right border-primary-300 w-1/2 absolute left-0 top-1/2 -translate-y-1/2  ${className}`}
			style={rotation}></div>
	);
};

export default WebDivisionLine;
