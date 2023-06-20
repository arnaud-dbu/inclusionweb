"use client";

import OverFlowContainer from "@/components/OverFlowContainer";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { IconButton } from "@/components/form/IconButton";
import { WebContext } from "@/context/WebContext";
import { PencilIcon, TrashIcon } from "@/public/icons";
import Image from "next/image";
import { useContext, useRef } from "react";
import { useHover } from "usehooks-ts";
import ContactThumbnail from "./ContactThumbnail";
import { Button } from "@/components/form/Button";
import WebIllustrationIcon from "./WebIllustrationIcon";

export const SideBarContacts = () => {
	const { web, searchFilteredContacts, showDroppedContacts, view } = useContext(WebContext);

	// Toggle contacts based on visibility on the web
	const filteredContacts = searchFilteredContacts.filter((contact) => {
		if (showDroppedContacts) {
			return web.id === contact.web_id && contact.visible;
		} else {
			return web.id === contact.web_id && !contact.visible;
		}
	});

	return (
		<OverFlowContainer fadeBottom className={`h-[calc(100vh-19.5rem)] `}>
			<div
				className={`mb-20 flex flex-wrap justify-between px-4 pt-6 md:px-10 lg:px-8 ${
					view === "grid" ? " gap-y-4 " : " gap-y-3 "
				} `}>
				{filteredContacts.map((contact: any) => (
					<SideBarContact key={contact.id} contact={contact} />
				))}
			</div>
		</OverFlowContainer>
	);
};

const SideBarContact = ({ contact }) => {
	const { contacts, fetchedContactsData, setContacts, view, setModalVisible, setEditContact } =
		useContext(WebContext);
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	const contactRef = useRef(null);
	const isHoverContact = useHover(contactRef);

	const thumbnailStyle = `${
		view === "list"
			? "xl:h-16 xl:w-16  h-12 w-12"
			: "mb-1 xl:h-[6rem] xl:w-[6rem] h-[6rem] w-[6rem]"
	}`;

	// Add contact to web
	const handleContactVisibility = async (id: string, visible: boolean) => {
		const newContacts = contacts.map((contact: any) => {
			if (contact.id === id) {
				return { ...contact, visible: visible };
			}
			return contact;
		});
		setContacts(newContacts);

		try {
			await fetch(`/api/contacts/${id}`, {
				method: "PATCH",
				body: JSON.stringify({
					visible: visible,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Delete contact from web
	const handleDeleteContact = async (id: string) => {
		const newContacts = contacts.filter((contact: any) => contact.id !== id);
		setContacts(newContacts);

		try {
			const response = await fetch(`/api/contacts/${id}`, {
				method: "DELETE",
			});
			const contact = await response.json();
		} catch (error) {
			console.log(error);
		}
	};

	const handleEditContact = async (id: string) => {
		const contact = contacts.find((contact: any) => contact.id === id);
		setModalVisible("contact");
		setEditContact(contact);
	};

	return (
		<article
			key={contact.id}
			ref={contactRef}
			className={`relative flex cursor-pointer items-center rounded-2xl border-1 border-neutral-500 bg-white shadow-lg ${
				view === "list"
					? "w-full gap-0 px-5 py-4 md:gap-3"
					: "h-[15rem] w-[48%] flex-col justify-center lg:h-[15rem] "
			}`}>
			<ContactThumbnail
				type={contact.type}
				size="sm"
				className={`bg-primary-400 shadow-lg ${thumbnailStyle}
					`}>
				{contact.image_type === "avatar" && (
					<AvatarComponent avatar={contact.avatar} className={`${thumbnailStyle}`} />
				)}
				{(contact.image_type === "customImage" || contact.image_type === "presetImage") && (
					<Image
						className={`absolute-center  object-cover  ${
							contact.image_type === "presetImage" ? "p-5" : "rounded-full"
						}`}
						alt="profile picture"
						src={
							contact.image_type === "presetImage"
								? contact.image_path
								: `${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${contact.image_path}`
						}
						width={100}
						height={100}
					/>
				)}
			</ContactThumbnail>

			<div className={`flex flex-col ${view === "list" ? "ml-3" : "items-center"}`}>
				<div className={`flex flex-col gap-1 lg:flex-row lg:gap-3`}>
					<span
						className={`relative font-bold text-neutral-800 ${
							view === "list" ? "text-lg" : "text-xl lg:text-lg xl:text-xl"
						}`}>
						{contact.name}
					</span>
					{view === "list" && (
						<div className={`flex items-center gap-1`}>
							<IconButton
								className={`opacity-60`}
								onClick={() => handleEditContact(contact.id)}
								icon={<PencilIcon className={`h-6 w-6 fill-neutral-600`} />}
							/>
							<IconButton
								className={`opacity-60`}
								onClick={() => handleDeleteContact(contact.id)}
								icon={<TrashIcon className={`h-6 w-6 fill-neutral-600`} />}
							/>
						</div>
					)}
				</div>
				<span className="font-light text-neutral-800">{contact.role}</span>
			</div>
			<div
				className={`absolute left-12 top-5 flex -translate-x-1/2 items-center  gap-2 transition-opacity ${
					isHoverContact ? "opacity-100" : "opacity-0"
				}`}>
				{view === "grid" && (
					<>
						<IconButton
							className={`opacity-60 transition hover:opacity-100`}
							onClick={() => handleDeleteContact(contact.id)}
							icon={<TrashIcon className={`h-6 w-6 fill-neutral-600`} />}
						/>
						<IconButton
							className={`opacity-60 transition hover:opacity-100`}
							onClick={() => handleEditContact(contact.id)}
							icon={<PencilIcon className={`h-6 w-6 fill-neutral-600`} />}
						/>
					</>
				)}
			</div>

			<div
				ref={hoverRef}
				className={`absolute flex h-12 w-12 items-center justify-center ${
					!contact.visible && view === "list"
						? "right-5 top-1/2 ml-auto -translate-y-1/2 scale-105"
						: "right-2 top-2 "
				}`}>
				<Button
					className="!m-0 !p-0"
					style=""
					icon={
						<WebIllustrationIcon
							plus={!contact.visible}
							isHover={isHover}
							className={`h-12 w-12 ${
								!contact.visible && view === "list" ? "opacity-80" : "opacity-100"
							}  `}
						/>
					}
					onClick={() => handleContactVisibility(contact.id, !contact.visible)}
				/>
			</div>
		</article>
	);
};
