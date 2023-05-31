"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

type Props = {
	children: React.ReactNode;
};

export const DropZone = ({ children }: Props) => {
	const CustomStyle = {
		display: "flex",
		color: "black",
		width: "100%",
		borderRadius: "50%",
		height: "100%",
	};

	const { isOver, setNodeRef } = useDroppable({
		id: "dropZone",
	});

	const style = {
		color: isOver ? "green" : undefined,
	};

	return (
		<div ref={setNodeRef} style={{ ...style, ...CustomStyle }}>
			{children}
		</div>
	);
};
