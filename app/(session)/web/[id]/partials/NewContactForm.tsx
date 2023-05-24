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
import { useState } from "react";
import SelectButtons from "@/components/form/SelectButtons";
import { Dropdown } from "@/components/form/Dropdown";
import { useSupabase } from "@/app/supabase-provider";

type Props = {
	setModalVisible: any;
	setEditAvatarWindow: any;
	handlePresetAvatarSubmit: any;
	handleEditAvatarWindow: any;
	activeAvatarPreset: any;
	customAvatar: any;
};

export const NewContactForm = ({
	activeAvatarPreset,
	setModalVisible,
	handlePresetAvatarSubmit,
	setEditAvatarWindow,
	customAvatar,
}: Props) => {
	const { register, handleSubmit } = useForm();
	const [type, setType] = useState("person");
	const { supabase } = useSupabase();

	const handleEditAvatar = () => {
		setEditAvatarWindow(true);
	};

	const onSubmit = async (data) => {
		const customAvatarString = JSON.stringify(customAvatar);
		const userId = (await supabase.auth.getUser()).data.user.id;
		const id = crypto.randomUUID();

		const response = await fetch("/api/contact", {
			method: "POST",
			body: JSON.stringify({
				id: id,
				user_id: (await supabase.auth.getUser()).data.user.id,
				avatar: customAvatarString,
				type: data.type,
				name: data.name,
				role: data.role,
				relation: data.relation,
				given_support: data.given_support,
				received_support: data.received_support,
				frequency: data.frequency,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
			setModalVisible(false);
		}
	};

	return (
		<Form
			className="flex flex-col gap-4"
			register={register}
			handleSubmit={handleSubmit}
			onSubmit={onSubmit}>
			<div>
				<BlockTitle title="Type" />
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
			<div>
				<BlockTitle title="Gegevens" />
				<div className="flex gap-3">
					<Input secondary register={register} name="name" label="Naam" />
					<Input secondary register={register} name="role" label="Rol" />
				</div>
			</div>
			<div>
				<BlockTitle title="Relatie" />
				<Dropdown
					register={register}
					name="relation"
					options={[
						{ value: "partner", label: "Partner" },
						{ value: "family", label: "Familie" },
						{ value: "neighbour", label: "Buur" },
					]}
				/>
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
					<SelectEditAvatar onClick={handleEditAvatar} />
					<SelectImageThumbnail />
				</div>
			</div>
			<div>
				<BlockTitle title="Gegeven Steun" />
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
			</div>
			<div>
				<BlockTitle title="Ontvangen Steun" />
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
			</div>
			<div className="">
				<BlockTitle title="Frequentie" />
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
	);
};
