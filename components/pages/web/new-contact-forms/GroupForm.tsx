import { useContext } from "react";
import SelectImage from "@/components/form/SelectImage";
import ContactDetails from "./ContactDetails";
import ContactRelation from "./ContactRelation";
import ContactGivenSupport from "./ContactGivenSupport";
import ContactReceivedSupport from "./ContactReceivedSupport";
import ContactFrequency from "./ContactFrequency";
import ContactUploadPicture from "./ContactUploadPicture";
import { WebContext } from "@/context/WebContext";
import { FormBlock, FormBlockItem } from "../FormBlock";
import {
	BooksImage,
	BuildingsImage,
	CookingImage,
	GraduationImage,
	HobbyImage,
	HouseImage,
	KidsImage,
	MedicalImage,
	MountainImage,
	ParkImage,
	PassportImage,
	PetsImage,
	SportsImage,
} from "@/public/images";

const GroupForm = () => {
	const { editInfoVisible, handlePresetImageChangeUpload } = useContext(WebContext);

	return (
		<>
			<FormBlock className={`${editInfoVisible !== "Gegevens" && "hidden"}`}>
				<ContactDetails title="Groep" />
				<ContactRelation
					options={[
						{ value: "Team", label: "Team" },
						{ value: "Club", label: "Club" },
						{ value: "Vereniging", label: "Vereniging" },
						{ value: "Groep", label: "Groep" },
						{ value: "Organisatie", label: "Organisatie" },
						{ value: "Community", label: "Community" },
					]}
				/>
				<ContactGivenSupport />
				<ContactReceivedSupport />
				<ContactFrequency />
			</FormBlock>

			<FormBlock className={`${editInfoVisible !== "Afbeelding" && "hidden"}`}>
				<FormBlockItem title="Foto">
					<ContactUploadPicture />
				</FormBlockItem>

				<FormBlockItem title="Icoon">
					<div className="mb-3 flex justify-between">
						<div className={`flex flex-wrap items-center gap-3`}>
							{[
								PetsImage,
								KidsImage,
								BooksImage,
								CookingImage,
								PassportImage,
								GraduationImage,
								MedicalImage,
								HobbyImage,
								SportsImage,
								HouseImage,
								BuildingsImage,
								ParkImage,
								MountainImage,
							].map((image, index) => (
								<SelectImage
									key={index}
									bg={true}
									image={image}
									onClick={() => handlePresetImageChangeUpload(image)}
								/>
							))}
						</div>
					</div>
				</FormBlockItem>
			</FormBlock>
		</>
	);
};

export default GroupForm;
