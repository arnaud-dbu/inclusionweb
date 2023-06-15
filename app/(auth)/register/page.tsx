import { HeadingPrimary, P } from "@/components/Typography";
import RegisterForm from "@/components/auth/RegisterForm";
import Link from "next/link";

const RegisterPage = async () => {
	return (
		<>
			<div className={`mb-5`}>
				<HeadingPrimary underline title="Maak een account" className={``} />
				<P text="Je kunt dit heel snel en eenvoudig doen" />
			</div>

			<RegisterForm />

			<div className="flex flex-col items-center">
				<Link href="/login" className="link">
					Ik heb al een account
				</Link>
			</div>
		</>
	);
};

export default RegisterPage;
