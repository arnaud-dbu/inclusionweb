import { MainSection } from "@/components/Layouts";
import NewContactModal from "@/components/pages/web/NewContactModal";
import SideBar from "@/components/pages/web/SideBar";
import Web from "@/components/pages/web/Web";
import WebMenu from "@/components/pages/web/WebMenu";
import { WebProvider } from "@/context/WebContext";

const WebPage = async ({ params }) => {
	// Fetch web data
	const webRes = await fetch(`${process.env.HOST}/api/webs/${params.id}`, {
		cache: "no-cache",
	});
	const fetchedWebData = await webRes.json();

	// Fetch contacts data
	const contactRes = await fetch(`${process.env.HOST}/api/contacts`, {
		cache: "no-cache",
	});
	const fetchedContactsData = await contactRes.json();

	// Fetch sessions data
	const sessionRes = await fetch(`${process.env.HOST}/api/sessions`, {
		cache: "no-cache",
	});
	const sessionsData = await sessionRes.json();
	const fetchedSessionsData = await sessionsData?.filter(
		(session: any) => session.web_id === fetchedWebData.id
	);

	return (
		<WebProvider
			fetchedWebData={fetchedWebData}
			fetchedContactsData={fetchedContactsData}
			fetchedSessionsData={fetchedSessionsData}
			session={params.session}>
			<div className={`h-full w-full overflow-hidden lg:flex`}>
				<SideBar />
				<Web />
			</div>
			<WebMenu />
			<NewContactModal />
		</WebProvider>
	);
};

export default WebPage;
