"use client";

import { useDraggable } from "@dnd-kit/core";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { CrossIcon } from "@/public/icons";
import { useContext, useRef } from "react";
import useHover from "@/hooks/useHover";
import { WebContext } from "@/context/WebContext";

type Props = {
	id: string;
	name: string;
	styles: any;
	avatar?: any;
	visible?: string;
};

export const DragContact = ({ id, name, styles, avatar, visible }: Props) => {
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	const { contacts, setContacts, avatarSize, namesVisible } = useContext(WebContext);

	const handleContactVisibility = (id: string) => {
		const newContacts = contacts.map((contact) => {
			if (contact.id === id) {
				return { ...contact, visible: false };
			}
			return contact;
		});
		setContacts(newContacts);
	};

	const CustomStyle = {
		display: visible,
		zIndex: 100,
	};

	const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
		id,
	});

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
		  }
		: {};

	const avatarStyle = isDragging && "lifted";

	return (
		<button
			ref={setNodeRef}
			style={{ ...style, ...CustomStyle, ...styles }}
			{...listeners}
			{...attributes}>
			<div className="flex flex-col items-center gap-2 relative" ref={hoverRef}>
				<AvatarComponent
					className={`bg-white rounded-full shadow-lg object-cover ${avatarStyle} ${
						avatarSize === "small" ? "w-12 h-12" : "w-16 h-16"
					}`}
					avatar={avatar}
				/>
				{namesVisible && (
					<span className="text-center text-neutral-900 text-sm font-semibold font-primary uppercase ">
						{name}
					</span>
				)}
			</div>
			{/* <div
				className={`absolute z-50 right-1 w-[1rem] h-[1rem] bg-red fill-white rounded-full flex items-center justify-center`}
				onClick={() => handleContactVisibility(id)}>
				<CrossIcon className={`w-3 h-3`} />
			</div> */}
		</button>
	);
};
