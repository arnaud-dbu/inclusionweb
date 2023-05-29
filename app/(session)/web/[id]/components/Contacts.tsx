import AvatarComponent from "@/components/avatar/AvatarComponent";
import { WebContext } from "@/context/WebContext";
import { useContext, useEffect } from "react";

export const Contacts = () => {
	const { contacts, fetchedWebData, setContacts, showDroppedContacts, setShowDroppedContacts } =
		useContext(WebContext);

	const handleContactVisibility = (id: string) => {
		const newContacts = contacts.map((contact) => {
			if (contact.id === id) {
				return { ...contact, visible: true };
			}
			return contact;
		});
		setContacts(newContacts);
	};

	const filteredContacts = contacts.filter((contact) => {
		if (showDroppedContacts) {
			return fetchedWebData.id === contact.web_id && contact.visible;
		} else {
			return fetchedWebData.id === contact.web_id && !contact.visible;
		}
	});

	return (
		<div className="flex flex-wrap justify-between gap-y-4 my-5">
			{filteredContacts.map((contact) => (
				<div
					key={contact.id}
					className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[15rem]">
					<AvatarComponent
						avatar={contact.avatar}
						className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
					/>
					<span className="font-bold text-neutral-800 text-xl">{contact.name}</span>
					<span className="text-neutral-800 font-light">{contact.role}</span>
					{!contact.visible && (
						<button
							onClick={() => handleContactVisibility(contact.id)}
							className="border-1 p-1 px-4 mt-3 border-neutral-500 rounded-full text-neutral-700 text-sm">
							Voeg toe
						</button>
					)}
				</div>
			))}
		</div>
	);
};
