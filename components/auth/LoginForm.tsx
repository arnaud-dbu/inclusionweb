"use client";

import { Input } from "@/components/form/Input";
import Form from "@/components/form/Form";
import { useSupabase } from "@/app/supabase-provider";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/form/Button";
import { KeyIcon, MailIcon } from "@/public/icons";
import { useState } from "react";
import { useRouter } from "next/navigation";

// interface for form
type LoginTypes = {
	email: string;
	password: string;
};

// validation
const EmailSchema = yup.object().shape({
	email: yup.string().email("Voer een geldig e-mailadres in").required("Email is verplicht"),
	password: yup.string().max(32, "Max paswoord lengte is 32").required("Paswoord verplicht"),
});

const LoginForm = () => {
	const { supabase } = useSupabase();
	const router = useRouter();
	const [submitError, setSubmitError] = useState("");

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(EmailSchema) });

	const onSubmit = async (body: LoginTypes) => {
		const { error } = await supabase.auth.signInWithPassword({
			email: body.email,
			password: body.password,
		});

		if (error) {
			error && setSubmitError("E-mail adres en/of paswoord is onjuist");
		}

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			router.push("/dashboard");
		}
	};

	return (
		<>
			{submitError && <span className={`alert`}>{submitError}</span>}
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
				<Input
					bg="white"
					name="password"
					type="password"
					label="Password"
					register={register}
					error={errors.password?.message}
					icon={<KeyIcon className={`w-6 h-6 fill-neutral-600`} />}
				/>
				<Button style="primary" label="Log in" className="w-full mt-5" />
			</Form>
		</>
	);
};

export default LoginForm;
