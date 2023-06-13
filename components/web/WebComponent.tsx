"use client";

import { WebProvider } from "@/context/WebContext";
import SideBar from "@/components/pages/web/SideBar";
import NewContactModal from "@/components/pages/web/NewContactModal";
import Web from "@/components/pages/web/Web";
import WebMenu from "../pages/web/WebMenu";

type Props = {
	fetchedWebData: any;
	fetchedContactsData: any;
	fetchedSessionsData: any;
	session: any;
};

const WebComponents = ({
	fetchedWebData,
	fetchedContactsData,
	fetchedSessionsData,
	session,
}: Props) => {
	return (
		<div className={`flex relative left-[6rem] h-full w-[calc(100vw-6rem)]`}>
			<WebProvider
				fetchedWebData={fetchedWebData}
				fetchedContactsData={fetchedContactsData}
				fetchedSessionsData={fetchedSessionsData}
				session={session}>
				<SideBar />
				<Web />
				<NewContactModal />
				<WebMenu />
			</WebProvider>
		</div>
	);
};

export default WebComponents;
