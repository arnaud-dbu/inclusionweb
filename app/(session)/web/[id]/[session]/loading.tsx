import LoadingSkeleton from "@/components/LoadingSkeleton";
import DivisionLine from "@/components/DivisionLine";
import { H1, H2 } from "@/components/Typography";
import { ArrowLeftIcon, GridIcon, ListIcon } from "@/public/icons";

import { CategoryButton } from "@/components/form/CategoryButton";
import { SearchInput } from "@/components/form/SearchInput";
import { IconButton } from "@/components/form/IconButton";
import WebIllustration from "@/components/pages/new/WebIllustration";

const WebLoadingPage = async () => {
	return (
		<div>
			<div className={`h-screen w-full overflow-hidden lg:flex`}>
				<aside className="fixed top-0 z-10 mt-16 h-full w-full bg-primary-200 shadow-lg lg:relative lg:mt-0 lg:w-[30rem] 3xl:w-[40rem]">
					<div className={`flex-col justify-between px-4 pt-4 md:px-10 lg:flex lg:px-8 lg:pt-10`}>
						<div className={`lg:hidden`}>
							<IconButton className={`mb-2 h-8 w-8`} icon={<ArrowLeftIcon />} />
							<H2 title="Contacten" className={`mb-3`} />
						</div>

						<LoadingSkeleton className={`h-[6rem] w-full `} />

						<SearchInput className={`mb-3`} />

						<div className="flex items-center justify-between gap-2">
							<div className="flex items-center gap-1 md:gap-3">
								<CategoryButton label={`Niet Geplaatst`} active={true} />
								<CategoryButton label={`Geplaatst `} active={false} />
							</div>
							<DivisionLine className={`hidden md:block md:opacity-100`} />
							<div className="flex items-center gap-1 md:gap-3">
								<button>
									<ListIcon className={`w-7 fill-neutral-800 lg:w-8 `} />
								</button>
								<button>
									<GridIcon className={`w-7 fill-neutral-800 lg:w-8 `} />
								</button>
							</div>
						</div>
					</div>
					<div className={`} mb-20 flex flex-wrap justify-between px-4 pt-6 md:px-10 lg:px-8`}>
						{Array.from({ length: 8 }, (_, index) => (
							<LoadingSkeleton key={index} className="mb-5 h-[10rem] w-[48%]" />
						))}
					</div>
				</aside>
				<div className={`flex h-screen w-full items-center justify-center`}>
					<WebIllustration loading className={`h-[42.5vw] w-[42.5vw]`} />
				</div>
			</div>
		</div>
	);
};

export default WebLoadingPage;
