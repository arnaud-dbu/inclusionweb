import React, { useContext } from "react";
import FormBlock from "../FormBlock";
import FormBlockItem from "../FormBlockItem";
import { Input } from "@/components/form/Input";
import { Dropdown } from "@/components/form/Dropdown";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { SelectAvatar, SelectEditAvatar } from "@/components/form/SelectAvatar";
import { CustomAvatarForm } from "../CustomAvatarForm";
import { Label } from "@/components/form/Label";
import { CheckboxButtons } from "@/components/form/CheckboxButtons";
import { WebContext } from "@/context/WebContext";
import SelectItem from "@/components/form/Select";

type Props = {
	register: any;
};

const PersonForm = ({ register }: Props) => {
	const {
		handlePresetAvatarSubmit,
		activeAvatarPreset,
		editAvatarFormIsVisible,
		setActiveAvatarPreset,
		setEditAvatarFormIsVisible,
		setSelectedImage,
		setThumbnail,
		thumbnail,
	} = useContext(WebContext);

	const handleEditAvatarFormVisibility = () => {
		setActiveAvatarPreset("editAvatar");
		setEditAvatarFormIsVisible(!editAvatarFormIsVisible);
	};

	const handleCustomImageChangeUpload = (e) => {
		setSelectedImage(e.target.files[0]);
		setThumbnail("customImage");
	};

	const handleImageChangeUpload = (e) => {
		setSelectedImage(e.target.files[0]);
		setThumbnail("image");
	};

	return (
		<>
			<FormBlock title="Gegevens">
				<FormBlockItem title="Persoon">
					<div className="flex gap-3 w-[30rem]">
						<Input secondary register={register} name="name" label="Naam" />
						<Input secondary register={register} name="role" label="Rol" />
					</div>
				</FormBlockItem>

				{/* <FormBlockItem title="Relatie">
					<SelectItem
						name="relation"
						options={[
							{ value: "Partner", label: "Partner" },
							{ value: "Familie", label: "Familie" },
							{ value: "Buur", label: "Buur" },
						]}
					/>
				</FormBlockItem> */}

				<FormBlockItem title="Relatie">
					<Dropdown
						className={`w-[30rem]`}
						name="relation"
						options={[
							{ value: "Partner", label: "Partner" },
							{ value: "Familie", label: "Familie" },
							{ value: "Buur", label: "Buur" },
						]}
					/>
				</FormBlockItem>

				<FormBlockItem title="Gegeven Steun">
					<CheckboxButtons
						name="given_support"
						options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
					/>
				</FormBlockItem>

				<FormBlockItem title="Ontvangen Steun">
					<CheckboxButtons
						name="received_support"
						options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
					/>
				</FormBlockItem>

				<FormBlockItem title="Frequentie">
					<RadioButtons
						register={register}
						options={["Nooit", "Dagelijks", "Wekelijks", "Maandelijks", "Jaarlijks"]}
						name="frequency"
					/>
				</FormBlockItem>
			</FormBlock>

			<FormBlock title="Kies afbeelding">
				<FormBlockItem title="Avatar">
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

						<SelectEditAvatar
							className={`${editAvatarFormIsVisible && "bg-primary-500 fill-white border-none"}`}
							onClick={handleEditAvatarFormVisibility}
						/>
					</div>
				</FormBlockItem>

				{editAvatarFormIsVisible && (
					<FormBlockItem>
						<CustomAvatarForm />
					</FormBlockItem>
				)}

				<FormBlockItem title="Foto">
					<Label
						style="outline"
						size="sm"
						title={thumbnail === "customImage" ? "Geselecteerd" : "Upload een afbeelding"}
						className={`file-input-hidden w-full ${
							thumbnail === "customImage" && "border-primary-800 bg-primary-300 text-primary-900"
						} `}>
						<input
							{...register("picture")}
							onChange={handleCustomImageChangeUpload}
							className=""
							type="file"
							name="picture"
							accept="image/*"
						/>
					</Label>
				</FormBlockItem>
			</FormBlock>
		</>
	);
};

export default PersonForm;