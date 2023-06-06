import DivisionLine from "@/components/DivisionLine";
import Header from "@/components/Header";
import { H2 } from "@/components/Headings";
import MenuButtons from "@/components/pages/dashboard/MenuButtons";

const DashboardLoading = async () => {
	return (
		<>
			<Header title="Mijn overzicht" />
			<div className="layout-wrapper flex justify-between gap-16">
				<div className="mt-8 w-full">
					<div className="flex justify-between items-center gap-12 mb-8 px-2">
						<H2>Mijn Webben</H2>
						<DivisionLine />
					</div>
					<div className={`my-4 flex flex-col`}>
						<div
							className={`is-loading rounded-3xl px-12 border-[3px] h-[17.5rem] border-neutral-500 mb-4`}></div>
						<div
							className={`is-loading rounded-3xl px-12 border-[3px] h-[17.5rem] border-neutral-500 mb-4`}></div>
						<div
							className={`is-loading rounded-3xl px-12 border-[3px] h-[17.5rem] border-neutral-500 mb-4`}></div>
					</div>
				</div>
				<MenuButtons />
			</div>
		</>
	);
};

export default DashboardLoading;
