import React from "react";

type Props = {
	name: React.ReactNode;
	distance: any;
	rotation: any;
};

const WebSliceNaming = ({ name, distance, rotation }: Props) => {
	return (
		<div
			className={`border-0 border-red origin-right w-1/2 absolute left-0 top-1/2 -translate-y-1/2`}
			style={rotation}>
			<div className="relative">
				<span
					className={`absolute top-1/2 -translate-y-1/2 text-lg text-neutral-800`}
					style={distance}>
					{name}
				</span>
			</div>
		</div>
	);
};

export default WebSliceNaming;
