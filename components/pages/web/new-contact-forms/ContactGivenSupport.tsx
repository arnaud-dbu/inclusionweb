import React from "react";
import { CheckboxButtons } from "@/components/form/CheckboxButtons";
import { FormBlockItem } from "../FormBlock";
import { HandIcon } from "@/public/icons";

type Props = {};

const ContactGivenSupport = (props: Props) => {
	return (
		<FormBlockItem title="Gegeven Steun" icon={<HandIcon className={`w-4 h-4 `} />}>
			<CheckboxButtons
				name="given_support"
				options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
			/>
		</FormBlockItem>
	);
};

export default ContactGivenSupport;
