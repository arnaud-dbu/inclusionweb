import Header from "@/components/Header";
import { getUser } from "@/utils/users";
import MenuButtons from "@/components/pages/dashboard/MenuButtons";
import WebCards from "@/components/pages/dashboard/WebCards";
import { Suspense } from "react";
import { H1 } from "@/components/Typography";

const DashboardPage = async () => {
	const { user } = await getUser();
	const response = await fetch(`${process.env.HOST}/api/webs`, { cache: "no-cache" });
	const data = await response.json();
	const webs = await data?.filter((web: any) => web.user_id === user.id);

	return (
		<>
			<Header title="Mijn overzicht" />
			<div className="layout-wrapper flex justify-between gap-16">
				<Suspense fallback={<H1>LOADING</H1>}>
					<WebCards user={user} webs={webs} />
				</Suspense>
				<MenuButtons />
			</div>
		</>
	);
};

export default DashboardPage;
