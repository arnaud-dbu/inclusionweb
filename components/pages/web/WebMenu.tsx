"use client";

import { HeadingSecondary, P } from "@/components/Typography";
import { BlockTitle } from "@/components/form/BlockTitle";
import { useContext, useState } from "react";
import { Setting } from "../settings/Setting";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { useForm } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import DropdownVersion from "./VersionDropdown";
import { useRouter } from "next/navigation";
import { DuplicateIcon, FilePlusIcon, ImageIcon } from "@/public/icons";
import { CustomAvatarForm } from "./CustomAvatarForm";
import { CustomAvatar } from "./CustomAvatar";
import { Label } from "@/components/form/Label";
import Image from "next/image";
import { useSupabase } from "@/app/supabase-provider";
import { CategoryButton } from "@/components/form/CategoryButton";
import { useCopyToClipboard } from "usehooks-ts";

type Props = {};

const WebMenu = (props: Props) => {
	const {
		web,
		sessions,
		session,
		setSessions,
		currentSession,
		getSession,
		modalVisible,
		imageUrl,
		setModalVisible,
		editInfoVisible,
		setEditInfoVisible,
		customAvatar,
		editAvatarWindow,
		thumbnail,
		setWeb,
		handleCustomImageChangeUpload,
		setEditAvatarWindow,
	} = useContext(WebContext);
	const [selectedOption, setSelectedOption] = useState(null);
	const router = useRouter();
	const { supabase } = useSupabase();
	const [value, copy] = useCopyToClipboard();

	const handleSessionChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		router.push(`/web/${web.id}/${selectedOption.value}`);
		router.refresh();
	};

	const {
		register: registerWebName,
		handleSubmit: handleWebNameSubmit,
		watch: watchWebName,
		formState: { errors: webNameErrors },
		reset: resetWebName,
	} = useForm();

	const {
		register: registerVersionName,
		handleSubmit: handleVersionNameSubmit,
		watch: watchVersionNameName,
		formState: { errors: nameVersionNameErrors },
		reset: resetVersionName,
	} = useForm();

	const {
		register: registerImage,
		handleSubmit: handleImageSubmit,
		watch: watchImageName,
		formState: { errors: nameImageErrors },
		reset: resetImage,
	} = useForm();

	const handleNewSession = async () => {
		const latestSession = sessions.sort((a, b) => b.session - a.session)[0].session;

		try {
			const response = await fetch("/api/sessions", {
				method: "POST",
				body: JSON.stringify({
					id: crypto.randomUUID(),
					session: latestSession + 1,
					web_id: web.id,
					share_id: crypto.randomUUID(),
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 201) {
				router.push(`/web/${web.id}/${latestSession + 1}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleDuplicateSession = async () => {
		const latestSession = sessions.sort((a, b) => b.session - a.session)[0].session;
		const currentSession = sessions.filter((x) => x.session == session)[0];

		try {
			const response = await fetch(`/api/webs/${web.id}/session/duplicate`, {
				method: "POST",
				body: JSON.stringify({
					random_id: crypto.randomUUID(),
					current_session: currentSession.id,
					new_session: latestSession + 1,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.status === 201) {
				router.push(`/web/${web.id}/${latestSession + 1}`);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmitVersionName = async (data) => {
		const newSessions = sessions.map((session) => {
			if (session.id === currentSession.id) {
				return { ...session, name: data.name };
			}
			return session;
		});

		setSessions(newSessions);

		await fetch(`/api/sessions/${currentSession.id}`, {
			method: "PATCH",
			body: JSON.stringify({
				name: data.name,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const handleSubmitWebName = async (data) => {
		const newWebData = {
			...web,
			name: data.name,
		};
		setWeb(newWebData);

		await fetch(`/api/webs/${web.id}`, {
			method: "PATCH",
			body: JSON.stringify(newWebData),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const handleSubmitImage = async (data) => {
		const userId = (await supabase.auth.getUser()).data.user.id;
		let imagePath = null;

		if (thumbnail === "customImage") {
			// Upload image
			const { data: image } = await supabase.storage
				.from("uploads")
				.upload(userId + "/" + crypto.randomUUID(), data.picture[0]);

			imagePath = image.path;
		}

		const newWebData = {
			...web,
			avatar: thumbnail === "avatar" ? customAvatar : null,
			image_path: thumbnail === "customImage" ? imagePath : null,
		};
		setWeb(newWebData);

		await fetch(`/api/webs/${web.id}`, {
			method: "PATCH",
			body: JSON.stringify(newWebData),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	const handleShareSession = async () => {
		try {
			const response = await fetch(`/api/sessions/${currentSession.id}/share`, {
				method: "PATCH",
				body: JSON.stringify({
					share_id: crypto.randomUUID(),
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleClosingWebMenu = () => {
		setModalVisible(null);
		setEditInfoVisible("version");
		resetWebName();
		resetVersionName();
		copy(null);
	};

	return (
		<>
			{modalVisible === "menu" && (
				<>
					<aside
						className={`top-O absolute right-0 z-50 flex h-screen w-[35rem] flex-col bg-white px-12 py-20 shadow-lg `}>
						{/* <IconButton icon={<CrossIcon className={`w-8 h-8 fill-neutral-600`} />} /> */}
						<div className={`mb-10 flex items-center justify-between`}>
							<HeadingSecondary underline title="Menu" />
							<div className="flex gap-2">
								{["Versie", "Mijn Web", "Deel"].map((category) => (
									<CategoryButton
										key={category}
										onClick={() => setEditInfoVisible(category)}
										active={editInfoVisible === category}
										label={category.charAt(0).toUpperCase() + category.slice(1)}
									/>
								))}
							</div>
						</div>

						<Setting
							className={`${editInfoVisible !== "Versie" && "hidden"}`}
							handleSubmit={handleVersionNameSubmit}
							onSubmit={handleSubmitVersionName}
							register={registerVersionName}>
							<BlockTitle className={`mb-5`} title="Wijzig je versie naam" />
							<Input
								style="secondary"
								register={registerVersionName}
								name="name"
								label="Naam"
								error={nameVersionNameErrors.name?.message}
								defaultValue={currentSession.name}
								className={`mb-8 w-full`}
								buttonLabel="Opslaan"
							/>
							<BlockTitle className={`mb-5`} title="Versie overzicht" />
							<DropdownVersion
								selectedOption={selectedOption}
								setSelectedOption={setSelectedOption}
								handleSessionChange={handleSessionChange}
								className={`mb-5 w-full`}
								name="session"
								placeholder={getSession(currentSession)}
								options={sessions.map((session) => ({
									id: session.id,
									value: session.session,
									label: getSession(session),
								}))}
							/>
							<div className={`flex items-center gap-2`}>
								<FilePlusIcon className={`h-5 w-5 fill-primary-700`} />
								<Button
									onClick={handleNewSession}
									label="Start een nieuwe sessie"
									size="xs"
									style="link"
									className={`!px-0 `}
								/>
							</div>
							<div className={`flex items-center gap-2`}>
								<DuplicateIcon className={`h-5 w-5 fill-primary-700`} />
								<Button
									onClick={handleDuplicateSession}
									label="Maak een kopie van de huidige sessie"
									size="xs"
									style="link"
									className={`!px-0`}
								/>
							</div>
						</Setting>

						<Setting
							className={`${editInfoVisible !== "Mijn Web" && "hidden"}`}
							handleSubmit={handleWebNameSubmit}
							onSubmit={handleSubmitWebName}
							register={registerWebName}>
							<BlockTitle className={`mb-5`} title="Wijzig de naam van je inclusiewebweb" />
							<Input
								register={registerWebName}
								style="primary"
								name="name"
								label="Naam"
								error={webNameErrors.name?.message}
								defaultValue={web.name}
								className={`mb-8 w-full`}
								buttonLabel="Opslaan"
							/>
						</Setting>

						<Setting
							className={`${editInfoVisible !== "Mijn Web" && "hidden"}`}
							divisionLine={false}
							handleSubmit={handleImageSubmit}
							onSubmit={handleSubmitImage}
							register={registerImage}>
							<BlockTitle className={`mb-5`} title="Wijzig de afbeelding van je inclusieweb" />
							<div className={`flex flex-col pt-3`}>
								{thumbnail === "customImage" && (
									<Image
										className="mb-4 aspect-square h-[7rem] w-[7rem] rounded-full object-cover"
										alt="test"
										src={imageUrl}
										width={700}
										height={700}
									/>
								)}
								{thumbnail === "avatar" && <CustomAvatar className={`mb-4 h-[7rem] w-[7rem]`} />}
								<Label
									style="link"
									icon={<ImageIcon className={`h-5 w-5 fill-neutral-800`} />}
									size="sm"
									title={thumbnail === "image" ? "Foto geselecteerd" : "Upload een foto"}
									className={`file-input-hidden mb-6 w-fit !px-0 ${
										thumbnail === "customImage" &&
										"border-primary-800 bg-primary-300 text-primary-900"
									} `}>
									<input
										{...registerImage("picture")}
										onChange={handleCustomImageChangeUpload}
										className=""
										type="file"
										name="picture"
										accept="image/*"
									/>
								</Label>
								<CustomAvatarForm className={`w-full`} />
							</div>
							<button>Change</button>
						</Setting>

						<Setting
							className={`${editInfoVisible !== "Deel" && "hidden"}`}
							handleSubmit={handleWebNameSubmit}
							onSubmit={handleSubmitWebName}
							register={registerWebName}>
							<div>
								<BlockTitle
									className={`mb-5`}
									title="Deel link"
									description="Kopieer de link om je web te delen"
								/>
								<span>{value ? "Gekopieerd" : ""}</span>
							</div>
							<div className={`flex items-center gap-2`}>
								<Input
									register={registerImage}
									style="primary"
									name="name"
									error={webNameErrors.name?.message}
									value={`${process.env.NEXT_PUBLIC_HOST}/view/${currentSession.share_id}`}
									className={`mb-0 w-full`}
								/>
								<Button
									onClick={() =>
										copy(`${process.env.NEXT_PUBLIC_HOST}/view/${currentSession.share_id}`)
									}
									label="Kopeer"
									style="secondary"
								/>
							</div>
						</Setting>
					</aside>
					<div
						onClick={handleClosingWebMenu}
						className="absolute z-40 h-full w-full  bg-neutral-600 bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter"></div>
				</>
			)}
		</>
	);
};

export default WebMenu;
