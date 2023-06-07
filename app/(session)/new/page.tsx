"use client";

import { useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import WebIllustration from "@/app/(session)/new/components/WebIllustration";
import { WebContext } from "@/context/WebContext";
import Header from "@/components/Header";
import { MainSection } from "@/components/Layouts";
import NewWebForm from "@/components/pages/new/NewWebForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// validation
const NameSchema = yup.object().shape({
	name: yup.string().required("Naam veld is verplicht"),
});

const NewWebPage = () => {
	const router = useRouter();
	const { supabase } = useSupabase();
	const methods = useForm({ resolver: yupResolver(NameSchema) });
	const { customAvatar, selectedImage, setImageUrl, imageUrl, thumbnail } = useContext(WebContext);

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage, setImageUrl]);

	const onSubmit = async (data: any) => {
		const userId = (await supabase.auth.getUser()).data.user.id;
		const id = crypto.randomUUID();
		let imagePath = null;

		try {
			if (imageUrl) {
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
					image_path: thumbnail === "image" ? imagePath : null,
					avatar: thumbnail === "avatar" ? customAvatar : null,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				router.push(`/web/${id}/1`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Header title="Start een nieuw web" />
			<MainSection>
				<FormProvider {...methods}>
					<div className={`flex items-center gap-24 pt-20`}>
						<NewWebForm onSubmit={onSubmit} />
						<WebIllustration
							avatar={customAvatar}
							image={imageUrl}
							thumbnail={thumbnail}
							className="w-[50rem]"
						/>
					</div>
				</FormProvider>
			</MainSection>
		</>
	);
};

export default NewWebPage;
