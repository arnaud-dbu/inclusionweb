import React from "react";
import FormBlockItem from "../FormBlockItem";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { useFormContext } from "react-hook-form";

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
