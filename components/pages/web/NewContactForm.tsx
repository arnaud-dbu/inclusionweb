import { useForm } from "react-hook-form";
import Form from "@/components/form/Form";
import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon } from "@/public/icons";
import { Input } from "@/components/form/Input";
import { BlockTitle } from "@/components/form/BlockTitle";
import {
	SelectAvatar,
	SelectEditAvatar,
	SelectImageThumbnail,
} from "@/components/form/SelectAvatar";
import { CheckButtonGroup } from "@/components/form/CheckButtonGroup";
import { Btn } from "@/components/Buttons";
import { RadioButtons } from "@/components/form/RadioButtonGroup";
import { useState, useContext } from "react";
import SelectButtons from "@/components/form/SelectButtons";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { Dropdown } from "@/components/form/Dropdown";
import { useSupabase } from "@/app/supabase-provider";
import { WebContext } from "@/context/WebContext";
import { EditAvatarContext } from "@/context/EditAvatarContext";
import { CustomAvatarForm } from "./CustomAvatarForm";
import { H1, H2 } from "@/components/Headings";
import DivisionLine from "@/components/DivisionLine";
import CheckButton from "@/components/form/CheckButton";
import FormItemContainer from "./FormItemContainer";

export const NewContactForm = () => {
	const { contacts, setContacts } = useContext(WebContext);
	const { register, handleSubmit } = useForm();
	const [type, setType] = useState("person");
	const { supabase } = useSupabase();
	const [contactFormIsVisible, setContactFormIsVisible] = useState(false);
	const [editAvatarFormIsVisible, setEditAvatarFormIsVisible] = useState(true);
	const { setModalVisible, fetchedWebData } = useContext(WebContext);

	const { setEditAvatarWindow, customAvatar, handlePresetAvatarSubmit, activeAvatarPreset } =
		useContext(EditAvatarContext);

	const onSubmit = async (data) => {
		const customAvatarString = JSON.stringify(customAvatar);
		const id = crypto.randomUUID();
		const userId = (await supabase.auth.getUser()).data.user.id;

		const contactObj = {
			id: id,
			user_id: userId,
			avatar: customAvatarString,
			type: data.type,
			name: data.name,
			role: data.role,
			relation: data.relation,
			given_support: data.given_support,
			received_support: data.received_support,
			frequency: data.frequency,
			web_id: fetchedWebData.id,
		};

		const response = await fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify(contactObj),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
			const newContact = {
				...contactObj,
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
	};

	const handleEditAvatarScreen = () => {
		setEditAvatarFormIsVisible(false);
		setContactFormIsVisible(true);
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
					{/* <div className={`flex gap-2`}>
						<CheckButton label="Gegevens" active={true} />
						<CheckButton label="Afbeelding" active={false} />
						<CheckButton label="Extra" active={false} />
					</div> */}
				</div>
				<AvatarComponent
					avatar={customAvatar}
					className="bg-primary-500 w-32 h-32 rounded-full object-cover"
				/>
			</div>
			<DivisionLine />

			<Form
				className={`px-24 h-[35rem] w-[55rem] overflow-y-scroll ${
					contactFormIsVisible && "hidden"
				}`}
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}>
				<div className={`mb-16`}>
					<H2 className={`mb-5 opacity-80`}>Gegevens</H2>
					{/* <FormItemContainer title="Type">
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
					</FormItemContainer> */}

					<FormItemContainer title="Gegevens">
						<div className="flex gap-3 w-[30rem]">
							<Input secondary register={register} name="name" label="Naam" />
							<Input secondary register={register} name="role" label="Rol" />
						</div>
					</FormItemContainer>

					<FormItemContainer title="Relatie">
						<Dropdown
							register={register}
							className={`w-[30rem]`}
							name="relation"
							options={[
								{ value: "partner", label: "Partner" },
								{ value: "family", label: "Familie" },
								{ value: "neighbour", label: "Buur" },
							]}
						/>
					</FormItemContainer>

					<FormItemContainer title="Gegeven Steun">
						<CheckButtonGroup
							register={register}
							name="given_support"
							options={[
								{ value: "emotional", label: "Emotioneel" },
								{ value: "conviviality", label: "Gezelligheid" },
								{ value: "practical", label: "Praktisch" },
								{ value: "advice", label: "Goede Raad" },
							]}
						/>
					</FormItemContainer>

					<FormItemContainer title="Ontvangen Steun">
						<CheckButtonGroup
							register={register}
							name="received_support"
							options={[
								{ value: "emotional", label: "Emotioneel" },
								{ value: "conviviality", label: "Gezelligheid" },
								{ value: "practical", label: "Praktisch" },
								{ value: "advice", label: "Goede Raad" },
							]}
						/>
					</FormItemContainer>

					<FormItemContainer title="Frequentie">
						<RadioButtons
							register={register}
							options={[
								{ value: "never", label: "Nooit" },
								{ value: "daily", label: "Dagelijks" },
								{ value: "weekly", label: "Wekelijks" },
								{ value: "monthly", label: "Maandelijks" },
								{ value: "yearly", label: "Jaarlijks" },
							]}
							name="frequency"
						/>
					</FormItemContainer>
				</div>

				<div>
					<H2 className={`mb-5 opacity-80`}>Afbeelding</H2>
					<FormItemContainer title="Afbeelding">
						<CustomAvatarForm />
					</FormItemContainer>
				</div>

				<div>
					<BlockTitle title="Afbeelding" />
					<div className="flex gap-3">
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngManAvatar" && "outline outline-4 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngManAvatar")}
							type="man"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngWomanAvatar" && "outline outline-4 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngWomanAvatar")}
							type="woman"
						/>
						<SelectEditAvatar onClick={handleEditAvatarScreen} />
						<SelectImageThumbnail />
					</div>
				</div>
				<div className="flex sel gap-3 mt-16">
					<Btn secondary submit>
						Annuleer
					</Btn>
					<Btn primary submit>
						Opslaan
					</Btn>
				</div>
			</Form>
		</>
	);
};
