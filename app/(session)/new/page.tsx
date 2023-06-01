"use client";

import Form from "@/components/form/Form";
import { H1 } from "@/components/Headings";
import { Input } from "@/components/form/Input";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { EditIcon, ImageIcon } from "@/public/icons";
import { EditAvatarContext } from "@/context/EditAvatarContext";
import { Button } from "@/components/form/Button";
import WebIllustration from "@/app/(session)/new/components/WebIllustration";
import Modal from "@/components/pages/web/Modal";

type Props = {};

const NewWebPage = ({}: Props) => {
	const { setEditAvatarWindow, customAvatar, toggleModalVisibility } =
		useContext(EditAvatarContext);
	const router = useRouter();
	const { supabase } = useSupabase();
	const { register, handleSubmit } = useForm();
	const [selectedImage, setSelectedImage] = useState<any>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const [showOnWeb, setShowOnWeb] = useState<string>(null);

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const onSubmit = async (data: any) => {
		const userId = (await supabase.auth.getUser()).data.user.id;
		const id = crypto.randomUUID();
		let imagePath = null;

		try {
			if (data.picture[0]) {
				// Upload image
				const { data: image } = await supabase.storage
					.from("uploads")
					.upload(userId + "/" + crypto.randomUUID(), data.picture[0]);

				imagePath = image.path;
			}

			// Insert data into the database
			const response = await fetch("/api/webs", {
				method: "POST",
				body: JSON.stringify({
					id: id,
					name: data.name,
					user_id: userId,
					image_path: showOnWeb === "image" && imagePath,
					avatar: showOnWeb === "avatar" && customAvatar,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				router.push(`/web/${id}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleModalVisibility = () => {
		toggleModalVisibility();
		setEditAvatarWindow(true);
	};

	return (
		<div className="flex items-center w-full justify-center gap-28 absolute top-1/2 -translate-y-1/2">
			<div className={`w-[20rem] `}>
				<H1 className="mb-10" underline>
					Start een nieuw web
				</H1>
				<Form register={register} handleSubmit={handleSubmit} onSubmit={onSubmit}>
					<Input register={register} name="name" label="Naam" className="mb-4" />
					<div className="flex gap-2">
						<div
							onClick={handleModalVisibility}
							className={`cursor-pointer w-[47.5%] text-neutral-800 border-[1.5px] border-neutral-500 flex flex-col gap-2 justify-center px-5 py-5 rounded-2xl`}>
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
					<Button label="Start" style="primary" className="w-full mt-4" />
				</Form>
			</div>

			<WebIllustration
				image={imageUrl}
				avatar={customAvatar}
				className="w-[50rem]"
				showOnWeb={showOnWeb}
			/>
			<Modal setShowOnWeb={setShowOnWeb} />
		</div>
	);
};

export default NewWebPage;
