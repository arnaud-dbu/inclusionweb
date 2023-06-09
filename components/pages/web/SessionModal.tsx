import Modal from "@/components/Modal";
import { H1, HeadingPrimary, P } from "@/components/Typography";
import { Button } from "@/components/form/Button";
import { WebContext } from "@/context/WebContext";
import { CrossIcon } from "@/public/icons";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const SessionModal = () => {
	const { modalVisible, setModalVisible, sessions, web, session } = useContext(WebContext);
	const router = useRouter();

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
					current_session: currentSession.session,
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

	return (
		<>
			{modalVisible === "session" && (
				<Modal className={`w-[35rem] px-20 py-12 `}>
					<div className={`relative`}>
						<button onClick={() => setModalVisible(null)}>
							<CrossIcon className={`w-10 h-10 absolute -right-14 -top-5 fill-neutral-800`} />
						</button>
						<HeadingPrimary underline title="Start een nieuwe sessie" className={`mb-8`} />
						<P
							className={`block mb-8`}
							text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil error adipisci facilis dolor saepe voluptatibus minus, magnam iure mollitia odio, rerum id et labore deleniti aut, esse iste ratione voluptatum."
						/>
						<div>
							<Button
								onClick={handleDuplicateSession}
								label="Maak een kopie"
								style="secondary"
								className={`w-full`}
							/>
							<Button
								onClick={handleNewSession}
								label="Begin opnieuw"
								style="outline"
								className={`w-full mt-4`}
							/>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default SessionModal;
