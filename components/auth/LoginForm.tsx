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
import { EmailSchema } from "@/utils/shemas";

type LoginTypes = {
	email: string;
	password: string;
};

const LoginForm = () => {
	const router = useRouter();
	const { supabase } = useSupabase();
	const [submitError, setSubmitError] = useState("");
	const [buttonIsLoading, setButtonIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(EmailSchema) });

	const onSubmit = async (body: LoginTypes) => {
		setButtonIsLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: body.email,
			password: body.password,
		});

		if (error) {
			error && setSubmitError("E-mail adres en/of paswoord is onjuist");
			setButtonIsLoading(false);
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
					style="primary"
					name="email"
					type="email"
					label="Email"
					register={register}
					error={errors.email?.message}
					className="mb-4"
					icon={<MailIcon className={`h-6 w-6 fill-neutral-600`} />}
				/>
				<Input
					style="primary"
					name="password"
					type="password"
					label="Password"
					register={register}
					error={errors.password?.message}
					className={`mb-6`}
					icon={<KeyIcon className={`h-6 w-6 fill-neutral-600`} />}
				/>
				<Button style="primary" label="Log in" className="mt-5 w-full" loading={buttonIsLoading} />
			</Form>
		</>
	);
};

export default LoginForm;
