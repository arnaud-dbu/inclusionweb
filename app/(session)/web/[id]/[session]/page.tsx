import WebComponents from "@/components/web/WebComponent";

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
		<WebComponents
			fetchedContactsData={fetchedContactsData}
			fetchedWebData={fetchedWebData}
			fetchedSessionsData={fetchedSessionsData}
			session={params.session}
		/>
	);
};

export default WebPage;
