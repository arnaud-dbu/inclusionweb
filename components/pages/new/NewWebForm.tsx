import { Button } from "@/components/form/Button";
import Form from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import { H3 } from "@/components/Typography";
import { SelectAvatar } from "@/components/form/SelectAvatar";
import { CustomAvatarForm } from "../web/CustomAvatarForm";
import { Label } from "@/components/form/Label";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import { UserIcon } from "@/public/icons";

type Props = {
	handleNewWeb: any;
	avatar: any;
	image: any;
	thumbnail: any;
};

const NewWebForm = ({ handleNewWeb, image, avatar, thumbnail }: Props) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();
	const { handleCustomImageChangeUpload, activeAvatarPreset, handlePresetAvatarSubmit, isLoading } =
		useContext(WebContext);

	return (
		<section className={`w-full lg:w-[30rem]`}>
			{/* Thumbnail on small screens */}
			<div className={`absolute right-[1.5rem] top-0 h-[8rem] w-[8rem] md:right-24  lg:hidden`}>
				{thumbnail === "default" && (
					<div className="overflow-hidden rounded-full bg-primary-500">
						<UserIcon className={`h-full w-full`} />
					</div>
				)}
				{thumbnail === "customImage" && (
					<Image
						className="h-[8rem] w-[8rem] rounded-full object-cover shadow-sm"
						alt="profile picture"
						src={image || "/"}
						width={200}
						height={200}
					/>
				)}
				{thumbnail === "avatar" && <AvatarComponent className="h-full w-full" avatar={avatar} />}
			</div>

			<Form
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={handleNewWeb}
				className={`flex flex-col gap-6`}>
				{/* Add name */}
				<div>
					<H3 title="Gegevens" className="mb-5" />
					<Input
						style="tertiary"
						register={register}
						name="name"
						label="Naam"
						error={errors.name?.message}
					/>
				</div>

				{/* Add custom image */}
				<div>
					<div className={`mb-5 flex items-center justify-between`}>
						<H3 title="Afbeelding" />
						<Label
							style="link"
							size="sm"
							title={thumbnail === "image" ? "Foto geselecteerd" : "Upload een foto"}
							className={`file-input-hidden !px-0 ${
								thumbnail === "customImage" && "border-primary-800 bg-primary-300 text-primary-900"
							} `}>
							<input
								{...register("picture")}
								onChange={handleCustomImageChangeUpload}
								className=""
								type="file"
								name="picture"
								accept="image/*"
							/>
						</Label>
					</div>

					{/* Select avatars */}
					<div className="mb-4 flex gap-4">
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngManAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngManAvatar")}
							type="youngManAvatar"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngWomanAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngWomanAvatar")}
							type="youngWomanAvatar"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "middleAgeWomanAvatar" &&
								"outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("middleAgeWomanAvatar")}
							type="middleAgeWomanAvatar"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "middleAgeManAvatar" &&
								"outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("middleAgeManAvatar")}
							type="middleAgeManAvatar"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "oldManAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("oldManAvatar")}
							type="oldManAvatar"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "oldWomanAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("oldWomanAvatar")}
							type="oldWomanAvatar"
						/>
					</div>
					{/* Create custom avatar */}
					<CustomAvatarForm />
				</div>
				<div className={`mt-6 flex gap-3`}>
					<Button label="Start nieuw web" style="primary" loading={isLoading} />
				</div>
			</Form>
		</section>
	);
};

export default NewWebForm;
