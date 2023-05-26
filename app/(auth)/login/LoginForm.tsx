"use client";

import { Input } from "@/components/form/Input";
import emailIcon from "@/public/icons/email.svg";
import keyIcon from "@/public/icons/key.svg";
import Form from "@/components/form/Form";
import { useSupabase } from "@/app/supabase-provider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/form/Button";

// interface for form
type EmailInterface = {
	email: string;
	password: string;
	options: string;
	emailRedirectTo: string;
};

// validation
const EmailSchema = yup.object().shape({
	email: yup.string().email("Enter a valid email").required("Email is required"),
	password: yup.string().max(32, "Max password length is 32").required("Password is required"),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(EmailSchema) });
	const { supabase } = useSupabase();

	const onSubmit = async (data: EmailInterface) => {
		await supabase.auth.signInWithPassword({
			email: data.email,
			password: data.password,
		});
	};
	return (
		<Form
			btnLabel="Login"
			register={register}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}
			className="w-full">
			<Input
				name="email"
				type="email"
				label="Email"
				error={errors.email?.message}
				className="mb-3"
				// icon={emailIcon}
				alt="email icon"
			/>
			<Input
				name="password"
				type="password"
				label="Password"
				// icon={keyIcon}
				alt="key icon"
				error={errors.password?.message}
			/>
			<Button style="primary" label="login" className="w-full mt-4" />
		</Form>
	);
};

export default LoginForm;
