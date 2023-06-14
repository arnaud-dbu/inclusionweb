import React from "react";
import { FormBlockItem } from "../FormBlock";
import { Dropdown } from "@/components/form/Dropdown";
import { LinkIcon } from "@/public/icons";

type Props = {
	options: any;
};

const ContactRelation = ({ options }: Props) => {
	return (
		<FormBlockItem title="Relatie" icon={<LinkIcon className={`h-4 w-4 `} />}>
			<Dropdown className={``} name="relation" options={options} />
		</FormBlockItem>
	);
};

export default ContactRelation;
