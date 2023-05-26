import { Btn } from "@/components/Buttons";
import DivisionLine from "@/components/DivisionLine";
import { H1 } from "@/components/Headings";
import { AddUserIcon, GridIcon, ListIcon, SearchIcon } from "@/public/icons";
import { Contacts } from "./Contacts";
import { WebContext, WebProvider } from "@/context/WebContext";
import { useContext } from "react";

const SideBar = () => {
	const { fetchedWebData, setModalVisible } = useContext(WebContext);

	return (
		<aside className="bg-primary-200 flex flex-col shadow-lg absolute left-24 w-[25%] h-full px-16 pt-12">
			<div className="flex flex-col">
				<span className="text-3xl text-neutral-800">Inclusieweb</span>
				<H1 underline>{fetchedWebData.name}</H1>
			</div>
			<div className="form-input relative my-6">
				<SearchIcon className="w-6 fill-neutral-900 absolute right-4 top-1/2 -translate-y-1/2 opacity-30" />
				<input placeholder="Zoek" />
			</div>
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center">
					<button className="bg-primary-400 text-primary-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap">
						Niet geplaatst
					</button>
					<button className="text-neutral-800 px-4 py-[.5rem] font-semibold rounded-full whitespace-nowrap">
						Geplaatst
					</button>
				</div>
				<DivisionLine />
				<div className="flex items-center gap-2 ml-4">
					<button>
						<ListIcon className="fill-neutral-600 w-8" />
					</button>
					<button>
						<GridIcon className="fill-neutral-600 w-8" />
					</button>
				</div>
			</div>
			<Contacts />

			<Btn onClick={() => setModalVisible(true)} className="w-full mt-auto mb-8" primary submit>
				<AddUserIcon className="w-6 fill-white mr-2" />
				Nieuw
			</Btn>
		</aside>
	);
};

export default SideBar;
