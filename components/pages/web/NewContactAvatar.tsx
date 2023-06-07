import { H1, H2 } from "@/components/Typography";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import SelectButtons from "@/components/form/SelectButtons";
import { EditAvatarContext } from "@/context/EditAvatarContext";
import { GroupIcon } from "@/public/icons";
import React, { useContext, useState } from "react";
import { AnimalIcon, PersonIcon, PlaceIcon } from "@/public/icons";
import { useForm } from "react-hook-form";

export const NewContactAvatar = () => {
	const { customAvatar } = useContext(EditAvatarContext);
	const { register, handleSubmit } = useForm();
	const [type, setType] = useState("person");

	return (
		<div className="flex flex-col gap-5 w-[20rem]">
			<AvatarComponent
				avatar={customAvatar}
				className="w-[11rem] h-[11rem] bg-primary-500 rounded-full object-cover"
			/>
			<H1 underline className="mb-0">
				Nieuw contact
			</H1>
			<div>
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
		</div>
	);
};
