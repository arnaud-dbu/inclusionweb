import AvatarComponent from "@/components/avatar/AvatarComponent";
import { IconButton } from "@/components/form/IconButton";
import { WebContext } from "@/context/WebContext";
import { CrossIcon, EditIcon, PencilIcon } from "@/public/icons";
import Image from "next/image";
import { useContext, useState } from "react";

export const Contacts = () => {
	const {
		contacts,
		fetchedWebData,
		fetchedContactsData,
		setContacts,
		view,
		searchFilteredContacts,
		showDroppedContacts,
		setModalVisible,
		setEditContact,
	} = useContext(WebContext);

	const handleContactVisibility = async (id: string) => {
		try {
			const response = await fetch(`/api/contacts/${id}`, {
				method: "PATCH",
				body: JSON.stringify({
					visible: true,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			const contact = await response.json();

			if (contact) {
				const newContacts = contacts.map((contact) => {
					if (contact.id === id) {
						return { ...contact, visible: true };
					}
					return contact;
				});
				setContacts(newContacts);
			}
		} catch (error) {
			console.log(error);
		}
	};

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
		const contact = contacts.find((contact) => contact.id === id);
		setModalVisible(true);
		setEditContact(contact);
	};

	const filteredContacts = searchFilteredContacts.filter((contact) => {
		if (showDroppedContacts) {
			return fetchedWebData.id === contact.web_id && contact.visible;
		} else {
			return fetchedWebData.id === contact.web_id && !contact.visible;
		}
	});

	return (
		<div className=" flex flex-wrap justify-between gap-y-4 my-5">
			{filteredContacts.map((contact) => (
				<div
					key={contact.id}
					className={`relative bg-white border-2 border-neutral-500 flex items-center shadow-lg rounded-xl ${
						view === "list" ? "w-full py-5 px-5" : "flex-col w-[48%] h-[15rem] justify-center"
					}`}>
					{/* // TODO: Add delete functionality */}
					<IconButton
						onClick={() => handleDeleteContact(contact.id)}
						className={`opacity-0 hover:opacity-80 absolute right-2 top-2 bg-red rounded-full p-1`}>
						<CrossIcon className={`w-4`} />
					</IconButton>
					<IconButton
						onClick={() => handleEditContact(contact.id)}
						className={`opacity-0 hover:opacity-80 absolute right-2 top-10 bg-neutral-700 rounded-full p-1`}>
						<PencilIcon className={`w-4`} />
					</IconButton>
					{contact.avatar ? (
						<AvatarComponent
							avatar={contact.avatar}
							className={`bg-primary-500 rounded-full shadow-lg object-cover ${
								view === "list" ? "w-16 h-16" : "w-24 h-24 mb-2"
							}`}
						/>
					) : (
						<Image
							className={`rounded-full shadow-lg aspect-square object-cover ${
								view === "list" ? "w-16 h-16" : "w-24 h-24 mb-2"
							}`}
							alt="test"
							src={
								contact.image_type === "presetImage"
									? contact.image_path
									: `${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${contact.image_path}`
							}
							width={700}
							height={700}
						/>
					)}
					<div className={`flex flex-col ${view === "list" ? "ml-3" : "items-center"}`}>
						<span
							className={`font-bold text-neutral-800 ${view === "list" ? "text-lg" : "text-xl"}`}>
							{contact.name}
						</span>
						<span className="text-neutral-800 font-light">{contact.role}</span>
					</div>
					{!contact.visible && (
						<button
							onClick={() => handleContactVisibility(contact.id)}
							className={`border-1 p-1 px-4 mt-3 border-neutral-500 rounded-full text-neutral-700 text-sm ${
								view === "list" ? "ml-auto" : ""
							}`}>
							Voeg toe
						</button>
					)}
				</div>
			))}
		</div>
	);
};
