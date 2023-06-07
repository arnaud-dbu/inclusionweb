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

// interface for form
type EmailInterface = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

// validation
const EmailSchema = yup.object().shape({
	email: yup.string().email("Voer een geldig e-mailadres in").required("E-mail is verplicht"),
	password: yup
		.string()
		.max(32, "Maximale wachtwoordlengte is 32")
		.required("Wachtwoord is verplicht"),
});

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
				<div className={`flex gap-2 mb-2`}>
					<Input
						bg="white"
						name="firstName"
						label="Voornaam"
						register={register}
						className="mb-3"
					/>
					<Input
						bg="white"
						name="lastName"
						label="Achternaam"
						register={register}
						className="mb-3"
					/>
				</div>
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
				<Button style="primary" label="Registreer" className="w-full mt-5" />
			</Form>
		</>
	);
};

export default RegisterForm;
