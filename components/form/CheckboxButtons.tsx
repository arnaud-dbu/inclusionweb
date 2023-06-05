// import { useState } from "react";

// function CheckboxButton() {
// 	const [isChecked, setIsChecked] = useState(false);

// 	return (
// 		<label>
// 			<input
// 				type="checkbox"
// 				onChange={() => {
// 					setIsChecked(!isChecked);
// 				}}
// 			/>
// 			<span
// 				className={`checkbox ${isChecked ? "checkbox--active" : ""}`}
// 				// This element is purely decorative so
// 				// we hide it for screen readers
// 				aria-hidden="true"
// 			/>
// 			Don't you dare to check me!
// 		</label>
// 	);
// }

import { WebContext } from "@/context/WebContext";
import { useContext, useEffect, useState } from "react";

type Props = {
	register?: any;
	options: any;
	name: string;
};

export const CheckboxButtons = ({ register, name, options, ...rest }: Props) => {
	const [selected, setSelected] = useState([]);
	const {
		setSelectedReceivedSupport,
		setSelectedGivenSupport,
		selectedGivenSupport,
		selectedReceivedSupport,
	} = useContext(WebContext);

	const handleSelection = (e) => {
		const selectedLabel = e.target.innerText;
		if (selected.includes(selectedLabel)) {
			setSelected(selected.filter((item) => item !== selectedLabel));
		} else {
			setSelected([...selected, selectedLabel]);
		}
	};
	// useEffect(() => {
	// 	if (selectedGivenSupport) {
	// 		setSelected(selectedGivenSupport);
	// 	} else {
	// 		setSelected(selectedReceivedSupport);
	// 	}
	// }, [selectedGivenSupport, selectedReceivedSupport]);

	// If selectedGivenSupport is not empty, then set selected to selectedGivenSupport
	// If selectedGivenSupport is empty, then set selected to selectedReceivedSupport
	useEffect(() => {
		name === "received_support" && setSelected(selectedReceivedSupport);
		name === "given_support" && setSelected(selectedGivenSupport);
	}, [selectedReceivedSupport, selectedReceivedSupport]);

	useEffect(() => {}, [selectedGivenSupport]);

	return (
		<div className="flex gap-2 cursor-pointer" {...rest}>
			{options.map((option) => (
				<label
					onClick={handleSelection}
					key={option}
					className={`cursor-pointer checkbox-hidden relative border-1 border-neutral-500 h-fit whitespace-nowrap text-neutral-800 rounded-full px-3 py-1 ${
						selected.includes(option) &&
						"bg-primary-300 border-primary-800 text-primary-900 shadow-lg"
					}`}>
					{option}
					<input {...register(name)} value={option} type="checkbox" />
				</label>
			))}
		</div>
	);
};
