"use client";

import { Input } from "@/components/form/Input";
import Form from "@/components/form/Form";
import { useSupabase } from "@/app/supabase-provider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/form/Button";
import { MailIcon } from "@/public/icons";
import { H1 } from "@/components/Typography";

type LoginTypes = {
	email: string;
};

const EmailSchema = yup.object().shape({
	email: yup.string().email("Voer een geldig e-mailadres in").required("Email is verplicht"),
});

const LoginForm = () => {
	const { supabase } = useSupabase();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(EmailSchema) });

	const onSubmit = async (data: LoginTypes) => {
		console.log(data.email);

		const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
			redirectTo: "https://example.com/update-password",
		});
	};

	return (
		<>
			<H1 underline>Wijzig Paswoord</H1>
			<Form
				btnLabel="Login"
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				className="w-full">
				<Input
					bg="white"
					name="email"
					type="email"
					label="Email"
					register={register}
					error={errors.email?.message}
					className="mb-3"
					icon={<MailIcon className={`w-6 h-6 fill-neutral-600`} />}
				/>

				<Button style="primary" label="Log in" className="w-full mt-5" />
			</Form>
		</>
	);
};

export default LoginForm;
