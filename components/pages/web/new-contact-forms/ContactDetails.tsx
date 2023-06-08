import React from "react";
import { Input } from "@/components/form/Input";
import { useFormContext } from "react-hook-form";
import { FormBlockItem } from "../FormBlock";

type Props = {
	title: string;
};

const ContactDetails = ({ title }: Props) => {
	const { register } = useFormContext();

	return (
		<FormBlockItem title={title}>
			<div className="flex gap-3 w-[30rem]">
				<Input secondary register={register} name="name" label="Naam" className={`w-full`} />
				<Input secondary register={register} name="role" label="Rol" className={`w-full`} />
			</div>
		</FormBlockItem>
	);
};

export default ContactDetails;
