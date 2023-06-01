import React from "react";

type Props = {
	name: React.ReactNode;
	className: string;
	distance: number;
};

const WebSliceNaming = ({ name, className, distance }: Props) => {
	return (
		<div
			className={`border-0 border-red origin-right w-1/2 absolute left-0 top-1/2 -translate-y-1/2 ${className}`}>
			<div className="relative">
				<span
					className={`absolute -left-[${distance}rem] top-1/2 -translate-y-1/2 text-lg text-neutral-800`}>
					{name}
				</span>
			</div>
		</div>
	);
};

export default WebSliceNaming;
