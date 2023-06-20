import Header from "@/components/Header";
import { H3 } from "@/components/Typography";
import DivisionLine from "@/components/DivisionLine";
import { SearchInput } from "@/components/form/SearchInput";
import MenuButtons from "@/components/pages/dashboard/MenuButtons";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import OverFlowContainer from "@/components/OverFlowContainer";

const DashboardPage = async () => {
	return (
		<>
			<Header title="Mijn overzicht" />
			<div className="layout-wrapper flex justify-between gap-12">
				<div className="w-full">
					<div className="mb-[1.5rem] flex h-fit items-center justify-between gap-12 xl:mb-[2rem] ">
						<H3 className={`hidden md:block md:opacity-100`} title="Mijn Webben" />
						<DivisionLine className={`hidden md:block md:opacity-100`} />
						<SearchInput className={`w-full md:max-w-[17.5rem] `} />
					</div>
					<OverFlowContainer fadeBottom>
						{Array.from({ length: 8 }, (_, index) => (
							<LoadingSkeleton key={index} className="mb-5 h-[15rem] w-full" />
						))}
					</OverFlowContainer>
				</div>
				<MenuButtons />
			</div>
		</>
	);
};

export default DashboardPage;
