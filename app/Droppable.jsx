"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

const CustomStyle = {
	display: "flex",
	color: "black",
	width: "600px",
	borderRadius: "50%",
	height: "600px",
	background: "green",
};

export function Droppable({ children }) {
	const { isOver, setNodeRef } = useDroppable({
		id: "droppable",
	});

	const style = {
		color: isOver ? "green" : undefined,
	};

	return (
		<div ref={setNodeRef} style={{ ...style, ...CustomStyle }}>
			{children}
		</div>
	);
}
