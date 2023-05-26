"use client";

import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import AvatarComponent from "@/components/avatar/AvatarComponent";

type Props = {
	id: string;
	name: string;
	styles: any;
	avatar?: any;
	// visible?: string;
};

export const DragContact = ({ id, name, styles, avatar }: Props) => {
	const CustomStyle = {
		// display: visible,
		zIndex: 100,
	};

	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: {};

	return (
		<button
			ref={setNodeRef}
			style={{ ...style, ...CustomStyle, ...styles }}
			{...listeners}
			{...attributes}>
			<div className="flex flex-col">
				<AvatarComponent
					className="w-16 h-16 bg-white  rounded-full shadow-lg object-cover"
					avatar={avatar}
				/>
				<span className="text-center text-neutral-900 text-sm font-semibold font-primary uppercase ">
					{name}
				</span>
			</div>
		</button>
	);
};
