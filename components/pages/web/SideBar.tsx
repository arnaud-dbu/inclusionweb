import DivisionLine from "@/components/DivisionLine";
import { HeadingPrimary } from "@/components/Typography";
import { AddUserIcon, GridIcon, ListIcon } from "@/public/icons";
import { SideBarContacts } from "./SideBarContacts";
import { WebContext } from "@/context/WebContext";
import { useContext } from "react";
import { CategoryButton } from "@/components/form/CategoryButton";
import { SearchInput } from "@/components/form/SearchInput";
import { Button } from "@/components/form/Button";

const xSpacing = 20;
const headerContainer = "20rem";

const SideBar = () => {
	const { setModalVisible } = useContext(WebContext);

	return (
		<SideBarContainer>
			<SideBarHeader />
			<SideBarContacts headerContainer={headerContainer} xSpacing={xSpacing} />
			<div className={`absolute bottom-8 w-full px-${xSpacing}`}>
				<Button
					style="primary"
					label="Niew Contact "
					className={`w-full`}
					icon={<AddUserIcon className="w-6 h-6 fill-white mr-2" />}
					onClick={() => setModalVisible("contact")}
				/>
			</div>
		</SideBarContainer>
	);
};

const SideBarContainer = ({ children }) => {
	return (
		<aside className="bg-primary-200 shadow-lg w-[60rem]">
			<div className={`relative h-full`}>{children}</div>
		</aside>
	);
};

const SideBarHeader = () => {
	const { showDroppedContacts, setShowDroppedContacts, view, web, setView } =
		useContext(WebContext);

	return (
		<div
			className={`h-[${headerContainer}] flex flex-col justify-between pt-[2.5rem] px-${xSpacing}`}>
			<div>
				<span className="text-3xl text-neutral-800">Inclusieweb</span>
				<HeadingPrimary underline title={web.name} className={`!mb-0`} />
			</div>
			<div>
				<SearchInput />
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
					<div className="flex items-center gap-2">
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
			</div>
		</div>
	);
};

export default SideBar;
