import React from "react";
import { CheckboxButtons } from "@/components/form/CheckboxButtons";
import { FormBlockItem } from "../FormBlock";

type Props = {};

const ContactGivenSupport = (props: Props) => {
	return (
		<FormBlockItem title="Gegeven Steun">
			<CheckboxButtons
				name="given_support"
				options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
			/>
		</FormBlockItem>
	);
};

export default ContactGivenSupport;
