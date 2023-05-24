"use client";

import React from "react";
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function Draggable() {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: "unique-id",
	});
	const style = {
		transform: CSS.Translate.toString(transform),
	};

	return (
		<button ref={setNodeRef} style={style} {...listeners} {...attributes}>
			Halo
		</button>
	);
}

function Droppable() {
	const { setNodeRef } = useDroppable({
		id: "unique-id",
	});

	return <div className="w-[30rem] h-[30rem] border-red-500 border-2" ref={setNodeRef}></div>;
}

function Page() {
	return (
		<DndContext>
			<Droppable>
				<Draggable />
			</Droppable>
		</DndContext>
	);
}

export default Page;
