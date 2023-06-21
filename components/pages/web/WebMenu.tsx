"use client";

import { H2 } from "@/components/Typography";
import { BlockTitle } from "@/components/form/BlockTitle";
import { useContext, useState } from "react";
import { Setting, ValidationMessage } from "../settings/Setting";
import { Input } from "@/components/form/Input";
import { Button } from "@/components/form/Button";
import { useForm } from "react-hook-form";
import { WebContext } from "@/context/WebContext";
import DropdownVersion from "./VersionDropdown";
import { useRouter } from "next/navigation";
import { CopyIcon, FilePlusIcon, FoldersIcon } from "@/public/icons";
import { useSupabase } from "@/app/supabase-provider";
import { CategoryButton } from "@/components/form/CategoryButton";
import { useCopyToClipboard } from "usehooks-ts";
import { motion } from "framer-motion";
import Backdrop from "@/components/Backdrop";
import { IconButton } from "@/components/form/IconButton";

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
		setModalVisible,
		editInfoVisible,
		setEditInfoVisible,
		customAvatar,
		thumbnail,
		validationMessage,
		setValidationMessage,
		setWeb,
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
			const response = await fetch(`/api/sessions/${currentSession.id}/duplicate`, {
				method: "POST",
				body: JSON.stringify({
					web_id: web.id,
					random_id: crypto.randomUUID(),
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

		const response = await fetch(`/api/sessions/${currentSession.id}`, {
			method: "PATCH",
			body: JSON.stringify({
				name: data.name,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
			setValidationMessage(["versionName", "Versie naam gewijzigd"]);
		}
	};

	const handleSubmitWebName = async (data) => {
		const newWebData = {
			...web,
			name: data.name,
		};
		setWeb(newWebData);

		const response = await fetch(`/api/webs/${web.id}`, {
			method: "PATCH",
			body: JSON.stringify(newWebData),
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.status === 201) {
			setValidationMessage(["webName", "Versie naam gewijzigd"]);
		}
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
		setValidationMessage(null);
	};

	const variants = {
		hidden: { x: "100%", transition: { duration: 0.2 } },
		visible: { x: 0, transition: { duration: 0.2 } },
	};

	return (
		<>
			{modalVisible === "menu" && (
				<Backdrop onClick={handleClosingWebMenu}>
					<motion.aside
						variants={variants}
						initial="hidden"
						animate="visible"
						onClick={(e) => e.stopPropagation()}
						exit="exit"
						className={`fixed !top-[0rem] right-0 z-50 flex h-screen w-[90%] flex-col bg-white px-8 py-10 shadow-lg md:w-[35rem] md:px-12 md:py-20 `}>
						<div
							className={`mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-center md:gap-0`}>
							<H2 underline title="Menu" />
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

						{/* Change session name */}
						<section className={`${editInfoVisible !== "Versie" && "hidden"}`}>
							<Setting
								handleSubmit={handleVersionNameSubmit}
								onSubmit={handleSubmitVersionName}
								register={registerVersionName}
								validationMessage={validationMessage}>
								<div className={`mb-5 flex items-center justify-between`}>
									<BlockTitle className={`!mb-0`} title="Wijzig je versie naam" />
									{validationMessage && validationMessage[0] === "versionName" && (
										<ValidationMessage message={validationMessage[1]} />
									)}
								</div>

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

								{/* Change session view */}
								<BlockTitle className={`mb-3 md:mb-5`} title="Versie overzicht" />
								<DropdownVersion
									selectedOption={selectedOption}
									setSelectedOption={setSelectedOption}
									handleSessionChange={handleSessionChange}
									className={`mb-3 w-full`}
									name="session"
									placeholder={getSession(currentSession)}
									options={sessions.map((session) => ({
										id: session.id,
										value: session.session,
										label: getSession(session),
									}))}
								/>
							</Setting>

							{/* Create new session */}
							<div className={`flex items-center gap-2`}>
								<FilePlusIcon className={`h-5 w-5 fill-primary-700`} />
								<Button
									onClick={handleNewSession}
									label="Start een nieuwe blanco versie (blanco)"
									size="xs"
									style="link"
									className={`!px-0 !py-0`}
								/>
							</div>

							{/* Duplicate session */}
							<div className={`flex items-center gap-2`}>
								<FoldersIcon className={`h-5 w-5 fill-primary-700`} />
								<Button
									onClick={handleDuplicateSession}
									label={`Start een nieuwe versie (werk verder op versie ${currentSession.session})`}
									size="xs"
									style="link"
									className={`!px-0 !py-0`}
								/>
							</div>
						</section>

						{/* Edit web settings */}
						<section className={`${editInfoVisible !== "Mijn Web" && "hidden"}`}>
							<Setting
								className={`${editInfoVisible !== "Mijn Web" && "hidden"}`}
								handleSubmit={handleWebNameSubmit}
								onSubmit={handleSubmitWebName}
								register={registerWebName}>
								<div className={`mb-5 flex items-center justify-between`}>
									<BlockTitle className={`!mb-0`} title="Wijzig je web naam" />
									{validationMessage && validationMessage[0] === "webName" && (
										<ValidationMessage message={validationMessage[1]} />
									)}
								</div>{" "}
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
						</section>

						<section className={`${editInfoVisible !== "Deel" && "hidden"}`}>
							<BlockTitle className={`!mb-0`} title="Deel link" />
							<div className={`mb-3 flex items-end gap-2 md:mb-5`}>
								<span className={`text-sm font-light text-neutral-800`}>
									Kopieer de link om je web te delen
								</span>
								<IconButton
									onClick={() =>
										copy(`${process.env.NEXT_PUBLIC_HOST}/view/${currentSession.share_id}`)
									}
									icon={
										<CopyIcon
											className={`h-4 w-4 fill-neutral-600 transition-colors hover:fill-neutral-700 active:fill-primary-800`}
										/>
									}
								/>
							</div>
							<div className={`flex items-center gap-3`}>
								<Input
									register={registerImage}
									style="primary"
									name="name"
									error={webNameErrors.name?.message}
									value={`${process.env.NEXT_PUBLIC_HOST}/view/${currentSession.share_id}`}
									className={`mb-0 w-full`}
									buttonLabel="Bekjk pagina"
									buttonOnClick={() =>
										router.push(`${process.env.NEXT_PUBLIC_HOST}/view/${currentSession.share_id}`)
									}
								/>
							</div>
						</section>
					</motion.aside>
				</Backdrop>
			)}
		</>
	);
};

export default WebMenu;
