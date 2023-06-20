"use client";

import { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSupabase } from "@/app/supabase-provider";
import { useRouter } from "next/navigation";
import { WebContext } from "@/context/WebContext";
import NewWebForm from "@/components/pages/new/NewWebForm";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import WebIllustration from "@/components/pages/new/WebIllustration";
import Header from "@/components/Header";

// validation
const NameSchema = yup.object().shape({
	name: yup.string().required("Vul een naam in"),
});

const NewWebPage = () => {
	// Variable assignments and caching
	const { supabase } = useSupabase();
	const router = useRouter();
	const methods = useForm({ resolver: yupResolver(NameSchema) });
	const { customAvatar, imageUrl, thumbnail, setWebs, webs, isLoading, setIsLoading } =
		useContext(WebContext);

	// Submit new web form
	const handleNewWeb = async (data: any) => {
		setIsLoading(true);
		const userId = (await supabase.auth.getUser()).data.user.id;
		const id = crypto.randomUUID();
		let imagePath = null;

		try {
			// If image exists, upload it to the database
			if (thumbnail === "customImage") {
				const { data: image } = await supabase.storage
					.from("uploads")
					.upload(userId + "/" + crypto.randomUUID(), data.picture[0]);

				imagePath = image.path;
			}

			const newWeb = {
				id: id,
				name: data.name,
				last_opened: new Date().toISOString(),
				user_id: userId,
				image_path: thumbnail === "customImage" ? imagePath : null,
				avatar: thumbnail === "avatar" ? customAvatar : null,
			};

			// Insert data into the database
			const response = await fetch("/api/webs", {
				method: "POST",
				body: JSON.stringify(newWeb),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				router.push(`/web/${id}/1`);
				setWebs([...webs, newWeb]);
				setIsLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<FormProvider {...methods}>
				<Header title="Nieuw web" />
				<div className={`layout-wrapper flex gap-[10rem] md:items-center`}>
					<NewWebForm
						handleNewWeb={handleNewWeb}
						avatar={customAvatar}
						image={imageUrl}
						thumbnail={thumbnail}
					/>
					<WebIllustration
						thumbnail={thumbnail}
						avatar={customAvatar}
						image={imageUrl}
						className="hidden w-[30rem] lg:block lg:opacity-100"
					/>
				</div>
			</FormProvider>
		</>
	);
};

export default NewWebPage;
