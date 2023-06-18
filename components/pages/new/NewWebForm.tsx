import { Button } from "@/components/form/Button";
import Form from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import { H1, H3 } from "@/components/Typography";
import { Card } from "@/components/Card";
import { SelectAvatar } from "@/components/form/SelectAvatar";
import { CustomAvatarForm } from "../web/CustomAvatarForm";
import { Label } from "@/components/form/Label";
import { useRouter } from "next/navigation";
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
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();
	const { handleCustomImageChangeUpload, activeAvatarPreset, handlePresetAvatarSubmit, isLoading } =
		useContext(WebContext);

	return (
		<Card
			// className={`left-1/2 z-30 my-24 w-full px-10 py-12 sm:absolute sm:left-1/2 sm:w-[80%] sm:-translate-x-1/2 lg:absolute lg:top-[50%] lg:my-0 lg:max-w-[40rem] lg:-translate-y-1/2 lg:px-14`}>
			className={`lg:-translate-x-1/ relative left-1/2 z-30 mb-24 mt-28 max-w-[40rem] -translate-x-1/2 px-10 py-8 lg:absolute lg:top-1/2 lg:my-0  lg:w-[40rem] lg:-translate-y-1/2 2xl:!left-[35%] `}>
			<div className={`flex items-center justify-between`}>
				<H1 underline title="Nieuw web" className="mb-10" />
				<div className={`h-[9rem] w-[9rem] rounded-full `}>
					{thumbnail === "default" && (
						<div className="overflow-hidden rounded-full bg-primary-500">
							<UserIcon className={`h-full w-full`} />
						</div>
					)}
					{thumbnail === "customImage" && (
						<Image
							className="rounded-full shadow-sm"
							alt="profile picture"
							src={image || "/"}
							width={200}
							height={200}
						/>
					)}
					{thumbnail === "avatar" && <AvatarComponent className="h-full w-full" avatar={avatar} />}
				</div>
			</div>

			<Form
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={handleNewWeb}
				className={`flex flex-col gap-6`}>
				<div>
					<H3 title="Gegevens" className="mb-5" />
					<Input
						style="primary"
						register={register}
						name="name"
						label="Naam"
						error={errors.name?.message}
					/>
				</div>

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

					<div className="mb-4 flex gap-4">
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngManAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngManAvatar")}
							type="man"
						/>
						<SelectAvatar
							className={` ${
								activeAvatarPreset === "youngWomanAvatar" && "outline outline-2 outline-primary-800"
							}`}
							onClick={() => handlePresetAvatarSubmit("youngWomanAvatar")}
							type="woman"
						/>
					</div>
					<CustomAvatarForm />
				</div>
				<div className={`mt-6 flex flex-col gap-3`}>
					<Button label="Open nieuw web" style="primary" loading={isLoading} />
					<Button
						type="button"
						onClick={() => router.back()}
						label="Ga terug"
						style="outline"
						className=""
					/>
				</div>
			</Form>
		</Card>
	);
};

export default NewWebForm;
