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
import { use, useContext, useEffect } from "react";
import { useSupabase } from "@/app/supabase-provider";
import { WebContext } from "@/context/WebContext";
import PersonForm from "./new-contact-forms/PersonForm";
import GroupForm from "./new-contact-forms/GroupForm";
import AnimalForm from "./new-contact-forms/AnimalForm";
import PlaceForm from "./new-contact-forms/PlaceForm";
import { Button } from "@/components/form/Button";
import NewContactNavigation from "./NewContactNavigation";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import NewContactFormHeader from "./NewContactFormHeader";

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
		currentSession,
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
		setActiveAvatarPreset,
		setEditInfoVisible,
		clickPosition,
	} = useContext(WebContext);

	// validation
	const NewContactSchema = yup.object().shape({
		name: yup.string().required("Naam is verplicht"),
		role: yup.string().nullable(),
		relation: yup.string().nullable(),
		given_support: yup.mixed().nullable(),
		received_support: yup.mixed().nullable(),
		frequency: yup.string().nullable(),
		avatar: yup.object().nullable(),
		image_type: yup.string().nullable(),
		image_path: yup.string().nullable(),
	});

	// Get form methods and registered fields
	const methods = useForm({ resolver: yupResolver(NewContactSchema) });
	const {
		register,
		handleSubmit,
		reset,
		setValue,
		formState: { errors },
	} = methods;

	console.log(errors);

	const { supabase } = useSupabase();

	// When editContact is set, fill in the form with the data of the contact
	useEffect(() => {
		if (editContact) {
			setType(editContact.type);
			setValue("name", editContact.name);
			setValue("role", editContact.role);
			setValue("relation", editContact.relation);

			setValue("given_support", editContact.given_support);
			setValue("received_support", editContact.received_support);
			setSelectedGivenSupport(editContact.given_support);
			setSelectedReceivedSupport(editContact.received_support);
			setValue("frequency", editContact.frequency);
			setValue("avatar", editContact.avatar);
			setValue("image_type", editContact.image_type);
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
			if (editContact.image_type === "presetImage") {
				setImageUrl(editContact.image_path);
				setThumbnail("presetImage");
			}
			if (editContact.image_type === "customImage") {
				setThumbnail("customImage");
				setImageUrl(`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${editContact.image_path}`);
			}
		}
	}, [
		editContact,
		setAccessoriesType,
		setClothes,
		setEyebrow,
		setEyes,
		setFacialHair,
		setHairColor,
		setImageUrl,
		setMouth,
		setSelectedGivenSupport,
		setSelectedReceivedSupport,
		setSkinColor,
		setThumbnail,
		setTopType,
		setType,
		setValue,
	]);

	// Reset states and values when the modal is closed
	const handleClosingModal = () => {
		setModalVisible(null);
		setEditContact(null);
		setThumbnail("default");
		setSelectedGivenSupport([""]);
		setSelectedReceivedSupport([""]);
		setActiveAvatarPreset("null");
		setType("person");
		reset();
	};

	// Create a new contact
	const handleCreateContactSubmit = async (data: any) => {
		const customAvatarString = JSON.stringify(customAvatar);
		const id = crypto.randomUUID();
		const userId = (await supabase.auth.getUser()).data.user.id;
		let imagePath = null;

		try {
			if (thumbnail === "customImage") {
				// Upload image to storage
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
				given_support: data.given_support || [],
				received_support: data.received_support || [],
				frequency: data.frequency,
				visible: clickPosition ? true : false,
				...(clickPosition && { position: clickPosition }),
				web_id: fetchedWebData.id,
				session_id: currentSession.id,
			};

			const response = await fetch("/api/contacts", {
				method: "POST",
				body: JSON.stringify(body),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				const newContact = {
					...body,
					position: clickPosition !== null ? clickPosition : { x: 0, y: 0 },
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

	// Edit existing contact
	const handleEditContactSubmit = async (data: any) => {
		const customAvatarString = JSON.stringify(customAvatar);
		const userId = (await supabase.auth.getUser()).data.user.id;
		let imagePath = null;

		try {
			if (thumbnail === "customImage") {
				// Upload image to storage
				const { data: image } = await supabase.storage
					.from("uploads")
					.upload(userId + "/" + crypto.randomUUID(), selectedImage);

				imagePath = image.path;
			}

			if (thumbnail === "presetImage") {
				imagePath = imageUrl;
			}

			const body = {
				avatar: thumbnail === "avatar" ? customAvatarString : null,
				image_type: thumbnail,
				image_path: thumbnail === "presetImage" || thumbnail === "customImage" ? imagePath : null,
				type: type,
				name: data.name,
				role: data.role,
				relation: data.relation,
				given_support: data.given_support || [],
				received_support: data.received_support || [],
				frequency: data.frequency,
			};

			const response = await fetch(`/api/contacts/${editContact.id}`, {
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
		<FormProvider {...methods}>
			<NewContactFormHeader />
			<NewContactNavigation />

			<Form
				className={`flex flex-col px-6 py-6 md:px-10 lg:px-14`}
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={editContact ? handleEditContactSubmit : handleCreateContactSubmit}>
				{type === "person" && <PersonForm />}
				{type === "group" && <GroupForm />}
				{type === "place" && <PlaceForm />}
				{type === "animal" && <AnimalForm />}

				<div className="absolute right-5 top-1 flex gap-1 md:right-6 lg:bottom-8 lg:right-24 lg:top-auto lg:gap-3">
					<Button type="button" style="outline" label="Sluit" onClick={handleClosingModal} />
					{editContact ? (
						<Button style="primary" label="Wijzigen" />
					) : (
						<Button style="primary" label="Opslaan" />
					)}
				</div>
			</Form>
		</FormProvider>
	);
};
