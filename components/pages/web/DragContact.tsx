"use client";

import { useDraggable } from "@dnd-kit/core";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import {
	AnimalIcon,
	ChartIcon,
	CrossIcon,
	GroupIcon,
	HandIcon,
	LinkIcon,
	LoupeIcon,
	PersonIcon,
	PlaceIcon,
} from "@/public/icons";
import { useContext, useRef } from "react";
import useHover from "@/hooks/useHover";
import { WebContext } from "@/context/WebContext";
import Image from "next/image";
import { HeadingSecondary } from "@/components/Typography";
import { Button } from "@/components/form/Button";

type Props = {
	id: string;
	name: string;
	styles: any;
	avatar?: any;
	visible?: string;
	image?: string;
};

const DragContactInfo = ({ title, icon }) => {
	return (
		<div className={`flex items-center justify-between gap-3  `}>
			<div className={`bg-primary-300 rounded-md p-2 shadow-lg`}>{icon}</div>
			{title && <span className={`text-neutral-900 text-sm text-start`}>{title}</span>}
		</div>
	);
};

export const DragContact = ({ id, name, styles, avatar, visible, image }: Props) => {
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	const { contacts, setContacts, avatarSize, namesVisible, setModalVisible, setEditContact } =
		useContext(WebContext);

	const currentContact = contacts.find((contact) => contact.id === id);
	const infoIconStyle = `w-[1rem] h-[1rem] fill-primary-900`;

	const handleRemoveVisibility = async (event: React.MouseEvent<HTMLButtonElement>) => {
		const id = event.currentTarget.id;

		const newContacts = contacts.map((contact) => {
			if (contact.id === id) {
				return { ...contact, visible: false };
			}
			return contact;
		});
		setContacts(newContacts);

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
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditContact = async (event: React.MouseEvent<HTMLButtonElement>) => {
		setModalVisible("contact");
		setEditContact(currentContact);
	};

	const CustomStyle = {
		display: visible,
		zIndex: isHover ? 100 : 30,
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
					{currentContact.image_type === "avatar" && (
						<AvatarComponent
							className={`bg-white rounded-full shadow-lg object-cover ${avatarStyle} ${
								avatarSize === "small" ? "w-12 h-12" : "w-16 h-16"
							}`}
							avatar={avatar}
						/>
					)}

					{currentContact.image_type === "customImage" && (
						<Image
							className={`bg-white rounded-full shadow-lg object-cover ${avatarStyle} ${
								avatarSize === "small" ? "w-12 h-12" : "w-16 h-16"
							}`}
							alt="test"
							src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${image}`}
							width={100}
							height={100}
						/>
					)}

					{currentContact.image_type === "presetImage" && (
						<Image
							className={`bg-white rounded-full shadow-lg object-cover ${avatarStyle} ${
								avatarSize === "small" ? "w-12 h-12" : "w-16 h-16"
							}`}
							alt="test"
							src={image}
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

			<div className={`icon cursor-pointer z-10 absolute top-[2.6rem] right-0 `} ref={hoverRef}>
				<div
					className={`relative w-5 h-5 p-[3px] bg-primary-800 shadow-lg fill-white rounded-full flex items-center justify-center `}>
					{currentContact.type === "person" && <PersonIcon className={"fill-white w-5 h-5"} />}
					{currentContact.type === "group" && <GroupIcon className={"fill-white w-5 h-5"} />}
					{currentContact.type === "place" && <PlaceIcon className={"fill-white w-5 h-5"} />}
					{currentContact.type === "animal" && <AnimalIcon className={"fill-white w-5 h-5"} />}
					<div
						className={`bottom-0 -right-[1rem] absolute bg-transparent w-[1rem] h-[10rem] ${
							isHover ? "block" : "hidden"
						}`}></div>
				</div>
				<div
					className={`box absolute z-50 flex flex-col items-start gap-2 border-2 border-neutral-500 -right-[16rem] w-[15rem] bottom-0 bg-white px-6 py-6 rounded-2xl shadow-lg  ${
						isHover ? "block" : "hidden"
					}`}>
					<HeadingSecondary underline title={currentContact?.name} className={`mb-2 text-2xl`} />
					{currentContact?.role && (
						<DragContactInfo
							title={currentContact?.role}
							icon={
								currentContact.type === "person" ? (
									<PersonIcon className={`${infoIconStyle}`} />
								) : currentContact.type === "group" ? (
									<GroupIcon className={`${infoIconStyle}`} />
								) : currentContact.type === "place" ? (
									<PlaceIcon className={`${infoIconStyle}`} />
								) : currentContact.type === "animal" ? (
									<AnimalIcon className={`${infoIconStyle}`} />
								) : null
							}
						/>
					)}
					{currentContact?.relation && (
						<DragContactInfo
							title={currentContact?.relation}
							icon={<LinkIcon className={infoIconStyle} />}
						/>
					)}
					{currentContact?.given_support.length > 0 && (
						<DragContactInfo
							title={currentContact?.given_support.map((support) => support).join(", ")}
							icon={<HandIcon className={infoIconStyle} />}
						/>
					)}
					{currentContact?.received_support.length > 0 && (
						<DragContactInfo
							title={currentContact?.received_support.map((support) => support).join(", ")}
							icon={<HandIcon className={`${infoIconStyle} transform scale-x-[-1]`} />}
						/>
					)}
					{currentContact?.frequency && (
						<DragContactInfo
							title={currentContact?.frequency}
							icon={<ChartIcon className={infoIconStyle} />}
						/>
					)}

					<div className={`mt-4 flex gap-1 items-center self-end`}>
						<Button
							onClick={handleRemoveVisibility}
							id={id}
							label="Verwijder"
							style="outline"
							size="xs"
						/>
						<Button onClick={handleEditContact} label="Bewerken" style="secondary" size="xs" />
					</div>
				</div>
			</div>
		</div>
	);
};
