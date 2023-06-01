import clsx from "clsx";
import React, { useState } from "react";
import Select, {
	components,
	DropdownIndicatorProps,
	ClearIndicatorProps,
	MultiValueRemoveProps,
} from "react-select";

type Props = {
	register?: any;
	options: any;
	name?: string;
	className?: string;
	placeholder?: string;
};

// const DropdownIndicator = (props: DropdownIndicatorProps) => {
// 	return (
// 		<components.DropdownIndicator {...props}>{/* <EditIcon  /> */}</components.DropdownIndicator>
// 	);
// };

// const ClearIndicator = (props: ClearIndicatorProps) => {
// 	return (
// 		<components.ClearIndicator {...props}>
// 			<ImageIcon />
// 		</components.ClearIndicator>
// 	);
// };

// const MultiValueRemove = (props: MultiValueRemoveProps) => {
// 	return (
// 		<components.MultiValueRemove {...props}>
// 			<PencilIcon />
// 		</components.MultiValueRemove>
// 	);
// };

const controlStyles = {
	base: "border-1 border-neutral-600 rounded-lg h-10 hover:cursor-pointer",
	focus: "border-primary-600 bg-white ring-1 ring-primary-500",
	nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-500 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
// const multiValueStyles = "bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5";
// const multiValueLabelStyles = "leading-6 py-0.5";
// const multiValueRemoveStyles =
// 	"border border-gray-200 bg-white hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles = "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "bg-gray-300";
const dropdownIndicatorStyles = "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
// const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
	base: "hover:cursor-pointer px-3 py-2 rounded",
	focus: "bg-gray-100 active:bg-gray-200",
	selected: "bg-primary-400 after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
	"text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

export const Blabla = () => {
	return <button>Hallo</button>;
};

export const Dropdown = ({ register, options, name, className, placeholder }: Props) => {
	const [selectedOption, setSelectedOption] = useState(null);
	if (selectedOption) {
		register(name, { value: selectedOption.label });
	}

	return (
		<div className={` ${className}`}>
			<Select
				// isMulti
				closeMenuOnSelect={true}
				hideSelectedOptions={true}
				unstyled
				styles={{
					input: (base) => ({
						...base,
						"input:focus": {
							boxShadow: "none",
						},
					}),
					multiValueLabel: (base) => ({
						...base,
						whiteSpace: "normal",
						overflow: "visible",
					}),
					control: (base) => ({
						...base,
						transition: "none",
					}),
				}}
				classNames={{
					control: ({ isFocused }) =>
						clsx(isFocused ? controlStyles.focus : controlStyles.nonFocus, controlStyles.base),
					placeholder: () => placeholderStyles,
					input: () => selectInputStyles,
					valueContainer: () => valueContainerStyles,
					singleValue: () => singleValueStyles,
					// multiValue: () => multiValueStyles,
					// multiValueLabel: () => multiValueLabelStyles,
					// multiValueRemove: () => multiValueRemoveStyles,
					indicatorsContainer: () => indicatorsContainerStyles,
					clearIndicator: () => clearIndicatorStyles,
					indicatorSeparator: () => indicatorSeparatorStyles,
					dropdownIndicator: () => dropdownIndicatorStyles,
					menu: () => menuStyles,
					// groupHeading: () => groupHeadingStyles,
					option: ({ isFocused, isSelected }) =>
						clsx(
							isFocused && optionStyles.focus,
							isSelected && optionStyles.selected,
							optionStyles.base
						),
					noOptionsMessage: () => noOptionsMessageStyles,
				}}
				// {...props}
				// components={{ Menu: Blabla }}
				defaultValue={selectedOption}
				onChange={setSelectedOption}
				options={options}
				placeholder={placeholder}
			/>
		</div>
	);
};
