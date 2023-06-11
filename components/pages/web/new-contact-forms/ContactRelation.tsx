import React from "react";
import { FormBlockItem } from "../FormBlock";
import { Dropdown } from "@/components/form/Dropdown";
import { LinkIcon } from "@/public/icons";

type Props = {
	options: any;
};

const ContactRelation = ({ options }: Props) => {
	return (
		<FormBlockItem title="Relatie" icon={<LinkIcon className={`w-4 h-4 `} />}>
			<Dropdown className={`w-[30rem]`} name="relation" options={options} />
		</FormBlockItem>
	);
};

export default ContactRelation;
