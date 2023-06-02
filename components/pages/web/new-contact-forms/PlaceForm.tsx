import React, { useContext, useState } from "react";
import FormBlock from "../FormBlock";
import FormBlockItem from "../FormBlockItem";
import { Input } from "@/components/form/Input";
import { Dropdown } from "@/components/form/Dropdown";
import { CheckboxButtons } from "@/components/form/CheckboxButtons";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { WebContext } from "@/context/WebContext";
import { Label } from "@/components/form/Label";
import { LadyIllustration, OrganizationIllustration } from "@/public/illustrations";
import SelectImage from "@/components/form/SelectImage";

type Props = {
	register: any;
};

const PlaceForm = ({ register }: Props) => {
	const { setThumbnail, setSelectedImage, setImageUrl } = useContext(WebContext);

	const handlePresetImageChangeUpload = (image: any) => {
		setImageUrl(image);
		setThumbnail("presetImage");
	};

	const handleCustomImageChangeUpload = (e) => {
		setSelectedImage(e.target.files[0]);
		setThumbnail("customImage");
	};

	return (
		<>
			<FormBlock title="Gegevens">
				<FormBlockItem title="Plaats">
					<div className="flex gap-3 w-[30rem]">
						<Input secondary register={register} name="name" label="Naam" />
						<Input secondary register={register} name="role" label="Rol" />
					</div>
				</FormBlockItem>

				<FormBlockItem title="Relatie">
					<Dropdown
						register={register}
						className={`w-[30rem]`}
						name="relation"
						options={[{ label: "Partner" }, { label: "Familie" }, { label: "Buur" }]}
					/>
				</FormBlockItem>

				<FormBlockItem title="Gegeven Steun">
					<CheckboxButtons
						register={register}
						name="given_support"
						options={["Emotioneel", "Gezelligheid", "Praktisch", "Goede Raad"]}
					/>
				</FormBlockItem>

				<FormBlockItem title="Ontvangen Steun">
					<CheckboxButtons
						register={register}
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
						<SelectImage
							image={LadyIllustration}
							onClick={() => handlePresetImageChangeUpload(LadyIllustration)}
						/>
						<SelectImage
							image={OrganizationIllustration}
							onClick={() => handlePresetImageChangeUpload(OrganizationIllustration)}
						/>
					</div>
				</FormBlockItem>

				<FormBlockItem title="Foto">
					<Label
						style="outline"
						size="sm"
						title="Upload een foto"
						className={`file-input-hidden w-full`}>
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

export default PlaceForm;
