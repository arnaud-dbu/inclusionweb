import {
	accessoriesTypes,
	clothesTypes,
	eyeTypes,
	eyebrowTypes,
	facialHairTypes,
	hairColors,
	mouthTypes,
	skinColors,
	topTypes,
} from "@/lib/avatarPresets";
import { useForm, FormProvider } from "react-hook-form";
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

export const NewContactForm = () => {
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
		setEditContact,
		session,
		editContact,
		setSelectedGivenSupport,
		setSelectedReceivedSupport,
		setTopType,
		setSkinColor,
		setAccessoriesType,
		setHairColor,
		setFacialHair,
		setClothes,
		setEyes,
		setEyebrow,
		setMouth,
		handlePresetAvatarSubmit,
	} = useContext(WebContext);

	const methods = useForm();
	const { register, handleSubmit, reset, setValue } = methods;
	const { supabase } = useSupabase();

	useEffect(() => {
		if (editContact) {
			setType(editContact.type);
			setValue("name", editContact.name);
			setValue("role", editContact.role);
			setValue("relation", editContact.relation);
			console.log(editContact.relation);

			setValue("given_support", editContact.given_support);
			setValue("received_support", editContact.received_support);
			setSelectedGivenSupport(editContact.given_support);

			setSelectedReceivedSupport(editContact.received_support);
			setValue("frequency", editContact.frequency);
			setValue("avatar", editContact.avatar);
			setValue("image_path", editContact.image_path);

			if (editContact.avatar) {
				setThumbnail("avatar");
				const avatarStyle = JSON.parse(editContact.avatar);
				setTopType([avatarStyle.topType, ...topTypes.slice(1)]);
				setSkinColor([avatarStyle.skinColor, ...skinColors.slice(1)]);
				setAccessoriesType([avatarStyle.accessoriesType, ...accessoriesTypes.slice(1)]);
				setHairColor([avatarStyle.hairColor, ...hairColors.slice(1)]);
				setFacialHair([avatarStyle.facialHairType, ...facialHairTypes.slice(1)]);
				setClothes([avatarStyle.clotheType, ...clothesTypes.slice(1)]);
				setEyes([avatarStyle.eyeType, ...eyeTypes.slice(1)]);
				setEyebrow([avatarStyle.eyebrowType, ...eyebrowTypes.slice(1)]);
				setMouth([avatarStyle.mouthType, ...mouthTypes.slice(1)]);
			}

			if (editContact.image_path) {
				setThumbnail("presetImage");
				setImageUrl(`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${editContact.image_path}`);
			}
		}
	}, []);

	const handleClosingModal = () => {
		setModalVisible(false);
		setEditContact(null);
		setThumbnail("avatar");
		setSelectedGivenSupport([""]);
		setSelectedReceivedSupport([""]);
		handlePresetAvatarSubmit("youngManAvatar");
		setType("person");
		reset();
	};

	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage));
		}
	}, [selectedImage]);

	const handleCreateContactSubmit = async (data) => {
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

	const handleEditContactSubmit = async (data) => {
		const customAvatarString = JSON.stringify(customAvatar);
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
			};

			const response = await fetch(`/api/contact/${editContact.id}`, {
				method: "PUT",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 200) {
				const newContact = {
					...editContact,
					...body,
				};
				setModalVisible(false);
				setEditContact(null);
				setContacts(
					contacts.map((contact) => (contact.id === editContact.id ? newContact : contact))
				);
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

			<FormProvider {...methods}>
				<Form
					className={`px-24 flex flex-col`}
					register={register}
					handleSubmit={handleSubmit}
					onSubmit={editContact ? handleEditContactSubmit : handleCreateContactSubmit}>
					<OverFlowContainer>
						{}
						{type === "person" && <PersonForm register={register} />}
						{type === "group" && <GroupForm register={register} />}
						{type === "place" && <PlaceForm register={register} />}
						{type === "animal" && <AnimalForm register={register} />}
					</OverFlowContainer>

					<div className="flex gap-3 mt-8 self-end">
						<Button style="outline" label="Annuleer" onClick={handleClosingModal} />
						{editContact ? (
							<Button style="primary" label="Wijzigen" />
						) : (
							<Button style="primary" label="Opslaan" />
						)}
					</div>
				</Form>
			</FormProvider>
		</>
	);
};
