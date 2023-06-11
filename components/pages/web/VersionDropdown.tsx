import React, { useContext } from "react";
import clsx from "clsx";
import Select, { components } from "react-select";
import { Button } from "@/components/form/Button";
import { EditIcon, PencilIcon, TrashIcon } from "@/public/icons";
import { IconButton } from "@/components/form/IconButton";
import { WebContext } from "@/context/WebContext";
import { useRouter } from "next/navigation";
import { set } from "react-hook-form";

const Option = (props) => {
	const { sessions, setSessions, setModalVisible } = useContext(WebContext);

	const handleDeleteSession = async (id: string, event: React.MouseEvent) => {
		event.stopPropagation();

		const newSessions = sessions.filter((session) => session.id !== id);
		setSessions(newSessions);

		const response = await fetch(`/api/sessions/${id}`, {
			method: "DELETE",
		});
	};

	return (
		<>
			<components.Option {...props}>
				<div className={`flex items-center justify-between`}>
					<div>{props.children}</div>
					<div className={`flex items-center gap-2`}>
						<IconButton
							onClick={(event) => handleDeleteSession(props.data.id, event)}
							icon={<TrashIcon className={`w-4 h-4 fill-neutral-800 pointer-events-auto`} />}
						/>
					</div>
				</div>
			</components.Option>
		</>
	);
};

type Props = {
	register?: any;
	options: any;
	name?: string;
	className?: string;
	placeholder?: string;
	selectedOption?: any;
	setSelectedOption?: any;
	handleSessionChange?: any;
	sessions?: any;
};

const controlStyles = {
	base: "border-1 border-neutral-600 rounded-lg h-10 hover:cursor-pointer",
	focus: "border-primary-600 bg-white ring-1 ring-primary-500",
	nonFocus: "border-gray-300 hover:border-gray-400",
};
const placeholderStyles = "text-gray-500 pl-1 py-0.5";
const selectInputStyles = "pl-1 py-0.5";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles = "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "bg-gray-300";
const dropdownIndicatorStyles = "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
const menuStyles = "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
const optionStyles = {
	base: "hover:cursor-pointer px-3 py-2 rounded",
	focus: "bg-gray-100 active:bg-gray-200",
	selected: "bg-primary-400 after:ml-2 after:text-green-500 text-gray-500",
};
const noOptionsMessageStyles =
	"text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

const DropdownVersion = ({
	selectedOption,
	setSelectedOption,
	handleSessionChange,
	sessions,
	register,
	options,
	name,
	className,
	placeholder,
	...props
}: Props) => {
	const { session } = useContext(WebContext);

	const filteredOptions = options.filter((option) => option.value !== parseFloat(session));

	return (
		<div className={` ${className}`}>
			<Select
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
					indicatorsContainer: () => indicatorsContainerStyles,
					clearIndicator: () => clearIndicatorStyles,
					indicatorSeparator: () => indicatorSeparatorStyles,
					dropdownIndicator: () => dropdownIndicatorStyles,
					menu: () => menuStyles,
					option: ({ isFocused, isSelected }) =>
						clsx(
							isFocused && optionStyles.focus,
							isSelected && optionStyles.selected,
							optionStyles.base
						),
					noOptionsMessage: () => noOptionsMessageStyles,
				}}
				{...props}
				closeMenuOnSelect={true}
				hideSelectedOptions={true}
				components={{ Option }}
				defaultValue={selectedOption}
				onChange={handleSessionChange}
				options={filteredOptions}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default DropdownVersion;
