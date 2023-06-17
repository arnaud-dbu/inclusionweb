"use client";

import { H3 } from "@/components/Typography";
import { Button } from "@/components/form/Button";
import { Input } from "@/components/form/Input";
import { Setting } from "@/components/pages/settings/Setting";
import { TrashIcon } from "@/public/icons";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { NameSchema, ValidatePasswordSchema } from "@/utils/shemas";

type Props = {
	userMetadata: any;
	id: string;
};

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

	const [nameIsUpdated, setNameIsUpdated] = useState("");

	const [nameIsDifferent, setNameIsDifferent] = useState(false);

	useEffect(() => {
		setNameIsDifferent(firstName !== userMetadata.firstName || lastName !== userMetadata.lastName);
	}, [firstName, lastName, userMetadata.firstName, userMetadata.lastName]);

	const onSubmitName = async (names: any) => {
		const { data, error } = await supabase.auth.updateUser({
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
	} = useForm({ resolver: yupResolver(ValidatePasswordSchema) });

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
	};

	const handleDeleteUserAccount = async () => {
		try {
			await fetch(`/api/users/${id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={`relative z-10 my-4 md:my-8 md:w-2/3 xl:w-1/2`}>
			<Setting
				blockTitle="Wijzig je naam"
				divisionLine={true}
				handleSubmit={handleSubmitName}
				onSubmit={onSubmitName}
				register={registerName}
				nameIsUpdated={nameIsUpdated}
				className={`mb-8 `}>
				<div className={`mb-3 flex flex-col gap-3 space-y-2 md:flex-row md:space-y-0`}>
					<Input
						style="tertiary"
						register={registerName}
						name="firstName"
						label="Voornaam"
						error={nameErrors.firstName?.message}
						defaultValue={userMetadata.firstName}
					/>
					<Input
						style="tertiary"
						register={registerName}
						name="lastName"
						label="Achternaam"
						error={nameErrors.lastName?.message}
						defaultValue={userMetadata.lastName}
					/>
					<Button
						label="Opslaan"
						size="md"
						className={`sm:w-fit`}
						style={nameIsDifferent ? "secondary" : "disabled"}
					/>
				</div>
			</Setting>
			<Setting
				blockTitle="Wijzig je paswoord"
				divisionLine={true}
				handleSubmit={handleSubmitPassword}
				onSubmit={onSubmitPassword}
				register={registerPassword}
				passwordIsUpdated={passwordIsUpdated}
				className={`mb-8`}>
				<div className={`mb-3 flex flex-col gap-3 space-y-2 md:flex-row md:space-y-0`}>
					<Input
						style="tertiary"
						register={registerPassword}
						name="password"
						type="password"
						label="Nieuw paswoord"
						error={passwordErrors.password?.message}
					/>
					<Input
						style="tertiary"
						register={registerPassword}
						name="validatePassword"
						type="password"
						label="Bevestig paswoord"
						error={passwordErrors.validatePassword?.message}
					/>
					<Button
						label="Wijzig"
						className={`sm:w-fit`}
						size="md"
						style={passwordIsNotEmpty ? "secondary" : "disabled"}
					/>
				</div>
			</Setting>
			<div>
				<H3 title="Verwijder account" className={`mb-4`} />
				<p className={`mb-4 not-italic`}>
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
