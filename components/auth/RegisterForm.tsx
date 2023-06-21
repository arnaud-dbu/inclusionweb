"use client";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { useSupabase } from "@/app/supabase-provider";
import { KeyIcon, MailIcon } from "@/public/icons";
import { Button } from "@/components/form/Button";
import { useRouter } from "next/navigation";
import { EmailSchema } from "@/utils/shemas";

// interface for form
type EmailInterface = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const RegisterForm = () => {
	const { supabase } = useSupabase();
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(EmailSchema) });

	const onSubmit = async (body: EmailInterface) => {
		await supabase.auth.signUp({
			email: body.email,
			password: body.password,
			options: {
				data: {
					firstName: body.firstName,
					lastName: body.lastName,
				},
			},
		});

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (user) {
			router.push("/welcome");
		}
	};

	return (
		<>
			<Form
				btnLabel="Login"
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				className="w-full">
				<div className={`flex gap-2`}>
					<Input
						style="primary"
						name="firstName"
						label="Voornaam"
						register={register}
						className="mb-4"
					/>
					<Input
						style="primary"
						name="lastName"
						label="Achternaam"
						register={register}
						className="mb-4"
					/>
				</div>
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
					icon={<KeyIcon className={`h-6 w-6 fill-neutral-600`} />}
				/>
				<Button style="primary" label="Registreer" className="mt-5 w-full" />
			</Form>
		</>
	);
};

export default RegisterForm;
