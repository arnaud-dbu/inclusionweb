import { useContext } from "react";
import { WebContext } from "@/context/WebContext";
import { LadyIllustration, OrganizationIllustration } from "@/public/illustrations";
import SelectImage from "@/components/form/SelectImage";
import { HeadingSecondary } from "@/components/Typography";
import ContactDetails from "./ContactDetails";
import ContactRelation from "./ContactRelation";
import ContactGivenSupport from "./ContactGivenSupport";
import ContactReceivedSupport from "./ContactReceivedSupport";
import ContactFrequency from "./ContactFrequency";
import ContactUploadPicture from "./ContactUploadPicture";
import { FormBlock, FormBlockItem } from "../FormBlock";

const PlaceForm = () => {
	const { setThumbnail, setImageUrl, editInfoVisible } = useContext(WebContext);

	const handlePresetImageChangeUpload = (image: any) => {
		setImageUrl(image);
		setThumbnail("presetImage");
	};

	return (
		<>
			<FormBlock className={`${editInfoVisible !== "Gegevens" && "hidden"}`}>
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

			<FormBlock className={`${editInfoVisible !== "Afbeelding" && "hidden"}`}>
				<div className={`flex items-center justify-between mb-5`}>
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
