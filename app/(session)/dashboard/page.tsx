import Header from "@/components/Header";
import WebCardsContainer from "@/components/pages/dashboard/WebCards";
import MenuButtonsContainer from "@/components/pages/dashboard/MenuButtons";

const DashboardPage = async () => {
	return (
		<>
			<Header title="Mijn overzicht" />
			<div className="layout-wrapper flex justify-between gap-12">
				<WebCardsContainer />
				<MenuButtonsContainer />
			</div>
		</>
	);
};

export default DashboardPage;
