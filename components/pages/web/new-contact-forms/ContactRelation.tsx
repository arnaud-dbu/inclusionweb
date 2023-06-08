import React from "react";
import FormBlockItem from "../FormBlockItem";
import { Dropdown } from "@/components/form/Dropdown";

type Props = {
	options: any;
};

const ContactRelation = ({ options }: Props) => {
	return (
		<FormBlockItem title="Relatie">
			<Dropdown className={`w-[30rem]`} name="relation" options={options} />
		</FormBlockItem>
	);
};

export default ContactRelation;
