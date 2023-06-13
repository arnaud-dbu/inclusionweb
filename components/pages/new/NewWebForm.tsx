import { Button } from "@/components/form/Button";
import Form from "@/components/form/Form";
import { Input } from "@/components/form/Input";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import { HeadingPrimary, HeadingSecondary } from "@/components/Typography";
import { Card } from "@/components/Card";
import { SelectAvatar } from "@/components/form/SelectAvatar";
import { CustomAvatarForm } from "../web/CustomAvatarForm";
import { Label } from "@/components/form/Label";
import { useRouter } from "next/navigation";

type Props = {
	handleNewWeb: any;
};

const NewWebForm = ({ handleNewWeb }: Props) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useFormContext();
	const { handleCustomImageChangeUpload, activeAvatarPreset, handlePresetAvatarSubmit, thumbnail } =
		useContext(WebContext);

	return (
		<Card className={`px-20 py-16 w-[40rem]`}>
			<HeadingPrimary underline title="Nieuw web" className="mb-10" />
			<Form
				register={register}
				handleSubmit={handleSubmit}
				onSubmit={handleNewWeb}
				className={`flex flex-col gap-6`}>
				<div>
					<HeadingSecondary title="Gegevens" className="mb-5" />
					<Input
						style="primary"
						register={register}
						name="name"
						label="Naam"
						error={errors.name?.message}
					/>
				</div>

				<div>
					<div className={`flex items-center justify-between mb-5`}>
						<HeadingSecondary title="Afbeelding" />
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

					<div className="flex gap-4 mb-4">
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
				<div>
					<Button label="Start" style="primary" className="w-full mt-4 mb-3" />
					<Button
						type="button"
						onClick={() => router.back()}
						label="Annuleer"
						style="outline"
						className="w-full"
					/>
				</div>
			</Form>
		</Card>
	);
};

export default NewWebForm;
