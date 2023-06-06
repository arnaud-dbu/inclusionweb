import { H1 } from "@/components/Headings";
import facebookLogo from "/public/images/facebook.png";
import googleLogo from "/public/images/google.png";
import DivisionLine from "@/components/DivisionLine";
import { Btn } from "@/components/Buttons";
import Checkbox from "@/components/Checkbox";
import Link from "next/link";
import LoginForm from "./LoginForm";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NetworkIllustration } from "@/public/illustrations";
import Image from "next/image";
import { Button } from "@/components/form/Button";
import { FacebookLogo, GoogleLogo } from "@/public/images";
import WebIllustration from "@/app/(session)/new/components/WebIllustration";

const LoginPage = async () => {
	const supabase = createServerComponentSupabaseClient({
		headers,
		cookies,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (user) {
		return redirect("/dashboard");
	}

	return (
		<>
			{/* <WebIllustration
				className={`absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[70rem]`}
			/> */}
			<div
				className={`absolute-center flex items-center gap-[7.5rem] bg-white p-20 rounded-3xl border-2 border-neutral-500 shadow-lg`}>
				<div className={`flex flex-col items-center gap-3 w-[22.5rem]`}>
					<H1 underline>Aanmelden</H1>

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

					<DivisionLine text="Of" />

					<LoginForm />

					<div className="flex flex-col items-center">
						<Link href="/auth/register" className="link">
							Wachtwoord vergeten?
						</Link>
						<Link href="/register" className="link">
							Ik heb al een account
						</Link>
					</div>
				</div>
				{/* <WebIllustration className={`w-[50rem]`} /> */}
			</div>
			{/* <div>
				<Image className={`w-[40rem]`} src={NetworkIllustration} alt="Network" />
			</div> */}
		</>
	);
};

export default LoginPage;
