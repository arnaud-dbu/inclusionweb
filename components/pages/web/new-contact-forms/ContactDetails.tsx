import React from "react";
import { Input } from "@/components/form/Input";
import { useFormContext } from "react-hook-form";
import { FormBlockItem } from "../FormBlock";

type Props = {
	title: string;
};

const ContactDetails = ({ title }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<FormBlockItem title={title}>
			<div className="flex w-full gap-3">
				<Input
					style="secondary"
					register={register}
					error={errors.name?.message}
					name="name"
					label="Naam"
					className={`w-full`}
				/>
				<Input style="secondary" register={register} name="role" label="Rol" className={`w-full`} />
			</div>
		</FormBlockItem>
	);
};

export default ContactDetails;
