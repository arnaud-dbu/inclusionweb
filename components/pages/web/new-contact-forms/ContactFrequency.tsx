import React from "react";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { useFormContext } from "react-hook-form";
import { FormBlockItem } from "../FormBlock";
import { ChartIcon } from "@/public/icons";

const ContactFrequency = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<FormBlockItem title="Frequentie" icon={<ChartIcon className={`h-4 w-4`} />}>
			<RadioButtons
				register={register}
				options={["Nooit", "Dagelijks", "Wekelijks", "Maandelijks", "Jaarlijks"]}
				name="frequency"
			/>
		</FormBlockItem>
	);
};

export default ContactFrequency;
