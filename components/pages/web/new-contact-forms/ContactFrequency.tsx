import React from "react";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { useFormContext } from "react-hook-form";
import { FormBlockItem } from "../FormBlock";

const ContactFrequency = () => {
	const { register } = useFormContext();

	return (
		<FormBlockItem title="Frequentie">
			<RadioButtons
				register={register}
				options={["Nooit", "Dagelijks", "Wekelijks", "Maandelijks", "Jaarlijks"]}
				name="frequency"
			/>
		</FormBlockItem>
	);
};

export default ContactFrequency;
