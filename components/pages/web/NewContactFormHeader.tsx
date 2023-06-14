import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import React, { useContext } from "react";
import ContactThumbnail from "./ContactThumbnail";
import SelectButtons from "@/components/form/SelectButtons";
import { useFormContext } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon, UserIcon } from "@/public/icons";
import { UserImage } from "@/public/images";
import { HeadingPrimary } from "@/components/Typography";

const NewContactFormHeader = () => {
	const { type, setType, imageUrl, customAvatar, thumbnail, editContact } = useContext(WebContext);
	const { register } = useFormContext();

	return (
		<div className={`mb-6 flex items-center justify-between gap-10 px-24`}>
			<div>
				<span className="mb-6 block gap-5 font-primary text-7xl font-bold uppercase text-neutral-900">
					{editContact ? "Contact wijzigen" : "Nieuw contact"}
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
							className={`h-6 w-6 fill-neutral-900 ${type === "person" && "fill-white"}`}
						/>,
						<GroupIcon
							key={"group"}
							className={`h-6 w-6 fill-neutral-900 ${type === "group" && "fill-white"}`}
						/>,
						<PlaceIcon
							key={"place"}
							className={`h-6 w-6 fill-neutral-900 ${type === "place" && "fill-white"}`}
						/>,
						<AnimalIcon
							key={"animal"}
							className={`h-6 w-6 fill-neutral-900 ${type === "animal" && "fill-white"}`}
						/>,
					]}
					register={register}
					type={type}
					setType={setType}
				/>
			</div>

			{thumbnail === "default" && (
				<ContactThumbnail type={type}>
					<Image
						className="aspect-square h-[10rem] w-[10rem] rounded-full object-cover "
						alt="test"
						src={UserImage || "/"}
						width={700}
						height={700}
					/>
				</ContactThumbnail>
			)}

			{thumbnail === "avatar" && (
				<ContactThumbnail type={type}>
					<AvatarComponent
						avatar={customAvatar}
						className="h-[10rem] w-[10rem] rounded-full bg-primary-500 object-cover"
					/>
				</ContactThumbnail>
			)}

			{thumbnail === "presetImage" && (
				<ContactThumbnail type={type} className={`h-[10rem] w-[10rem] bg-primary-300`}>
					<Image
						className="aspect-square p-8"
						alt="test"
						src={imageUrl || "/"}
						width={700}
						height={700}
					/>
				</ContactThumbnail>
			)}

			{thumbnail === "customImage" && (
				<ContactThumbnail type={type}>
					<Image
						className="aspect-square h-[10rem] w-[10rem] rounded-full object-cover "
						alt="test"
						src={imageUrl || "/"}
						width={700}
						height={700}
					/>
				</ContactThumbnail>
			)}
		</div>
	);
};

export default NewContactFormHeader;
