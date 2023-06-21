import { useContext } from "react";
import { SelectAvatar } from "@/components/form/SelectAvatar";
import { CustomAvatarForm } from "../CustomAvatarForm";
import { WebContext } from "@/context/WebContext";
import ContactDetails from "./ContactDetails";
import ContactRelation from "./ContactRelation";
import ContactGivenSupport from "./ContactGivenSupport";
import ContactReceivedSupport from "./ContactReceivedSupport";
import ContactFrequency from "./ContactFrequency";
import ContactUploadPicture from "./ContactUploadPicture";
import { FormBlock, FormBlockItem } from "../FormBlock";
import { Button } from "@/components/form/Button";
import { ChevronIcon } from "@/public/icons";

const PersonForm = () => {
	const {
		handlePresetAvatarSubmit,
		activeAvatarPreset,
		editInfoVisible,
		editAvatarWindow,
		setEditAvatarWindow,
	} = useContext(WebContext);

	return (
		<>
			<FormBlock className={`${editInfoVisible !== "Gegevens" && "hidden"}`}>
				<ContactDetails title="Persoon" />
				<ContactRelation
					options={[
						{ value: "Partner", label: "Partner" },
						{ value: "Familie", label: "Familie" },
						{ value: "Kennis", label: "Kennis" },
						{ value: "Vriend", label: "Vriend" },
						{ value: "Collega", label: "Collega" },
						{ value: "Professional", label: "Professional" },
					]}
				/>
				<ContactGivenSupport />
				<ContactReceivedSupport />
				<ContactFrequency />
			</FormBlock>

			<FormBlock className={`${editInfoVisible !== "Afbeelding" && "hidden"}`}>
				<FormBlockItem title="Afbeelding">
					<ContactUploadPicture />
				</FormBlockItem>

				<FormBlockItem title="Avatar">
					<div className="mb-3 flex justify-between">
						<div className={`flex items-center gap-3`}>
							<SelectAvatar
								className={` ${
									activeAvatarPreset === "youngManAvatar" && "outline outline-2 outline-primary-800"
								}`}
								onClick={() => handlePresetAvatarSubmit("youngManAvatar")}
								type="youngManAvatar"
							/>
							<SelectAvatar
								className={` ${
									activeAvatarPreset === "youngWomanAvatar" &&
									"outline outline-2 outline-primary-800"
								}`}
								onClick={() => handlePresetAvatarSubmit("youngWomanAvatar")}
								type="youngWomanAvatar"
							/>
							<SelectAvatar
								className={` ${
									activeAvatarPreset === "middleAgeWomanAvatar" &&
									"outline outline-2 outline-primary-800"
								}`}
								onClick={() => handlePresetAvatarSubmit("middleAgeWomanAvatar")}
								type="middleAgeWomanAvatar"
							/>
							<SelectAvatar
								className={` ${
									activeAvatarPreset === "middleAgeManAvatar" &&
									"outline outline-2 outline-primary-800"
								}`}
								onClick={() => handlePresetAvatarSubmit("middleAgeManAvatar")}
								type="middleAgeManAvatar"
							/>
							<SelectAvatar
								className={` ${
									activeAvatarPreset === "oldManAvatar" && "outline outline-2 outline-primary-800"
								}`}
								onClick={() => handlePresetAvatarSubmit("oldManAvatar")}
								type="oldManAvatar"
							/>
							<SelectAvatar
								className={` ${
									activeAvatarPreset === "oldWomanAvatar" && "outline outline-2 outline-primary-800"
								}`}
								onClick={() => handlePresetAvatarSubmit("oldWomanAvatar")}
								type="oldWomanAvatar"
							/>
						</div>
					</div>
					<CustomAvatarForm />
				</FormBlockItem>
			</FormBlock>
		</>
	);
};

export default PersonForm;
