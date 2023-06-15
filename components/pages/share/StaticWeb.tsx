"use client";

import { WebProvider } from "@/context/WebContext";
import Web from "../web/Web";

type Props = {
	fetchedWebData: any;
	fetchedContactsData: any;
	fetchedSessionsData: any;
};

const StaticWeb = ({ fetchedWebData, fetchedContactsData, fetchedSessionsData }: Props) => {
	return (
		<WebProvider
			fetchedWebData={fetchedWebData}
			fetchedContactsData={fetchedContactsData}
			fetchedSessionsData={fetchedSessionsData}
			session={fetchedSessionsData[0].session}>
			<Web shareView />
		</WebProvider>
	);
};

export default StaticWeb;
