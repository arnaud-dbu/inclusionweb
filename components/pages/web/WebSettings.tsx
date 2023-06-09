import { BlockTitle } from "@/components/form/BlockTitle";
import CheckButton from "@/components/form/CheckButton";
import { IconButton } from "@/components/form/IconButton";
import { NonVisibleIcon, PlusIcon, ShareIcon, VisibleIcon } from "@/public/icons";
import { useContext, useState } from "react";
import { WebContext } from "@/context/WebContext";
import { Button } from "@/components/form/Button";
import DropdownVersion from "@/components/pages/web/VersionDropdown";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { Session } from "inspector";
import SessionModal from "./SessionModal";

export const WebSettings = () => {
	const {
		namesVisible,
		setNamesVisible,
		avatarSize,
		setAvatarSize,
		session,
		fetchedWebData,
		fetchedSessionsData,
		setModalVisible,
	} = useContext(WebContext);
	const router = useRouter();

	const [selectedOption, setSelectedOption] = useState(null);

	const handleSessionChange = (selectedOption) => {
		setSelectedOption(selectedOption);
		router.push(`/web/${fetchedWebData.id}/${selectedOption.value}`);
		router.refresh();
	};

	const currentSession = fetchedSessionsData.filter((x) => x.session == session)[0];

	const getSession = (session) => {
		const sessionString = session.session.toString();
		const formattedDate = dayjs(currentSession.created_at).format("MM/DD/YYYY");
		return `Versie ${sessionString} - ${formattedDate}`;
	};

	// const handleNewSession = async () => {
	// 	const latestSession = fetchedSessionsData.sort((a, b) => b.session - a.session)[0].session;

	// 	try {
	// 		const response = await fetch("/api/sessions", {
	// 			method: "POST",
	// 			body: JSON.stringify({
	// 				id: crypto.randomUUID(),
	// 				session: latestSession + 1,
	// 				web_id: fetchedWebData.id,
	// 			}),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		if (response.status === 201) {
	// 			router.push(`/web/${fetchedWebData.id}/${latestSession + 1}`);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const handleDuplicateSession = async () => {
	// 	const latestSession = fetchedSessionsData.sort((a, b) => b.session - a.session)[0].session;

	// 	try {
	// 		const response = await fetch(`/api/webs/${fetchedWebData.id}/session/duplicate`, {
	// 			method: "POST",
	// 			body: JSON.stringify({
	// 				random_id: crypto.randomUUID(),
	// 				current_session: currentSession.session,
	// 				new_session: latestSession + 1,
	// 			}),
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 			},
	// 		});
	// 		if (response.status === 201) {
	// 			router.push(`/web/${fetchedWebData.id}/${latestSession + 1}`);
	// 		}
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	const handleAvatarSize = async (size) => {
		try {
			const response = await fetch(`/api/webs/${fetchedWebData.id}/images`, {
				method: "PATCH",
				body: JSON.stringify({
					images_size: size,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				console.log("Avatar size updated");
				setAvatarSize(size);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleNamesVisibility = async (visible) => {
		try {
			const response = await fetch(`/api/webs/${fetchedWebData.id}/names`, {
				method: "PATCH",
				body: JSON.stringify({
					names_visible: visible,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (response.status === 201) {
				console.log("Names visibility updated");
				setNamesVisible(visible);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section
			className={`w-full px-20 flex gap-4 justify-center items-center absolute z-50 left-1/2 pt-12 -translate-x-1/2 top-0 `}>
			<div className={`flex gap-12 items-center`}>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="!mb-0" title="Afbeeldingen" />
					<CheckButton
						onClick={() => handleAvatarSize("small")}
						active={avatarSize === "small"}
						label="Klein"
					/>
					<CheckButton
						onClick={() => handleAvatarSize("large")}
						active={avatarSize === "large"}
						label="Groot"
					/>
				</div>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="!mb-0" title="Namen" />
					<button className={``} onClick={() => handleNamesVisibility(!namesVisible)}>
						{namesVisible ? (
							<VisibleIcon className={`fill-primary-700`} />
						) : (
							<NonVisibleIcon className={`fill-primary-700`} />
						)}
					</button>
				</div>
				<div className={`flex gap-2 items-center`}>
					<BlockTitle className="!mb-0" title="Versie" />
					<DropdownVersion
						selectedOption={selectedOption}
						setSelectedOption={setSelectedOption}
						handleSessionChange={handleSessionChange}
						className={`w-[15rem]`}
						name="session"
						placeholder={getSession(currentSession)}
						options={fetchedSessionsData.map((session) => ({
							value: session.session,
							label: getSession(session),
						}))}
					/>
					<button onClick={() => setModalVisible("session")}>Voeg een versie toe</button>
				</div>
			</div>
			<div className={`ml-auto flex items-center gap-4`}></div>
			<Button style="secondary" label="Deel" icon={<ShareIcon className={`w-5 h-6`} />} />
		</section>
	);
};
