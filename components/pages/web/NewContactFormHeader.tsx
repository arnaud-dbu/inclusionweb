import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import React, { useContext } from "react";
import ContactThumbnail from "./ContactThumbnail";
import SelectButtons from "@/components/form/SelectButtons";
import { useFormContext } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import { AnimalIcon, GroupIcon, PersonIcon, PlaceIcon, UserIcon } from "@/public/icons";
import { UserImage } from "@/public/images";

const NewContactFormHeader = () => {
	const { type, setType, imageUrl, customAvatar, thumbnail, editContact } = useContext(WebContext);
	const { register } = useFormContext();

	const thumbnailStyles = "w-[6rem] h-[6rem] md:w-[8rem]  md:h-[8rem] ";

	return (
		<div
			className={`mb-6 flex flex-col justify-between gap-4 px-6 md:px-10 lg:mb-6 lg:flex-row lg:items-center lg:gap-10 lg:px-14`}>
			<div className={`order-1 lg:-order-1`}>
				<span className="mb-6 block gap-5 font-primary text-5xl font-bold uppercase text-neutral-900 lg:text-6xl">
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
						className={`${thumbnailStyles} aspect-square rounded-full object-cover`}
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
						className={`${thumbnailStyles} rounded-full bg-primary-500 object-cover`}
					/>
				</ContactThumbnail>
			)}

			{thumbnail === "presetImage" && (
				<ContactThumbnail type={type} className={`${thumbnailStyles} bg-primary-300`}>
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
						className={`${thumbnailStyles} aspect-square rounded-full object-cover`}
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
