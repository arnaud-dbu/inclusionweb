import MyWeb from "@/components/pages/web/MyWeb";

const WebPage = async ({ params }) => {
	const webRes = await fetch(`${process.env.HOST}/api/web/${params.id}`);
	const fetchedWebData = await webRes.json();

	const contactRes = await fetch(`${process.env.HOST}/api/contacts`);
	const contactsData = await contactRes.json();
	const fetchedContactsData = await contactsData?.filter(
		(contact: any) => contact.web_id === fetchedWebData.id && contact.session_id === params.session
	);

	const sessionRes = await fetch(`${process.env.HOST}/api/sessions`);
	const sessionsData = await sessionRes.json();
	const fetchedSessionsData = await sessionsData?.filter(
		(session: any) => session.web_id === fetchedWebData.id
	);

	return (
		<MyWeb
			fetchedContactsData={fetchedContactsData}
			fetchedWebData={fetchedWebData}
			fetchedSessionsData={fetchedSessionsData}
			session={params.session}
		/>
	);
};

export default WebPage;
