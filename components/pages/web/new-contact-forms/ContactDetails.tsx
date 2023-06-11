import React from "react";
import { Input } from "@/components/form/Input";
import { useFormContext } from "react-hook-form";
import { FormBlockItem } from "../FormBlock";
import { PersonIcon } from "@/public/icons";

type Props = {
	title: string;
};

const ContactDetails = ({ title }: Props) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	return (
		<FormBlockItem>
			<div className="flex gap-3 w-[30rem]">
				<Input
					secondary
					register={register}
					error={errors.name?.message}
					name="name"
					label="Naam"
					className={`w-full`}
				/>
				<Input secondary register={register} name="role" label="Rol" className={`w-full`} />
			</div>
		</FormBlockItem>
	);
};

export default ContactDetails;
