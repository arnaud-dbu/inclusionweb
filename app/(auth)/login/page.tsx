import { H1, P } from "@/components/Typography";
import DivisionLine from "@/components/DivisionLine";
import { Button } from "@/components/form/Button";
import { FacebookLogo, GoogleLogo } from "@/public/images";
import LoginForm from "@/components/auth/LoginForm";
import HyperLink from "@/components/Hyperlink";

const LoginPage = async () => {
	return (
		<>
			<div className={`mb-5`}>
				<H1 underline subtitle="Welkom bij" title="Inclusieweb" />
				<P text="Voer je inloggegevens in om toegang te krijgen tot het inclusieweb" />
			</div>

			<div className={`w-full`}>
				<Button
					style="outline"
					label="Meld aan met Google"
					className="mb-3 w-full"
					image={GoogleLogo}
				/>
				<Button
					style="outline"
					label="Meld aan met Facebook"
					className="w-full"
					image={FacebookLogo}
				/>
			</div>

			<DivisionLine bg="white" text="Of" className={`my-4 !w-[97%] self-center`} />

			<LoginForm />

			<div className="mt-2 flex flex-col items-center md:mt-0">
				<HyperLink href="/reset-password" label="Wachtwoord vergeten?" />
				<HyperLink href="/register" label="Ik heb nog geen account" />
			</div>
		</>
	);
};

export default LoginPage;
