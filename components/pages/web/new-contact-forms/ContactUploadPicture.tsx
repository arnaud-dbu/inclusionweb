import { Label } from "@/components/form/Label";
import { WebContext } from "@/context/WebContext";
import React, { useContext } from "react";
import { useFormContext } from "react-hook-form";

const ContactUploadPicture = () => {
	const { setSelectedImage, setThumbnail, thumbnail } = useContext(WebContext);
	const { register } = useFormContext();

	const handleCustomImageChangeUpload = (e) => {
		setSelectedImage(e.target.files[0]);
		setThumbnail("customImage");
	};
	return (
		<Label
			style="link"
			size="sm"
			title={thumbnail === "image" ? "Foto geselecteerd" : "Upload een foto"}
			className={`file-input-hidden !px-0 ${
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
	);
};

export default ContactUploadPicture;
