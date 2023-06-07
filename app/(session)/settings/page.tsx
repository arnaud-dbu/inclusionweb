import Header from "@/components/Header";
import { MainSection } from "@/components/Layouts";
import Settings from "@/components/pages/settings/Settings";
import { getUser } from "@/lib/getUser";
import { LadyIllustration } from "@/public/illustrations";
import Image from "next/image";

const SettingsPage = async () => {
	const { user } = await getUser();

	return (
		<>
			<Header title="Instellingen" />
			<MainSection>
				<Settings userMetadata={user.user_metadata} id={user.id} />
				<Image
					className={`absolute w-[50rem] h-[55rem] bottom-0 right-0`}
					alt="woman illustration"
					src={LadyIllustration}
				/>
			</MainSection>
		</>
	);
};

export default SettingsPage;
