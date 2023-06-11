import React from "react";
import { FormBlockItem } from "../FormBlock";
import { CheckboxButtons } from "@/components/form/CheckboxButtons";
import { HandIcon } from "@/public/icons";

type Props = {};

const ContactReceivedSupport = (props: Props) => {
	return (
		<FormBlockItem
			title="Ontvangen Steun"
			icon={<HandIcon className={`w-4 h-4 transform scale-x-[-1] fill-primary-500`} />}>
			<CheckboxButtons
				name="received_support"
				options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
			/>
		</FormBlockItem>
	);
};

export default ContactReceivedSupport;
