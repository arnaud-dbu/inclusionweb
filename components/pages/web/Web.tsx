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

const Web = () => {
	const { contacts, setContacts, fetchedWebData } = useContext(WebContext);

	const printRef = useRef();
	const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

	const handleDragEnd = (ev) => {
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
			const response = fetch(`/api/contact/position/${dragItemId}`, {
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

		setClickPosition({ x: ev.clientX, y: ev.clientY });
	};

	return (
		<>
			<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
				<div className="w-[70%] h-screen absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
					<WebSettings />
					<div
						ref={printRef}
						onClick={(event) => setClickPosition({ x: event.clientX, y: event.clientY })}>
						<div className={`web w-[60rem]`}>
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
								<div className="web-inner z-20 opacity-10 scale-[1.04]"></div>
								<div className="web-inner opacity-20 scale-[.95]"></div>
								<div className="web-inner opacity-20 scale-[.75]"></div>
								<div className="web-inner opacity-20 scale-[.55]"></div>
								<div className="web-inner opacity-25 scale-[.35]"></div>

								{fetchedWebData.image_path && (
									<Image
										className="absolute-center z-50 w-[10rem] rounded-full aspect-square object-cover"
										alt="test"
										src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${fetchedWebData.image_path}`}
										width={700}
										height={700}
									/>
								)}
								{fetchedWebData.avatar && (
									<AvatarComponent
										avatar={fetchedWebData.avatar}
										className="absolute-center w-[10rem] z-50 h-[10rem] bg-primary-500 mb-2 rounded-full object-cover"
									/>
								)}

								<WebSliceContainer />
							</DropZone>
						</div>
					</div>
				</div>
			</DndContext>
		</>
	);
};

export default Web;
