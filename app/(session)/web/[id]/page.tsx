import MyWeb from "./partials/MyWeb";

type Props = {
	data: any;
};

const WebPage = async ({ params }) => {
	const webresponse = await fetch(`http://localhost:3000/api/web/${params.id}`, {
		cache: "no-store",
	});
	const web = await webresponse.json();

	// const contactres = await fetch(`http://localhost:3000/api/contacts`, {
	// 	cache: "no-store",
	// });

	// const contacts = await contactres.json();

	return <MyWeb data={web} />;
};

export default WebPage;
