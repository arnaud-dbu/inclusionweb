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
				<div className={`absolute -right-1/2 bottom-0 z-0`}>
					<Image
						className={`absolute w-[50rem] object-contain opacity-40`}
						alt="woman illustration"
						src={LadyIllustration}
					/>
				</div>
			</div>
		</>
	);
};

export default SettingsPage;
