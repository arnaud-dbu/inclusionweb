"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Draggable } from "./Draggable.jsx";
import { Droppable } from "./Droppable.jsx";
import React, { useState } from "react";
import { restrictToWindowEdges, restrictToParentElement } from "@dnd-kit/modifiers";

export const Example = () => {
	const [dragItems, setDragItems] = useState([
		{
			id: "1",
			content: "arnaud",
			visible: "none",
			position: {
				x: 0,
				y: 0,
			},
		},
		{
			id: "2",
			content: "eva",
			visible: "none",
			position: {
				x: 0,
				y: 0,
			},
		},
	]);

	const dragItemButtons = dragItems.map((dragItem) => (
		<Draggable key={dragItem.id} id={dragItem.id} content={dragItem.content} />
	));

	const dragItem = dragItems.map((dragItem) => (
		<Draggable
			styles={{
				position: "absolute",
				left: `${dragItem.position.x}px`,
				top: `${dragItem.position.y}px`,
				display: `${dragItem.visible}`,
			}}
			key={dragItem.id}
			id={dragItem.id}
			content={dragItem.content}
		/>
	));

	const handleDragEnd = (ev) => {
		const dragItemId = ev.active.id;
		const newPositionedDragItems = dragItems.map((item) => {
			if (item.id === dragItemId) {
				return {
					...item,
					position: {
						x: item.position.x + ev.delta.x,
						y: item.position.y + ev.delta.y,
					},
				};
			}
			return item;
		});
		setDragItems(newPositionedDragItems);
		console.log(newPositionedDragItems);

		if (ev.over && ev.over.id === dragItemId) {
			setIsDropped(true);
		}
	};

	return (
		<>
			<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
				<div className="absolute-center">
					<Droppable>{dragItem}</Droppable>
				</div>
			</DndContext>
		</>
	);
};
