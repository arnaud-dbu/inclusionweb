"use client";

import DivisionLine from "@/components/DivisionLine";
import { H1, H2, HeadingPrimary } from "@/components/Typography";
import { AddUserIcon, ArrowLeftIcon, GridIcon, ListIcon } from "@/public/icons";
import { WebContext } from "@/context/WebContext";
import { useContext, useState } from "react";
import { CategoryButton } from "@/components/form/CategoryButton";
import { SearchInput } from "@/components/form/SearchInput";
import { Button } from "@/components/form/Button";
import { SideBarContacts } from "./SideBarContacts";
import { IconButton } from "@/components/form/IconButton";
import { useMediaQuery } from "usehooks-ts";

const SideBar = () => {
	const { setModalVisible, editInfoVisible, setEditInfoVisible, sidebarOpen, setSidebarOpen } =
		useContext(WebContext);
	const isLargerThan1000px = useMediaQuery("(min-width: 1024px)");
	isLargerThan1000px ? setSidebarOpen(true) : "";

	const handleOpenNewContactModal = () => {
		setEditInfoVisible("Gegevens");
		setModalVisible("contact");
	};

	return (
		<>
			{sidebarOpen && (
				<aside className="fixed top-0 z-10 mt-16 h-full w-full bg-primary-200 shadow-lg lg:relative lg:mt-0 lg:w-[30rem] 2xl:w-[35rem] 3xl:w-[40rem]">
					<SideBarHeader />
					<SideBarContacts />

					<Button
						style="primary"
						label="Nieuw Contact"
						className=" absolute bottom-8 left-1/2 w-[calc(100%-4rem)]  -translate-x-1/2 md:bottom-8 md:w-[calc(100%-4rem)] lg:bottom-16 lg:w-[calc(100%-8rem)]"
						icon={<AddUserIcon className="mr-2 h-6 w-6 fill-white" />}
						onClick={handleOpenNewContactModal}
					/>
				</aside>
			)}
		</>
	);
};

const SideBarHeader = () => {
	const {
		showDroppedContacts,
		setShowDroppedContacts,
		contacts,
		view,
		web,
		setView,
		setSidebarOpen,
	} = useContext(WebContext);

	// Get contacts that are visible on the web
	const placedContacts = contacts?.filter((contact: any) => contact.visible).length;

	return (
		<div className={`flex-col justify-between px-4 pt-4 md:px-10 lg:flex lg:px-8 lg:pt-10`}>
			<div className={`lg:hidden`}>
				<IconButton
					onClick={() => setSidebarOpen(false)}
					className={`mb-2 h-8 w-8`}
					icon={<ArrowLeftIcon />}
				/>
				<H2 title="Contacten" className={`mb-3`} />
			</div>

			<H1
				underline
				subtitle="Inclusieweb"
				title={web.name}
				blockSpacing="hidden lg:block lg:opacity-100"
				className={`mb-8`}
			/>

			<SearchInput className={`mb-3`} />

			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-1 md:gap-3">
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
				<DivisionLine className={`hidden md:block md:opacity-100`} />
				<div className="flex items-center gap-1 md:gap-3">
					<button onClick={() => setView("list")}>
						<ListIcon
							className={`w-7 lg:w-8 ${view === "list" ? "fill-neutral-800" : "fill-neutral-700"}`}
						/>
					</button>
					<button onClick={() => setView("grid")}>
						<GridIcon
							className={`w-7 lg:w-8 ${view === "grid" ? "fill-neutral-800" : "fill-neutral-600"}`}
						/>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SideBar;
