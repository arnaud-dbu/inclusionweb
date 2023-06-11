import { useContext } from "react";
import { SelectAvatar } from "@/components/form/SelectAvatar";
import { CustomAvatarForm } from "../CustomAvatarForm";
import { WebContext } from "@/context/WebContext";
import { HeadingSecondary } from "@/components/Typography";
import ContactDetails from "./ContactDetails";
import ContactRelation from "./ContactRelation";
import ContactGivenSupport from "./ContactGivenSupport";
import ContactReceivedSupport from "./ContactReceivedSupport";
import ContactFrequency from "./ContactFrequency";
import ContactUploadPicture from "./ContactUploadPicture";
import { FormBlock, FormBlockItem } from "../FormBlock";

const PersonForm = () => {
	const { handlePresetAvatarSubmit, activeAvatarPreset, editInfoVisible } = useContext(WebContext);

	return (
		<>
			<FormBlock className={`${editInfoVisible !== "Gegevens" && "hidden"}`}>
				<ContactDetails title="Persoon" />
				<ContactRelation
					options={[
						{ value: "Partner", label: "Partner" },
						{ value: "Familie", label: "Familie" },
						{ value: "Buur", label: "Buur" },
					]}
				/>
				<ContactGivenSupport />
				<ContactReceivedSupport />
				<ContactFrequency />
			</FormBlock>

			<FormBlock className={`${editInfoVisible !== "Afbeelding" && "hidden"}`}>
				<div className={`flex items-center justify-between mb-5`}>
					<ContactUploadPicture />
				</div>
				<FormBlockItem>
					<div className="flex gap-4">
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngManAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngManAvatar")}
							type="man"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngWomanAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngWomanAvatar")}
							type="woman"
						/>
					</div>
				</FormBlockItem>

				<FormBlockItem>
					<CustomAvatarForm />
				</FormBlockItem>
			</FormBlock>
		</>
	);
};

export default PersonForm;
