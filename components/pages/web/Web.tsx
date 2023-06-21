"use client";

import WebSliceContainer from "./WebSliceContainer";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import { DndContext } from "@dnd-kit/core";
import { DragContact } from "./DragContact";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { DropZone } from "./DropZone";
import { useContext, useEffect, useRef, useState } from "react";
import { WebContext } from "@/context/WebContext";
import { WebSettings } from "./WebSettings";
import { H1 } from "@/components/Typography";
import { Button } from "@/components/form/Button";
import { useScreen } from "usehooks-ts";

type Props = {
	shareView?: boolean;
};

const Web = ({ shareView }: Props) => {
	const { contacts, setContacts, web, setSidebarOpen } = useContext(WebContext);
	const containerRef = useRef(null);
	const [scaleFactor, setScaleFactor] = useState(1);

	const handleResize = () => {
		const containerWidth = containerRef.current.offsetWidth;
		const containerHeight = containerRef.current.offsetHeight;
		const desiredWidth = 1300;
		const desiredHeight = 1300;
		const scaleX = containerWidth / desiredWidth;
		const scaleY = containerHeight / desiredHeight;
		const newScaleFactor = Math.min(scaleX, scaleY);
		setScaleFactor(newScaleFactor);
	};

	useEffect(() => {
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

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
				fetch(`/api/contacts/${dragItemId}`, {
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
		<section
			ref={containerRef}
			className={`relative h-full ${
				shareView ? "" : "lg:w-[calc(100%-30rem)]  3xl:w-[calc(100%-40rem)]"
			} `}>
			<WebSettings shareView={shareView} />
			<H1
				underline
				subtitle="Inclusieweb"
				title={web.name}
				className={`!mb-0 `}
				blockSpacing="px-4 lg:hidden"
			/>
			<DndContext onDragEnd={handleDragEnd} modifiers={[restrictToParentElement]}>
				<div
					style={{
						transform: `scale(${scaleFactor})`,
						transformOrigin: "center",
						position: "absolute",
						top: "52%",
						left: "50%",
						translate: "-50% -50%",
						marginTop: "1rem",
						marginBottom: "1rem",
					}}>
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
									shareView={shareView}
									image={contact.image_path}
									visible={contact.visible ? "block" : "none"}
								/>
							))}
							<div className="web-inner shadow-l z-20 scale-[1.04] !bg-primary-400 opacity-40 shadow-xl"></div>
							<div className="web-inner scale-[.95] opacity-20"></div>
							<div className="web-inner scale-[.75] opacity-20"></div>
							<div className="web-inner scale-[.55] opacity-20"></div>
							<div className="web-inner scale-[.35] opacity-25"></div>
							<DndContext modifiers={[restrictToParentElement]}>
								{web.image_path && (
									<Image
										className="absolute-center z-10 aspect-square w-[10rem] rounded-full object-cover"
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
							</DndContext>
							<WebSliceContainer />
						</DropZone>
					</div>
				</div>
			</DndContext>

			{!shareView && (
				<div className={`absolute bottom-4 left-1/2  w-[92.5%] -translate-x-1/2`}>
					<Button
						style="tertiary"
						className="w-full lg:hidden"
						label="Contacten"
						onClick={setSidebarOpen}
					/>
				</div>
			)}
		</section>
	);
};

export default Web;
