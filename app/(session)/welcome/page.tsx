import Image from "next/image";
import { H1, P } from "@/components/Typography";
import { OrganizationIllustration } from "@/public/illustrations";
import ButtonLink from "@/components/form/ButtonLink";

const WelcomePage = async () => {
	return (
		<div className="absolute-center flex w-[35rem] flex-col items-center gap-5">
			<Image src={OrganizationIllustration} alt="Logo" width={700} height={700} />
			<div className="flex w-[75%] flex-col items-center">
				<H1 subtitle="Welkom bij" title="Inclusieweb" />
				<P
					className="mb-4 text-center text-xl"
					text="Breng je sociaal netwerk in kaart, ga erover in gesprek en zet versterkende stappen"></P>
			</div>
			<div>
				<ButtonLink
					style="primary"
					href="/new"
					label="Maak je eerste inclusieweb"
					className={`mb-3`}
				/>
				<ButtonLink style="outline" href="/dashboard" label="Ga naar je overzicht" />
			</div>
		</div>
	);
};
export default WelcomePage;
