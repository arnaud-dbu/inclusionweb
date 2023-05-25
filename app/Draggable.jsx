"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable({ id, content, styles, visible }) {
	const CustomStyle = {
		display: visible,
		width: "70px",
		borderRadius: "50%",
		height: "70px",
		backgroundColor: "#e8e8a2",
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
		<div
			ref={setNodeRef}
			style={{ ...style, ...CustomStyle, ...styles }}
			{...listeners}
			{...attributes}>
			{content}
		</div>
	);
}
