import DivisionLine from "@/components/DivisionLine";
import { WebContext } from "@/context/WebContext";
import React, { useContext } from "react";

const NewContactNavigation = () => {
	const { setEditInfoVisible } = useContext(WebContext);
	return (
		<section>
			<div
				className={`mb-2 flex gap-8 px-6 font-primary text-xl uppercase text-neutral-800 md:px-10 md:text-2xl lg:px-14 `}>
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
					className={`absolute -bottom-[10px] left-1/2 z-10 h-[4px] w-7 -translate-x-1/2 rounded-lg bg-primary-800`}></div>
			)}
		</button>
	);
};

export default NewContactNavigation;
