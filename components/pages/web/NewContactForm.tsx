import { useForm } from "react-hook-form";
import Form from "@/components/form/Form";
import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon } from "@/public/icons";
import { Btn } from "@/components/Buttons";
import { useContext, useEffect } from "react";
import SelectButtons from "@/components/form/SelectButtons";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { useSupabase } from "@/app/supabase-provider";
import { WebContext } from "@/context/WebContext";
import DivisionLine from "@/components/DivisionLine";
import OverFlowContainer from "@/components/OverFlowContainer";
import Image from "next/image";
import PersonForm from "./new-contact-forms/PersonForm";
import GroupForm from "./new-contact-forms/GroupForm";
import AnimalForm from "./new-contact-forms/AnimalForm";
import PlaceForm from "./new-contact-forms/PlaceForm";
import { Button } from "@/components/form/Button";

export const NewContactForm = ({ params }) => {
	const {
		contacts,
		setContacts,
		setModalVisible,
		fetchedWebData,
		type,
		setType,
		selectedImage,
		imageUrl,
		setImageUrl,
		customAvatar,
		thumbnail,
		setThumbnail,
		session,
	} = useContext(WebContext);

	const { register, handleSubmit, reset } = useForm();
	const { supabase } = useSupabase();

	const handleClosingModal = () => {
		setModalVisible(false);
		setThumbnail("avatar");
		setType("person");
		reset();
	};

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const onSubmit = async (data) => {
		const customAvatarString = JSON.stringify(customAvatar);
		const id = crypto.randomUUID();
		const userId = (await supabase.auth.getUser()).data.user.id;
		let imagePath = null;

		try {
			if (thumbnail === "customImage") {
				// Upload image
				const { data: image } = await supabase.storage
					.from("uploads")
					.upload(userId + "/" + crypto.randomUUID(), selectedImage);

				imagePath = image.path;
			}

			if (thumbnail === "presetImage") {
				imagePath = imageUrl;
				imagePath = imagePath.src;
			}

			const body = {
				id: id,
				user_id: userId,
				avatar: thumbnail === "avatar" ? customAvatarString : null,
				image_type: thumbnail,
				image_path: thumbnail === "presetImage" || thumbnail === "customImage" ? imagePath : null,
				type: type,
				name: data.name,
				role: data.role,
				relation: data.relation,
				given_support: data.given_support,
				received_support: data.received_support,
				frequency: data.frequency,
				web_id: fetchedWebData.id,
				session_id: session,
			};

			const response = await fetch("/api/contact", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				const newContact = {
					...body,
					position: {
						x: 0,
						y: 0,
					},
				};
				setModalVisible(false);

				if (contacts.length === 0) {
					setContacts([newContact]);
				} else {
					setContacts([...contacts, newContact]);
				}
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className={`flex items-center justify-between w-full gap-10 px-24`}>
				<div>
					<span className="mb-7 block font-primary text-6xl uppercase font-bold text-neutral-900 gap-5">
						Nieuw contact
					</span>
					<SelectButtons
						name="type"
						options={[
							{ value: "person", label: "Persoon" },
							{ value: "group", label: "Groep" },
							{ value: "place", label: "Plaats" },
							{ value: "animal", label: "Dier" },
						]}
						icons={[
							<PersonIcon
								key={"person"}
								className={`w-6 h-6 fill-neutral-900 ${type === "person" && "fill-white"}`}
							/>,
							<GroupIcon
								key={"group"}
								className={`w-6 h-6 fill-neutral-900 ${type === "group" && "fill-white"}`}
							/>,
							<PlaceIcon
								key={"place"}
								className={`w-6 h-6 fill-neutral-900 ${type === "place" && "fill-white"}`}
							/>,
							<AnimalIcon
								key={"animal"}
								className={`w-6 h-6 fill-neutral-900 ${type === "animal" && "fill-white"}`}
							/>,
						]}
						register={register}
						type={type}
						setType={setType}
					/>
				</div>
				{thumbnail === "presetImage" || thumbnail === "customImage" ? (
					<Image
						className="rounded-full w-32 h-32 object-cover aspect-square "
						alt="test"
						src={imageUrl || "/"}
						width={700}
						height={700}
					/>
				) : (
					<AvatarComponent
						avatar={customAvatar}
						className="bg-primary-500 w-32 h-32 rounded-full object-cover"
					/>
				)}
			</div>
			<DivisionLine />

			<Form
				className={`px-24 flex flex-col`}
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}>
				<OverFlowContainer>
					{}
					{type === "person" && <PersonForm register={register} />}
					{type === "group" && <GroupForm register={register} />}
					{type === "place" && <PlaceForm register={register} />}
					{type === "animal" && <AnimalForm register={register} />}
				</OverFlowContainer>

				<div className="flex gap-3 mt-8 self-end">
					<Button style="outline" label="Annuleer" onClick={handleClosingModal} />
					<Btn primary submit>
						Opslaan
					</Btn>
				</div>
			</Form>
		</>
	);
};
