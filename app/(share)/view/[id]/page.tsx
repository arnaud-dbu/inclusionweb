import StaticWeb from "@/components/pages/share/StaticWeb";

const WebPage = async ({ params }) => {
	const res = await fetch(`${process.env.HOST}/api/sessions/${params.id}/share`, {
		cache: "no-cache",
	});
	const data = await res.json();

	return (
		<StaticWeb
			fetchedContactsData={data.contacts}
			fetchedSessionsData={data.session}
			fetchedWebData={data.web}
		/>
	);
};

export default WebPage;
