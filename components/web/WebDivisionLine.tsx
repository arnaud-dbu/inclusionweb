import React from "react";

type Props = {
	className?: any;
	rotation: any;
};

const WebDivisionLine = ({ className, rotation }: Props) => {
	return (
		<div
			className={`absolute left-0 top-1/2 w-1/2 origin-right -translate-y-1/2 border-[1.25px]  ${className}`}
			style={rotation}></div>
	);
};

export default WebDivisionLine;
