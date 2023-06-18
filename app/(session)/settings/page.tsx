import Header from "@/components/Header";
import Settings from "@/components/pages/settings/Settings";
import { getUser } from "@/lib/getUser";
import { LadyIllustration } from "@/public/illustrations";
import Image from "next/image";

const SettingsPage = async () => {
	const { user } = await getUser();

	return (
		<>
			<Header title="Instellingen" />
			<div className={`layout-wrapper w-screen overflow-hidden`}>
				<Settings userMetadata={user.user_metadata} id={user.id} />
				<Image
					className={`absolute bottom-0 left-1/2 w-[17.5rem] opacity-20 sm:w-[22.5rem] md:left-[55%] md:w-[40rem] md:opacity-50 lg:w-[42.5rem] lg:opacity-70`}
					alt="woman illustration"
					src={LadyIllustration}
					width={800}
					height={800}
				/>
			</div>
		</>
	);
};

export default SettingsPage;
