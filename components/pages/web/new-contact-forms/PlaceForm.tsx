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
import { HeadingSecondary } from "@/components/Typography";
import ContactDetails from "./ContactDetails";
import ContactRelation from "./ContactRelation";
import ContactGivenSupport from "./ContactGivenSupport";
import ContactReceivedSupport from "./ContactReceivedSupport";
import ContactFrequency from "./ContactFrequency";
import ContactUploadPicture from "./ContactUploadPicture";

const PlaceForm = () => {
	const { setThumbnail, setImageUrl } = useContext(WebContext);

	const handlePresetImageChangeUpload = (image: any) => {
		setImageUrl(image);
		setThumbnail("presetImage");
	};

	return (
		<>
			<FormBlock>
				<HeadingSecondary title="Gegevens" className="mb-4" />
				<ContactDetails title="Plaats" />
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

			<FormBlock>
				<div className={`flex items-center justify-between mb-5`}>
					<HeadingSecondary title="Afbeelding" />
					<ContactUploadPicture />
				</div>
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
			</FormBlock>
		</>
	);
};

export default PlaceForm;
