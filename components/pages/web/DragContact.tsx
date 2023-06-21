"use client";

import { useDraggable } from "@dnd-kit/core";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import {
	AnimalIcon,
	ChartIcon,
	GroupIcon,
	HandIcon,
	LinkIcon,
	PersonIcon,
	PlaceIcon,
} from "@/public/icons";
import { useContext, useRef } from "react";
import useHover from "@/hooks/useHover";
import { WebContext } from "@/context/WebContext";
import Image from "next/image";
import { H2 } from "@/components/Typography";
import { Button } from "@/components/form/Button";

type Props = {
	id: string;
	name: string;
	shareView?: boolean;
	styles: any;
	avatar?: any;
	visible?: string;
	image?: string;
};

const DragContactInfo = ({ title, icon }) => {
	return (
		<div className={`flex items-center justify-between gap-3  `}>
			<div className={`rounded-md bg-primary-300 p-2 shadow-lg`}>{icon}</div>
			{title && <span className={`text-start text-base text-neutral-900`}>{title}</span>}
		</div>
	);
};

export const DragContact = ({ id, name, styles, avatar, visible, image, shareView }: Props) => {
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
			await fetch(`/api/contacts/${id}`, {
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
	const avatarScale = avatarSize === "small" ? "h-[4rem] w-[4rem]" : "h-[5rem] w-[5rem]";

	return (
		<div className={`relative`} style={{ ...style, ...CustomStyle, ...styles }} ref={setNodeRef}>
			<button {...listeners} {...attributes} style={{ touchAction: "none" }}>
				<div
					className={`${
						isDragging ? "cursor-grabbing" : "cursor-grab"
					} relative flex flex-col items-center gap-2`}>
					{currentContact.image_type === "avatar" && (
						<AvatarComponent
							className={`rounded-full bg-white object-cover shadow-lg ${avatarStyle} ${avatarScale}`}
							avatar={avatar}
						/>
					)}

					{currentContact.image_type === "customImage" && (
						<Image
							className={`rounded-full bg-white object-cover shadow-lg ${avatarStyle} ${avatarScale}`}
							alt="test"
							src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${image}`}
							width={100}
							height={100}
						/>
					)}

					{currentContact.image_type === "presetImage" && (
						<Image
							className={`rounded-full bg-white object-cover shadow-lg ${avatarStyle} ${avatarScale}`}
							alt="test"
							src={image}
							width={100}
							height={100}
						/>
					)}

					{namesVisible && (
						<span
							className={`overflow-hidden text-ellipsis whitespace-nowrap text-center font-primary font-semibold uppercase text-neutral-900 ${
								avatarSize === "small" ? " text-lg" : " text-xl"
							}`}
							style={{ maxWidth: "6rem" }}>
							{name}
						</span>
					)}
				</div>
			</button>

			<div
				className={`icon absolute right-0  ${
					avatarSize === "small" ? "top-[2.5rem] " : "top-[3rem]"
				} z-10 cursor-pointer `}
				ref={hoverRef}>
				<div
					className={`relative flex ${
						avatarSize === "small" ? " h-[1.5rem] w-[1.5rem]" : " h-[1.75rem] w-[1.75rem] p-[2px]"
					} items-center justify-center rounded-full bg-primary-800 fill-white shadow-lg `}>
					{currentContact.type === "person" && <PersonIcon className={"h-4 w-4 fill-white"} />}
					{currentContact.type === "group" && <GroupIcon className={"h-4 w-4 fill-white"} />}
					{currentContact.type === "place" && <PlaceIcon className={"h-4 w-4 fill-white"} />}
					{currentContact.type === "animal" && <AnimalIcon className={"h-4 w-4 fill-white"} />}
					<div
						className={`absolute -right-[1rem] bottom-0 h-[10rem] w-[2rem] bg-transparent ${
							isHover ? "block" : "hidden"
						}`}></div>
				</div>
				<div
					className={`box absolute -right-[16rem] bottom-0 z-50 flex w-[15rem] flex-col items-start gap-2 rounded-2xl border-2 border-neutral-500 bg-white px-6 py-6 shadow-lg  ${
						isHover ? "block" : "hidden"
					}`}>
					<H2
						underline
						title={currentContact?.name}
						className={`mb-2 max-w-[13rem] overflow-hidden text-ellipsis whitespace-nowrap !text-3xl`}
					/>
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
							icon={<HandIcon className={`${infoIconStyle} scale-x-[-1] transform`} />}
						/>
					)}
					{currentContact?.frequency && (
						<DragContactInfo
							title={currentContact?.frequency}
							icon={<ChartIcon className={infoIconStyle} />}
						/>
					)}
					{!shareView && (
						<div className={`mt-4 flex items-center gap-2`}>
							<Button
								onClick={handleRemoveVisibility}
								id={id}
								label="Verwijder"
								style="outline"
								size="xs"
							/>
							<Button onClick={handleEditContact} label="Bewerken" style="secondary" size="xs" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
