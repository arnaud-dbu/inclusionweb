import DivisionLine from "@/components/DivisionLine";
import { WebContext } from "@/context/WebContext";
import React, { useContext } from "react";

const NewContactNavigation = () => {
	const { setEditInfoVisible } = useContext(WebContext);
	return (
		<section>
			<div className={`flex px-24 gap-8 uppercase font-primary text-neutral-800 text-2xl mb-2 `}>
				<NewContactNavigationItem title="Gegevens" onClick={() => setEditInfoVisible("Gegevens")} />
				<NewContactNavigationItem
					title="Afbeelding"
					onClick={() => setEditInfoVisible("Afbeelding")}
				/>
			</div>
			<DivisionLine />
		</section>
	);
};

const NewContactNavigationItem = ({ title, ...rest }) => {
	const { editInfoVisible } = useContext(WebContext);

	return (
		<button type="button" className={`relative uppercase`} {...rest}>
			{title}
			{editInfoVisible === title && (
				<div
					className={`absolute -bottom-[10px] z-10 left-1/2 -translate-x-1/2 h-[4px] w-7 rounded-lg bg-primary-800`}></div>
			)}
		</button>
	);
};

export default NewContactNavigation;
