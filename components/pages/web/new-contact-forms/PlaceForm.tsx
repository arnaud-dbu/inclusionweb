import { useContext } from "react";
import { WebContext } from "@/context/WebContext";
import SelectImage from "@/components/form/SelectImage";
import ContactDetails from "./ContactDetails";
import ContactRelation from "./ContactRelation";
import ContactGivenSupport from "./ContactGivenSupport";
import ContactReceivedSupport from "./ContactReceivedSupport";
import ContactFrequency from "./ContactFrequency";
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
import ContactUploadPicture from "./ContactUploadPicture";

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
						{ value: "Kantoor", label: "Kantoor" },
						{ value: "School", label: "School" },
						{ value: "Universiteit", label: "Universiteit" },
						{ value: "Sportclub", label: "Sportclub" },
						{ value: "Gemeenschapscentrum", label: "Gemeenschapscentrum" },
						{ value: "Evenementenlocatie", label: "Evenementenlocatie" },
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

export default PlaceForm;
