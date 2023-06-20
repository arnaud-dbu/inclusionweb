"use client";

import { AddUserIcon } from "@/public/icons";
import { WebContext } from "@/context/WebContext";
import { useContext } from "react";
import { Button } from "@/components/form/Button";
import { SideBarContacts } from "./SideBarContacts";
import { useMediaQuery } from "usehooks-ts";
import SideBarHeader from "./SideBarHeader";

const SideBar = () => {
	const { setModalVisible, setEditInfoVisible, sidebarOpen, setSidebarOpen } =
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
				<aside className="fixed top-0 z-10 mt-16 h-full w-full bg-primary-200 shadow-lg lg:relative lg:mt-0 lg:w-[30rem] 3xl:w-[40rem]">
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

export default SideBar;
