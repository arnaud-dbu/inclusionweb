import HyperLink from "@/components/Hyperlink";
import { H1, P } from "@/components/Typography";
import RegisterForm from "@/components/auth/RegisterForm";

const RegisterPage = async () => {
	return (
		<>
			<div className={`mb-5`}>
				<H1 underline title="Maak een account" className={``} />
				<P text="Je kunt dit heel snel en eenvoudig doen" />
			</div>

			<RegisterForm />

			<div className="mt-2 self-center md:mt-0">
				<HyperLink href="/login" label="Ik heb al een account" />
			</div>
		</>
	);
};

export default RegisterPage;
