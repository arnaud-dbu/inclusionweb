"use client";

import DivisionLine from "@/components/DivisionLine";
import { HeadingPrimary } from "@/components/Typography";
import { AddUserIcon, GridIcon, ListIcon } from "@/public/icons";
import { WebContext } from "@/context/WebContext";
import { useContext } from "react";
import { CategoryButton } from "@/components/form/CategoryButton";
import { SearchInput } from "@/components/form/SearchInput";
import { Button } from "@/components/form/Button";
import { SideBarContacts } from "./SideBarContacts";

const SideBar = () => {
	const { setModalVisible, editInfoVisible, setEditInfoVisible } = useContext(WebContext);

	const handleOpenNewContactModal = () => {
		setEditInfoVisible("Gegevens");
		setModalVisible("contact");
	};

	return (
		<aside className="relative hidden w-[60rem] bg-primary-200 shadow-lg">
			<SideBarHeader />
			<SideBarContacts />
			<Button
				style="primary"
				label="Niew Contact "
				className={`absolute bottom-10 left-1/2 w-[calc(100%-8rem)] -translate-x-1/2`}
				icon={<AddUserIcon className="mr-2 h-6 w-6 fill-white" />}
				onClick={handleOpenNewContactModal}
			/>
		</aside>
	);
};

const SideBarHeader = () => {
	const { showDroppedContacts, setShowDroppedContacts, contacts, view, web, setView } =
		useContext(WebContext);

	// Get contacts that are visible on the web
	const placedContacts = contacts?.filter((contact: any) => contact.visible).length;

	return (
		<div className={`flex flex-col justify-between px-16 pt-10`}>
			<HeadingPrimary underline subtitle="Inclusieweb" title={web.name} className={`mb-8`} />

			<SearchInput className={`mb-3`} />

			<div className="flex items-center justify-between gap-6">
				<div className="flex items-center gap-3">
					<CategoryButton
						onClick={() => setShowDroppedContacts(false)}
						label={`Niet Geplaatst`}
						active={!showDroppedContacts}
					/>
					<CategoryButton
						onClick={() => setShowDroppedContacts(true)}
						label={`Geplaatst (${placedContacts})`}
						active={showDroppedContacts}
					/>
				</div>
				<DivisionLine />
				<div className="flex items-center gap-3">
					<button onClick={() => setView("list")}>
						<ListIcon
							className={`w-8 ${view === "list" ? "fill-neutral-800" : "fill-neutral-600"}`}
						/>
					</button>
					<button onClick={() => setView("grid")}>
						<GridIcon
							className={`w-8 ${view === "grid" ? "fill-neutral-800" : "fill-neutral-600"}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
