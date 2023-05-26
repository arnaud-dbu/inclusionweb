import MyWeb from "./components/MyWeb";

type Props = {
	data: any;
};

const WebPage = async ({ params }) => {
	const webRes = await fetch(`http://localhost:3000/api/web/${params.id}`, {
		cache: "no-store",
	});
	const fetchedWebData = await webRes.json();

	const contactRes = await fetch(`http://localhost:3000/api/contacts`, {
		cache: "no-store",
	});
	const fetchedContactsData = await contactRes.json();

	return <MyWeb fetchedContactsData={fetchedContactsData} fetchedWebData={fetchedWebData} />;
};

export default WebPage;
