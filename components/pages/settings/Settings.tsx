"use client";

import { H2 } from "@/components/Typography";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { Setting } from "@/components/pages/settings/Setting";
import { TrashIcon } from "@/public/icons";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

type Props = {
	userMetadata: any;
	id: string;
};

// validation
const NameSchema = yup.object().shape({
	firstName: yup.string().required("Voornaam is verplicht"),
	lastName: yup.string().required("Achternaam is verplicht"),
});

const PasswordSchema = yup.object().shape({
	password: yup
		.string()
		.required("Paswoord is verplicht")
		.min(6, "Paswoord moet min 6 karakters bevatten"),
	validatePassword: yup
		.string()
		.required("Paswoord is verplicht")
		.oneOf([yup.ref("password"), null], "Paswoord komt niet overeen"),
});

const Settings = ({ userMetadata, id }: Props) => {
	const { supabase } = useSupabase();

	// Update user name
	const {
		register: registerName,
		handleSubmit: handleSubmitName,
		watch: watchName,
		formState: { errors: nameErrors },
	} = useForm({ resolver: yupResolver(NameSchema) });

	const firstName = watchName("firstName");
	const lastName = watchName("lastName");
	const nameIsDifferent =
		firstName !== userMetadata.firstName || lastName !== userMetadata.lastName;
	const [nameIsUpdated, setNameIsUpdated] = useState("");

	const onSubmitName = async (names: any) => {
		const { error } = await supabase.auth.updateUser({
			data: { firstName: names.firstName, lastName: names.lastName },
		});

		if (error) {
			setNameIsUpdated("Er is iets misgelopen bij het updaten van je naam, probeer het opnieuw");
		} else {
			setNameIsUpdated("Je naam is succesvol geüpdatet");
		}
	};

	// Update user password
	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		reset,
		watch: watchPassword,
		formState: { errors: passwordErrors },
	} = useForm({ resolver: yupResolver(PasswordSchema) });

	const password = watchPassword("password");
	const validatePassword = watchPassword("validatePassword");
	const passwordIsNotEmpty = password !== "" && validatePassword !== "";
	const [passwordIsUpdated, setPasswordIsUpdated] = useState("");

	const onSubmitPassword = async (passwords: any) => {
		const { error, data } = await supabase.auth.updateUser({ password: passwords.password });

		if (error) {
			setPasswordIsUpdated(
				"Er is iets misgelopen bij het updaten van je naam, probeer het opnieuw"
			);
		} else {
			setPasswordIsUpdated("Je paswoord is succesvol geüpdatet");
			reset();
		}

		console.log(passwordIsUpdated);
	};

	const handleDeleteUserAccount = async () => {
		const { data, error } = await supabase.auth.admin.deleteUser(id);

		if (data) {
			console.log("User deleted");
		} else {
			console.log(error);
		}
	};

	return (
		<div className={`my-8 w-1/2`}>
			<Setting
				blockTitle="Wijzig je naam"
				divisionLine={true}
				handleSubmit={handleSubmitName}
				onSubmit={onSubmitName}
				register={registerName}
				nameIsUpdated={nameIsUpdated}>
				<div className={`flex gap-3 mb-3`}>
					<Input
						register={registerName}
						name="firstName"
						label="Voornaam"
						error={nameErrors.firstName?.message}
						defaultValue={userMetadata.firstName}
					/>
					<Input
						register={registerName}
						name="lastName"
						label="Achternaam"
						error={nameErrors.lastName?.message}
						defaultValue={userMetadata.lastName}
					/>
					<Button label="Opslaan" size="sm" style={nameIsDifferent ? "secondary" : "disabled"} />
				</div>
			</Setting>
			<Setting
				blockTitle="Wijzig je paswoord"
				divisionLine={true}
				handleSubmit={handleSubmitPassword}
				onSubmit={onSubmitPassword}
				register={registerPassword}
				passwordIsUpdated={passwordIsUpdated}>
				<div className={`flex gap-3 mb-3`}>
					<Input
						register={registerPassword}
						name="password"
						type="password"
						label="Nieuw paswoord"
						error={passwordErrors.password?.message}
					/>
					<Input
						register={registerPassword}
						name="validatePassword"
						type="password"
						label="Bevestig paswoord"
						error={passwordErrors.validatePassword?.message}
					/>
					<Button label="Wijzig" size="sm" style={passwordIsNotEmpty ? "secondary" : "disabled"} />
				</div>
			</Setting>
			<div>
				<H2 className={`mb-4`}>Verwijder account</H2>
				<p className={`not-italic mb-4`}>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et
				</p>
				<Button
					style="alert"
					label="Verwijder account"
					icon={<TrashIcon className={`fill-red-900`} />}
					onClick={handleDeleteUserAccount}
				/>
			</div>
		</div>
	);
};

export default Settings;
