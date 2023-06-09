import { HeadingPrimary } from "@/components/Typography";
import DivisionLine from "@/components/DivisionLine";
import Link from "next/link";
import { Button } from "@/components/form/Button";
import { FacebookLogo, GoogleLogo } from "@/public/images";
import LoginForm from "@/components/auth/LoginForm";

const LoginPage = async () => {
	return (
		<>
			<HeadingPrimary underline title="Aanmelden" />

			<div className={`w-full`}>
				<Button
					style="outline"
					label="Meld aan met Google"
					className="w-full mb-3"
					image={GoogleLogo}
				/>
				<Button
					style="outline"
					label="Meld aan met Facebook"
					className="w-full"
					image={FacebookLogo}
				/>
			</div>

			<DivisionLine bg="white" text="Of" className={`my-4`} />

			<LoginForm />

			<div className="flex flex-col items-center">
				<Link href="/reset-password" className="link">
					Wachtwoord vergeten?
				</Link>
				<Link href="/register" className="link">
					Ik heb nog geen account
				</Link>
			</div>
		</>
	);
};

export default LoginPage;
