"use client";

import { WebProvider } from "@/context/WebContext";
import SideBar from "@/components/pages/web/SideBar";
import Web from "@/components/pages/web/Web";
import NewContactModal from "@/components/pages/web/NewContactModal";

type Props = {
	fetchedContactsData: any;
	fetchedWebData: any;
	fetchedSessionsData: any;
	session: number;
};

const WebPage = ({ fetchedWebData, fetchedContactsData, fetchedSessionsData, session }: Props) => {
	return (
		<div className={`flex relative left-[6rem] w-[calc(100vw-6rem)]`}>
			<WebProvider
				fetchedWebData={fetchedWebData}
				fetchedContactsData={fetchedContactsData}
				fetchedSessionsData={fetchedSessionsData}
				session={session}>
				<SideBar />
				<Web />
				<NewContactModal />
			</WebProvider>
		</div>
	);
};

export default WebPage;
