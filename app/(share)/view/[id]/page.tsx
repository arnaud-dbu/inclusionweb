import Web from "@/components/pages/web/Web";
import { WebProvider } from "@/context/WebContext";

const WebPage = async ({ params }) => {
	const res = await fetch(`${process.env.HOST}/api/sessions/${params.id}/share`, {
		cache: "no-cache",
	});
	const data = await res.json();

	return (
		<>
			<header className="h-20 w-screen bg-primary-700">
				<div className={`mx-auto flex h-full max-w-[120rem] items-center justify-center px-6`}>
					<span className={`text-center font-primary text-4xl font-bold uppercase text-white`}>
						{data.web.name}&apos;s Inclusieweb
					</span>
				</div>
			</header>
			<div className="relative mx-auto h-screen max-w-[120rem] px-6">
				<WebProvider
					fetchedWebData={data.web}
					fetchedContactsData={data.contacts}
					fetchedSessionsData={data.session}
					session={data.session[0].session}>
					<Web shareView />
				</WebProvider>
			</div>
		</>
	);
};

export default WebPage;
