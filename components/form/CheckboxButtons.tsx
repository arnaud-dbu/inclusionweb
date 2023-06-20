import { WebContext } from "@/context/WebContext";
import { useContext, useEffect, useState, useRef } from "react";
import { useFormContext } from "react-hook-form";

type Props = {
	options: any;
	name: string;
};

export const CheckboxButtons = ({ name, options, ...rest }: Props) => {
	const [selected, setSelected] = useState([]);
	const { selectedGivenSupport, selectedReceivedSupport } = useContext(WebContext);
	const { register } = useFormContext();
	const buttonRefs = useRef([]);

	const handleSelection = (e, index) => {
		const selectedLabel = e.target.innerText;
		if (selected.includes(selectedLabel)) {
			setSelected(selected.filter((item) => item !== selectedLabel));
		} else {
			setSelected([...selected, selectedLabel]);
		}
		buttonRefs.current[index].focus();
	};

	useEffect(() => {
		if (name === "received_support") {
			setSelected(selectedReceivedSupport);
		} else if (name === "given_support") {
			setSelected(selectedGivenSupport);
		}
	}, [selectedGivenSupport, selectedReceivedSupport, name]);

	return (
		<div className="flex cursor-pointer flex-wrap gap-2" {...rest}>
			{options.map((option, index) => (
				<label
					onClick={(e) => handleSelection(e, index)}
					ref={(button) => (buttonRefs.current[index] = button)}
					key={option}
					className={`checkbox-hidden focus relative h-fit cursor-pointer whitespace-nowrap rounded-full border-1 border-neutral-500 px-3 py-1 text-sm text-neutral-800 lg:text-base ${
						selected.includes(option) &&
						"border-primary-800 bg-primary-300 text-primary-900 shadow-lg"
					}`}
					tabIndex={0} // Add tabIndex attribute to make the label focusable
					htmlFor={`checkbox-${name}-${index}`} // Add htmlFor attribute matching the input's id
				>
					{option}
					<input
						{...register(name)}
						id={`checkbox-${name}-${index}`} // Add id attribute matching the label's htmlFor
						value={option}
						type="checkbox"
					/>
				</label>
			))}
		</div>
	);
};

// import { WebContext } from "@/context/WebContext";
// import { useContext, useEffect, useState } from "react";
// import { useFormContext } from "react-hook-form";

// type Props = {
// 	options: any;
// 	name: string;
// };

// export const CheckboxButtons = ({ name, options, ...rest }: Props) => {
// 	const [selected, setSelected] = useState([]);
// 	const { selectedGivenSupport, selectedReceivedSupport } = useContext(WebContext);
// 	const { register } = useFormContext();

// 	const handleSelection = (e) => {
// 		const selectedLabel = e.target.innerText;
// 		if (selected.includes(selectedLabel)) {
// 			setSelected(selected.filter((item) => item !== selectedLabel));
// 		} else {
// 			setSelected([...selected, selectedLabel]);
// 		}
// 	};
// 	useEffect(() => {
// 		name === "received_support" && setSelected(selectedReceivedSupport);
// 		name === "given_support" && setSelected(selectedGivenSupport);
// 	}, [selectedReceivedSupport, selectedReceivedSupport]);

// 	return (
// 		<div className="flex cursor-pointer gap-2" {...rest}>
// 			{options.map((option) => (
// 				<label
// 					onClick={handleSelection}
// 					key={option}
// 					className={`checkbox-hidden relative h-fit cursor-pointer whitespace-nowrap rounded-full border-1 border-neutral-500 px-3 py-1 text-neutral-800 ${
// 						selected.includes(option) &&
// 						"border-primary-800 bg-primary-300 text-primary-900 shadow-lg"
// 					}`}>
// 					{option}
// 					<input {...register(name)} value={option} type="checkbox" />
// 				</label>
// 			))}
// 		</div>
// 	);
// };
