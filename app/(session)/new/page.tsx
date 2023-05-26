"use client";

import Form from "@/components/form/Form";
import { H1 } from "@/components/Headings";
import { Input } from "@/components/form/Input";
import Web from "@/components/Web";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import AvatarStyle from "@/components/avatar/AvatarStyle";
import { useRouter } from "next/navigation";
import {
	ClothesIcon,
	EditIcon,
	EyeBrowIcon,
	EyeIcon,
	FacialHairIcon,
	GlassesIcon,
	HairColorIcon,
	HairIcon,
	ImageIcon,
	MouthIcon,
	SkinColorIcon,
} from "@/public/icons";
import { EditAvatarContext, EditAvatarProvider } from "@/context/EditAvatarContext";
import Modal from "./components/Modal";

type Props = {};

const NewWebPage = ({}: Props) => {
	const { toggleAvatarEditWindow } = useContext(EditAvatarContext);

	const router = useRouter();
	const { supabase } = useSupabase();

	const { register, handleSubmit } = useForm();
	const [selectedImage, setSelectedImage] = useState<any>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const [avatarStyleVisible, setAvatarStyleVisible] = useState<boolean>(true);
	const [mainMenuVisible, setMainMenuVisible] = useState<boolean>(false);
	const [showOnWeb, setShowOnWeb] = useState<string>("default");

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const onSubmit = async (data: any) => {
		// const userId = (await supabase.auth.getUser()).data.user.id;
		// const id = crypto.randomUUID();
		// if (data.picture[0]) {
		// 	try {
		// 		// Upload image
		// 		const { data: image } = await supabase.storage
		// 			.from("uploads")
		// 			.upload(userId + "/" + crypto.randomUUID(), data.picture[0]);
		// 		// Insert data into the database
		// 		const response = await fetch("/api/webs", {
		// 			method: "POST",
		// 			body: JSON.stringify({
		// 				id: id,
		// 				name: data.name,
		// 				user_id: (await supabase.auth.getUser()).data.user.id,
		// 				image_path: image.path,
		// 			}),
		// 			headers: {
		// 				"Content-Type": "application/json",
		// 			},
		// 		});
		// 		response.status === 201 && router.push(`/web/${id}`);
		// 	} catch (error) {
		// 		console.log(error);
		// 	}
		// } else {
		// 	const response = await fetch("/api/webs", {
		// 		method: "POST",
		// 		body: JSON.stringify({
		// 			id: id,
		// 			name: data.name,
		// 			user_id: (await supabase.auth.getUser()).data.user.id,
		// 			avatar: JSON.stringify({
		// 				topType: topType[0],
		// 				accessoriesType: accesoiresType[0],
		// 				hairColor: hairColor[0],
		// 				facialHairType: facialHair[0],
		// 				clotheType: clothes[0],
		// 				eyeType: eyes[0],
		// 				eyebrowType: eyebrow[0],
		// 				mouthType: mouth[0],
		// 				skinColor: skinColor[0],
		// 			}),
		// 		}),
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 	});
		// 	response.status === 201 && router.push(`/web/${id}`);
		// }
	};

	return (
		<div className="flex items-center w-full justify-center gap-28 absolute top-1/2 -translate-y-1/2">
			<div className={`w-[20rem] `}>
				<H1 className="mb-10" underline>
					Start een nieuw web
				</H1>
				<Form
					btnLabel="Start"
					register={register}
					handleSubmit={handleSubmit}
					onSubmit={onSubmit}
					className={`w-full`}>
					<Input register={register} name="name" label="Naam" spacing="my-4" />
					<div className="flex gap-2">
						<div
							onClick={toggleAvatarEditWindow}
							className={`cursor-pointer w-[47.5%]  text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}>
							<EditIcon className="opacity-80" />

							<span className="text-start text-neutral-800 font-medium">Ontwerp je avatar</span>
						</div>
						<div
							className={`cursor-pointer relative w-[47.5%] text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}>
							<ImageIcon className="opacity-80" />
							<span className="text-start text-neutral-800 font-medium">Upload een foto</span>
							<input
								{...register("picture")}
								onChange={(e) => {
									setSelectedImage(e.target.files[0]);
									setShowOnWeb("image");
								}}
								className="cursor-pointer absolute w-full h-full left-0 opacity-0"
								type="file"
								name="picture"
								accept="image/*"
							/>
						</div>
					</div>
				</Form>
			</div>

			{/* <Web image={imageUrl} className="w-[50rem]" showOnWeb={showOnWeb} /> */}
			<Modal />
		</div>
	);
};

export default NewWebPage;
