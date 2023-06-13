import Header from "@/components/Header";
import MenuButtons from "@/components/pages/dashboard/MenuButtons";
import DivisionLine from "@/components/DivisionLine";
import { HeadingSecondary } from "@/components/Typography";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import OverFlowContainer from "@/components/OverFlowContainer";

const DashboardPage = async () => {
	return (
		<>
			<Header title="Mijn overzicht" />
			<div className="layout-wrapper flex justify-between gap-16">
				<div className="w-full">
					<div className="flex justify-between items-center gap-12 px-2 h-fit mb-[2rem]">
						<HeadingSecondary title="Mijn webben" />
						<DivisionLine />
						<LoadingSkeleton className={`w-[30rem] h-[3rem]`} />
					</div>
					<OverFlowContainer fadeBottom className={`h-[calc(100vh-20.25rem)]`}>
						{Array.from({ length: 4 }, (_, index) => (
							<LoadingSkeleton key={index} className="w-full h-[15rem] mb-5" />
						))}
					</OverFlowContainer>
				</div>
				<MenuButtons />
			</div>
		</>
	);
};

export default DashboardPage;
