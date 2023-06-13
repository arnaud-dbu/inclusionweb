import Header from "@/components/Header";
import { getUser } from "@/utils/users";
import MenuButtons from "@/components/pages/dashboard/MenuButtons";
import WebCardsContainer from "@/components/pages/dashboard/WebCards";

const DashboardPage = async () => {
	// Get user data
	const { user } = await getUser();

	// Get all webs from authenticated user
	const websRes = await fetch(`${process.env.HOST}/api/webs`, { cache: "no-cache" });
	const websData = await websRes.json();
	const fetchedWebsData = await websData?.filter((web: any) => web.user_id === user.id);

	// Get all sessions from authenticated user
	const sessionRes = await fetch(`${process.env.HOST}/api/sessions`, { cache: "no-cache" });
	const fetchedSessionsData = await sessionRes.json();

	return (
		<>
			<Header title="Mijn overzicht" />
			<div className="layout-wrapper flex justify-between gap-16">
				<WebCardsContainer
					fetchedWebsData={fetchedWebsData}
					fetchedSessionsData={fetchedSessionsData}
				/>
				<MenuButtons />
			</div>
		</>
	);
};

export default DashboardPage;
