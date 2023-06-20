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
			<div className={`layout-wrapper relative h-full w-full lg:static `}>
				<Settings userMetadata={user.user_metadata} id={user.id} />
				<Image
					className={`absolute bottom-0 left-1/2 w-[17.5rem] opacity-20 sm:w-[22.5rem] md:left-[55%] md:opacity-50 xl:opacity-70 2xl:w-[30rem]`}
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
