import React from "react";
import FormBlockItem from "../FormBlockItem";
import { CheckboxButtons } from "@/components/form/CheckboxButtons";

type Props = {};

const ContactReceivedSupport = (props: Props) => {
	return (
		<FormBlockItem title="Ontvangen Steun">
			<CheckboxButtons
				name="received_support"
				options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
			/>
		</FormBlockItem>
	);
};

export default ContactReceivedSupport;
