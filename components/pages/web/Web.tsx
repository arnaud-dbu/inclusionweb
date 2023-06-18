"use client";

import WebSliceContainer from "./WebSliceContainer";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import { DndContext } from "@dnd-kit/core";
import { DragContact } from "./DragContact";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { DropZone } from "./DropZone";
import { useContext, useRef, useState } from "react";
import { WebContext } from "@/context/WebContext";
import { WebSettings } from "./WebSettings";

type Props = {
	shareView?: boolean;
};

const Web = ({ shareView }: Props) => {
	const { contacts, setContacts, web } = useContext(WebContext);

	const handleDragEnd = (ev) => {
		if (!shareView) {
			const dragItemId = ev.active.id;
			const newPositionedDragItems = contacts?.map((item) => {
				if (item.id === dragItemId) {
					const newX = parseFloat(item.position.x) + ev.delta.x;
					const newY = parseFloat(item.position.y) + ev.delta.y;

					const x = parseFloat(newX.toFixed());
					const y = parseFloat(newY.toFixed());

					return {
						...item,
						position: {
							x: x,
							y: y,
						},
					};
				}

				return item;
			});
			setContacts(newPositionedDragItems);

			const draggedItem = newPositionedDragItems?.find((item) => item.id === dragItemId);

			try {
				fetch(`/api/contacts/${dragItemId}/position`, {
					method: "PATCH",
					body: JSON.stringify({
						position: {
							x: draggedItem.position.x,
							y: draggedItem.position.y,
						},
					}),
					headers: {
						"Content-Type": "application/json",
					},
				});
			} catch (error) {}
		}
	};

	return (
		<div className={`h-full scale-[.4]`}>
			<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
				<div className="relative top-1/2 z-0 flex h-full w-full -translate-y-1/2 items-center justify-center">
					{/* <WebSettings shareView={shareView} /> */}
					<div className={`cursor-cell`}>
						<div className={`web w-[45rem]`}>
							<DropZone>
								{contacts?.map((contact) => (
									<DragContact
										styles={{
											position: "absolute",
											left: `${contact.position.x}px`,
											top: `${contact.position.y}px`,
										}}
										key={contact.id}
										id={contact.id}
										name={contact.name}
										avatar={contact.avatar}
										image={contact.image_path}
										visible={contact.visible ? "block" : "none"}
									/>
								))}
								<div className="web-inner shadow-l z-20 scale-[1.04] !bg-primary-400 opacity-40 shadow-xl"></div>
								<div className="web-inner scale-[.95] opacity-20"></div>
								<div className="web-inner scale-[.75] opacity-20"></div>
								<div className="web-inner scale-[.55] opacity-20"></div>
								<div className="web-inner scale-[.35] opacity-25"></div>

								{web.image_path && (
									<Image
										className="absolute-center z-40 aspect-square w-[10rem] rounded-full object-cover"
										alt="test"
										src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${web.image_path}`}
										width={700}
										height={700}
									/>
								)}
								{web.avatar && (
									<AvatarComponent
										avatar={web.avatar}
										className="absolute-center z-40 mb-2 h-[10rem] w-[10rem] rounded-full bg-primary-500 object-cover"
									/>
								)}
								<WebSliceContainer />
							</DropZone>
						</div>
					</div>
				</div>
			</DndContext>
		</div>
	);
};

export default Web;
