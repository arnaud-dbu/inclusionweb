import { HeadingPrimary } from "@/components/Typography";
import { BlockTitle } from "@/components/form/BlockTitle";
import { useContext, useState } from "react";
import { Setting } from "../settings/Setting";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { useForm } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import DropdownVersion from "./VersionDropdown";
import { useRouter } from "next/navigation";
import { ChevronIcon, DuplicateIcon, FilePlusIcon, ImageIcon, PlusIcon } from "@/public/icons";
import { CustomAvatarForm } from "./CustomAvatarForm";
import { CustomAvatar } from "./CustomAvatar";
import { Label } from "@/components/form/Label";
import Image from "next/image";
import { useSupabase } from "@/app/supabase-provider";

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
	} = useForm();

	const {
		register: registerVersionName,
		handleSubmit: handleVersionNameSubmit,
		watch: watchVersionNameName,
		formState: { errors: nameVersionNameErrors },
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
			name: data.name,
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

	return (
		<>
			{modalVisible === "menu" && (
				<>
					<aside
						className={`top-O absolute right-0 z-50 h-screen w-[30rem] bg-white px-12 py-20 shadow-lg `}>
						{/* <IconButton icon={<CrossIcon className={`w-8 h-8 fill-neutral-600`} />} /> */}
						<HeadingPrimary underline title="Menu" />
						<Setting
							blockTitle="Mijn web"
							divisionLine={true}
							handleSubmit={handleWebNameSubmit}
							onSubmit={handleSubmitWebName}
							register={registerWebName}>
							<div className={`mb-3 flex w-full gap-3`}>
								<Input
									register={registerWebName}
									style="primary"
									name="name"
									label="Naam"
									error={webNameErrors.name?.message}
									defaultValue={web.name}
									className={`!mb-0 w-full`}
								/>
								<Button label="Opslaan" size="sm" style="tertiary" />
							</div>
							<Button
								onClick={() => setEditAvatarWindow(!editAvatarWindow)}
								label="Wijzig afbeelding"
								className={`h-fit !px-0 `}
								style="link"
							/>
							{editAvatarWindow && (
								<div className={`flex flex-col items-start pt-3`}>
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
										style="outline"
										icon={<ImageIcon className={`h-5 w-5 fill-neutral-800`} />}
										size="sm"
										title={thumbnail === "image" ? "Foto geselecteerd" : "Upload een foto"}
										className={`file-input-hidden mb-6 w-full !px-0 ${
											thumbnail === "customImage" &&
											"border-primary-800 bg-primary-300 text-primary-900"
										} `}>
										<input
											{...registerWebName("picture")}
											onChange={handleCustomImageChangeUpload}
											className=""
											type="file"
											name="picture"
											accept="image/*"
										/>
									</Label>
									<CustomAvatarForm className={`w-full`} />
								</div>
							)}
						</Setting>

						<Setting
							blockTitle="Versie"
							handleSubmit={handleVersionNameSubmit}
							onSubmit={handleSubmitVersionName}
							register={registerVersionName}>
							<BlockTitle className={`mb-5`} title="Wijzig je versie naam" />
							<div className={`mb-8 flex w-full gap-3`}>
								<Input
									style="primary"
									register={registerVersionName}
									name="name"
									label="Naam"
									error={nameVersionNameErrors.name?.message}
									defaultValue={currentSession.name}
									className={`w-full`}
								/>
								<Button label="Opslaan" size="sm" style="tertiary" />
							</div>
							<BlockTitle className={`mb-5`} title="Wijzig je versie" />
							<div className={`mb-3 flex gap-3`}>
								<DropdownVersion
									selectedOption={selectedOption}
									setSelectedOption={setSelectedOption}
									handleSessionChange={handleSessionChange}
									className={`w-full`}
									name="session"
									placeholder={getSession(currentSession)}
									options={sessions.map((session) => ({
										id: session.id,
										value: session.session,
										label: getSession(session),
									}))}
								/>
							</div>
							<div className={`flex items-center gap-2`}>
								<FilePlusIcon className={`h-5 w-5 fill-primary-700`} />
								<Button
									onClick={handleNewSession}
									label="Start een nieuwe sessie"
									size="sm"
									style="link"
									className={`!px-0`}
								/>
							</div>
							<div className={`flex items-center gap-2`}>
								<DuplicateIcon className={`h-5 w-5 fill-primary-700`} />
								<Button
									onClick={handleDuplicateSession}
									label="Maak een kopie van huidige sessie"
									size="sm"
									style="link"
									className={`!px-0`}
								/>
							</div>
						</Setting>
						<button onClick={handleShareSession}>Share</button>
						{currentSession?.share_id && <p>{currentSession.share_id}</p>}
					</aside>
					<div
						onClick={() => setModalVisible(null)}
						className="absolute z-40 h-full w-full bg-neutral-900 opacity-40"></div>
				</>
			)}
		</>
	);
};

export default WebMenu;
