import OverFlowContainer from "@/components/OverFlowContainer";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { IconButton } from "@/components/form/IconButton";
import { WebContext } from "@/context/WebContext";
import { PencilIcon } from "@/public/icons";
import Image from "next/image";
import { useContext, useRef } from "react";
import { useHover } from "usehooks-ts";
import ContactThumbnail from "./ContactThumbnail";
import { Button } from "@/components/form/Button";

export const SideBarContacts = () => {
	const { fetchedWebData, searchFilteredContacts, showDroppedContacts, view } =
		useContext(WebContext);

	// Toggle contacts based on visibility on the web
	const filteredContacts = searchFilteredContacts.filter((contact) => {
		if (showDroppedContacts) {
			return fetchedWebData.id === contact.web_id && contact.visible;
		} else {
			return fetchedWebData.id === contact.web_id && !contact.visible;
		}
	});

	return (
		<OverFlowContainer fadeBottom className={`h-[calc(100vh-19.5rem)] `}>
			<div
				className={`flex flex-wrap justify-between px-16 pt-6 ${
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

	// Add contact to web
	const handleContactVisibility = async (id: string) => {
		const newContacts = contacts.map((contact: any) => {
			if (contact.id === id) {
				return { ...contact, visible: true };
			}
			return contact;
		});
		setContacts(newContacts);

		try {
			await fetch(`/api/contacts/${id}`, {
				method: "PATCH",
				body: JSON.stringify({
					visible: true,
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
		try {
			const response = await fetch(`/api/contacts/${id}`, {
				method: "DELETE",
			});
			const contact = await response.json();

			if (contact) {
				setContacts(fetchedContactsData);
			}
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
			onClick={() => handleEditContact(contact.id)}
			key={contact.id}
			className={`relative flex cursor-pointer items-center rounded-2xl border-1 border-neutral-500 bg-white shadow-lg ${
				view === "list" ? "w-full gap-3 px-5 py-4" : "h-[17rem] w-[48%] flex-col justify-center"
			}`}
			ref={hoverRef}>
			{contact.avatar ? (
				<ContactThumbnail type={contact.type} size="sm">
					<AvatarComponent
						avatar={contact.avatar}
						className={`rounded-full bg-primary-500 object-cover shadow-lg ${
							view === "list" ? "h-16 w-16" : "mb-2 h-24 w-24"
						}`}
					/>
				</ContactThumbnail>
			) : (
				<ContactThumbnail type={contact.type} size="sm">
					<Image
						className={`aspect-square rounded-full object-cover shadow-lg ${
							view === "list" ? "h-16 w-16" : "mb-2 h-24 w-24"
						}`}
						alt="profile picture"
						src={
							contact.image_type === "presetImage"
								? contact.image_path
								: `${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${contact.image_path}`
						}
						width={700}
						height={700}
					/>
				</ContactThumbnail>
			)}

			<div className={`flex flex-col ${view === "list" ? "ml-3" : "items-center"}`}>
				<span
					className={`relative font-bold text-neutral-800 ${
						view === "list" ? "text-lg" : "text-xl"
					}`}>
					{contact.name}
					<IconButton
						className={`absolute -right-5 top-1/2 -translate-y-1/2 ${
							isHover ? `opacity-100 ` : ` opacity-0 `
						}`}
						icon={<PencilIcon className={`h-4 w-4 fill-neutral-600`} />}
					/>
				</span>
				<span className="font-light text-neutral-800">{contact.role}</span>
			</div>

			{!contact.visible ? (
				<Button
					style="outline"
					size="xs"
					onClick={() => handleContactVisibility(contact.id)}
					label="Plaats op web"
					className={` ${view === "list" ? "ml-auto" : "mt-3 opacity-70"}`}
				/>
			) : (
				<Button
					style="outline"
					size="xs"
					onClick={() => handleDeleteContact(contact.id)}
					label="Verwijder van web"
					className={` ${view === "list" ? "ml-auto" : "mt-3 opacity-70"}`}
				/>
			)}
		</article>
	);
};
