import { Btn } from "@/components/Buttons";
import DivisionLine from "@/components/DivisionLine";
import { H1 } from "@/components/Typography";
import { AddUserIcon, GridIcon, ListIcon } from "@/public/icons";
import { Contacts } from "./Contacts";
import { WebContext } from "@/context/WebContext";
import { useContext } from "react";
import { CategoryButton } from "@/components/form/CategoryButton";
import { SearchInput } from "@/components/form/SearchInput";

const SideBar = () => {
	const {
		fetchedWebData,
		setModalVisible,
		showDroppedContacts,
		setShowDroppedContacts,
		setQuery,
		view,
		setView,
	} = useContext(WebContext);

	// Handlers
	const handleSearchFilter = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	return (
		<aside className="bg-primary-200 flex flex-col shadow-lg absolute left-24 w-[27.5%] h-full px-16 pt-12">
			<div className="flex flex-col">
				<span className="text-3xl text-neutral-800">Inclusieweb</span>
				<H1 underline>{fetchedWebData.name}</H1>
			</div>
			<SearchInput handleSearchFilter={handleSearchFilter} setQuery={setQuery} />
			<div className="flex items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<CategoryButton
						onClick={() => setShowDroppedContacts(false)}
						label="Niet geplaatst"
						active={!showDroppedContacts}
					/>
					<CategoryButton
						onClick={() => setShowDroppedContacts(true)}
						label="Geplaatst"
						active={showDroppedContacts}
					/>
				</div>
				<DivisionLine />
				<div className="flex items-center gap-2 ml-4">
					<button onClick={() => setView("list")}>
						<ListIcon
							className={`w-8 ${view === "list" ? "fill-neutral-800" : "fill-neutral-600"}`}
						/>
					</button>
					<button onClick={() => setView("grid")}>
						<GridIcon
							className={`w-8 ${view === "grid" ? "fill-neutral-800" : "fill-neutral-600"}`}
						/>
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
