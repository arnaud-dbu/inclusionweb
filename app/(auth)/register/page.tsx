import { HeadingPrimary } from "@/components/Typography";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

const RegisterPage = async () => {
	return (
		<>
			<HeadingPrimary underline title="Maak een account" />

			<RegisterForm />

			<div className="flex flex-col items-center">
				<Link href="/reset-password" className="link">
					Wachtwoord vergeten?
				</Link>
				<Link href="/login" className="link">
					Ik heb al een account
				</Link>
			</div>
		</>
	);
};

export default RegisterPage;
