"use client";

import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { Draggable } from "./Draggable.jsx";
import { Droppable } from "./Droppable.jsx";
import React, { useState } from "react";
import { restrictToWindowEdges, restrictToParentElement } from "@dnd-kit/modifiers";

export const Example = () => {
	const [isDropped, setIsDropped] = useState([]);

	const [dragItems, setDragItems] = useState([
		{
			id: "1",
			content: "arnaud",
			visible: "none",
			position: {
				x: 200,
				y: 200,
			},
		},
		{
			id: "2",
			content: "eva",
			visible: "none",
			position: {
				x: 200,
				y: 200,
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

		if (ev.over && ev.over.id === dragItemId) {
			setIsDropped(true);
		}
	};

	// Press on a button

	// Find the id of the dragItem

	// Make it visible on the web

	return (
		<>
			<div className="flex flex-col">
				{dragItems.map((item) => {
					return (
						<button
							key={item.id}
							className="bg-red m-2 p-5 w-fit"
							onClick={() => {
								const newDragItems = dragItems.map((dragItem) => {
									if (dragItem.id === item.id) {
										return {
											...dragItem,
											visible: "flex",
										};
									}
									return dragItem;
								});
								setDragItems(newDragItems);
							}}>
							{item.content}
						</button>
					);
				})}
			</div>
			<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
				<div className="absolute-center">
					<Droppable>{dragItem}</Droppable>
				</div>
			</DndContext>
		</>
	);
};
