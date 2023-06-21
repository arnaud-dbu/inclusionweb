import Image from "next/image";
import { H1 } from "@/components/Typography";
import { OrganizationIllustration } from "@/public/illustrations";
import { Button } from "@/components/form/Button";
import Link from "next/link";

const NotFoundPage = () => {
	return (
		<div className="absolute-center flex w-[35rem] flex-col items-center gap-5">
			<Image src={OrganizationIllustration} alt="Logo" width={500} height={500} />
			<div className="flex w-[75%] flex-col items-center">
				<H1 underline subtitle="Oeps..." title="pagina niet gevonden" />
			</div>
			<div>
				<Link href="/dashboard">
					<Button style="primary" label="Ga terug naar je overzicht" className={`mb-3`} />
				</Link>
			</div>
		</div>
	);
};
export default NotFoundPage;
