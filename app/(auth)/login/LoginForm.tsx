"use client";

import { Input } from "@/components/form/Input";
import Form from "@/components/form/Form";
import { useSupabase } from "@/app/supabase-provider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/form/Button";
import { KeyIcon, MailIcon } from "@/public/icons";

// interface for form
type LoginTypes = {
	email: string;
	password: string;
};

// validation
const EmailSchema = yup.object().shape({
	email: yup.string().email("Enter a valid email").required("Email is verplicht"),
	password: yup.string().max(32, "Max paswoord lengte is 32").required("Paswoord verplicht"),
});

const LoginForm = () => {
	const { supabase } = useSupabase();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(EmailSchema) });

	const onSubmit = async (data: LoginTypes) => {
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
				secondary
				name="email"
				type="email"
				label="Email"
				error={errors.email?.message}
				className="mb-3"
				icon={<MailIcon className={`w-6 h-6 fill-neutral-600`} />}
			/>
			<Input
				secondary
				name="password"
				type="password"
				label="Password"
				error={errors.password?.message}
				icon={<KeyIcon className={`w-6 h-6 fill-neutral-600`} />}
			/>
			<Button style="primary" label="Log in" className="w-full mt-5" />
		</Form>
	);
};

export default LoginForm;
