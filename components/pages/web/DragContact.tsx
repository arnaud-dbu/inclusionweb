"use client";

import { useDraggable } from "@dnd-kit/core";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { CrossIcon, LoupeIcon } from "@/public/icons";
import { useContext, useRef } from "react";
import useHover from "@/hooks/useHover";
import { WebContext } from "@/context/WebContext";
import Image from "next/image";

type Props = {
	id: string;
	name: string;
	styles: any;
	avatar?: any;
	visible?: string;
	image?: string;
};

export const DragContact = ({ id, name, styles, avatar, visible, image }: Props) => {
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	const { contacts, setContacts, avatarSize, namesVisible } = useContext(WebContext);

	const currentContact = contacts.find((contact) => contact.id === id);

	const handleRemoveVisibility = async (id: string) => {
		try {
			const response = await fetch(`/api/contacts/${id}/visibility`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					visible: false,
				}),
			});

			if (response.status === 200) {
				const newContacts = contacts.map((contact) => {
					if (contact.id === id) {
						return { ...contact, visible: false };
					}
					return contact;
				});
				setContacts(newContacts);
			}
		} catch (error) {
			console.log(error);
		}
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
		<div className={`relative`} style={{ ...style, ...CustomStyle, ...styles }} ref={setNodeRef}>
			<button {...listeners} {...attributes}>
				<div
					className={`${
						isDragging ? "cursor-grabbing" : "cursor-grab"
					} flex flex-col items-center gap-2 relative`}>
					{avatar ? (
						<AvatarComponent
							className={`bg-white rounded-full shadow-lg object-cover ${avatarStyle} ${
								avatarSize === "small" ? "w-12 h-12" : "w-16 h-16"
							}`}
							avatar={avatar}
						/>
					) : (
						<Image
							className={`bg-white rounded-full shadow-lg object-cover ${
								avatarSize === "small" ? "w-12 h-12" : "w-16 h-16"
							}`}
							alt="test"
							src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${image}`}
							width={100}
							height={100}
						/>
					)}
					{namesVisible && (
						<span className="text-center text-neutral-900 text-sm font-semibold font-primary uppercase ">
							{name}
						</span>
					)}
				</div>
			</button>
			<button
				className={`cursor-pointer absolute top-0 right-0 w-[1rem] h-[1rem] bg-red fill-white rounded-full flex items-center justify-center `}
				onClick={() => handleRemoveVisibility(id)}>
				<CrossIcon className={`pointer-events-none w-6 h-6`} />
				{/* <div className={`absolute bg-red w-8 h-8 p-12 ${isHover ? "block" : "hidden"}`}>{id}</div> */}
			</button>
			<button
				className={`cursor-pointer absolute top-4 -right-2 w-[1rem] h-[1rem] bg-black fill-white rounded-full flex items-center justify-center `}
				ref={hoverRef}>
				<LoupeIcon className={`fill-white w-3 h-3`} />
				<div
					className={`absolute flex flex-col gap-2 bg-red -left-[10rem]  ${
						isHover ? "block" : "hidden"
					}`}>
					<span>{currentContact?.name}</span>
					<span>{currentContact?.relation}</span>
					<span>{currentContact?.role}</span>
					<span>{currentContact?.given_support}</span>
					<span>{currentContact?.received_support}</span>
				</div>
			</button>
		</div>
	);
};
