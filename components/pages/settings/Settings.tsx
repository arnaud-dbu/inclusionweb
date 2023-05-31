"use client";

import { H2 } from "@/components/Headings";
import { Button } from "@/components/form/Button";
import { ButtonLink } from "@/components/form/ButtonLink";
import { Input } from "@/components/form/Input";
import { Setting } from "@/components/pages/settings/Setting";
import { TrashIcon } from "@/public/icons";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";

type Props = {
	userMetadata: any;
	id: string;
};

const Settings = ({ userMetadata, id }: Props) => {
	const { register: registerName, handleSubmit: handleSubmitName, watch: watchName } = useForm();
	const {
		register: registerPassword,
		handleSubmit: handleSubmitPassword,
		reset,
		watch: watchPassword,
	} = useForm();
	const { supabase } = useSupabase();
	const router = useRouter();

	const firstName = watchName("firstName");
	const lastName = watchName("lastName");
	const nameIsDifferent =
		firstName !== userMetadata.firstName || lastName !== userMetadata.lastName;

	const password = watchPassword("password");
	const validatePassword = watchPassword("validate_password");
	const passwordIsNotEmpty = password !== "" && validatePassword !== "";

	const onSubmitName = async (names: any) => {
		await supabase.auth.updateUser({
			data: { firstName: names.firstName, lastName: names.lastName },
		});
	};

	const onSubmitPassword = async (passwords: any) => {
		if (passwords.password !== passwords.validate_password) {
			return;
		}

		const { data } = await supabase.auth.updateUser({ password: passwords.password });
		data && reset();
	};

	const handleDeleteUserAccount = async () => {
		const { data, error } = await supabase.auth.admin.deleteUser(id);

		if (data) {
			console.log("User deleted");
			// router.push("/register");
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
				register={registerName}>
				<div className={`flex gap-3 mb-3`}>
					<Input
						register={registerName}
						name="firstName"
						label="Voornaam"
						defaultValue={userMetadata.firstName}
					/>
					<Input
						register={registerName}
						name="lastName"
						label="Achternaam"
						defaultValue={userMetadata.lastName}
					/>
				</div>
				<Button label="Opslaan" style="secondary" size="sm" active={nameIsDifferent} />
			</Setting>
			<Setting
				blockTitle="Wijzig je paswoord"
				divisionLine={true}
				handleSubmit={handleSubmitPassword}
				onSubmit={onSubmitPassword}
				register={registerPassword}>
				<div className={`flex gap-3 mb-3`}>
					<Input
						register={registerPassword}
						name="password"
						type="password"
						label="Huidig paswoord"
					/>
					<Input
						register={registerPassword}
						name="validate_password"
						type="password"
						label="Nieuw paswoord"
					/>
				</div>
				<Button label="Wijzig" style="secondary" size="sm" active={passwordIsNotEmpty} />
			</Setting>
			<div>
				<H2 className={`mb-4`}>Verwijder account</H2>
				<p className={`not-italic mb-4`}>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
					invidunt ut labore et
				</p>
				<ButtonLink
					label="Ik wil mijn account verwijderen"
					icon={<TrashIcon className={`fill-red`} />}
					color="red"
					fontWidth="semibold"
					onClick={handleDeleteUserAccount}
				/>
			</div>
		</div>
	);
};

export default Settings;
