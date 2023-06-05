import React from "react";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

type Props = {
	options: any;
	name?: string;
};

const SelectItem = ({ options, name }: Props) => {
	const { setValue } = useFormContext();

	const handleSelectChange = (selectedOption: any) => {
		setValue(name, selectedOption.value);
	};

	return <Select options={options} onChange={handleSelectChange} name={name} />;
};

export default SelectItem;
