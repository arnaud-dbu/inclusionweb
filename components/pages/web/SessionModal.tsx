// import Modal from "@/components/Modal";
// import { H1, HeadingPrimary, HeadingSecondary, P } from "@/components/Typography";
// import { Button } from "@/components/form/Button";
// import { WebContext } from "@/context/WebContext";
// import { useRouter } from "next/navigation";
// import React, { useContext } from "react";
// import ValidateModal from "./ValidationModal";
// import { useForm } from "react-hook-form";
// import Form from "@/components/form/Form";
// import { Input } from "@/components/form/Input";

// const SessionModal = () => {
// 	const { modalVisible, setModalVisible, sessions, web, session, setSessions } =
// 		useContext(WebContext);
// 	const {
// 		register,
// 		handleSubmit,
// 		watch,
// 		formState: { errors },
// 	} = useForm();
// 	const router = useRouter();

// 	const currentSession = sessions.filter((s) => s.session == session)[0];

// 	return (
// 		<>
// 			{modalVisible === "editSession" && (
// 				<Modal className={`w-[35rem] px-20 py-12 `}>
// 					<HeadingPrimary underline title="Sessie" className={`mb-8`} />
// 					<HeadingSecondary title="Wijzig naam" className={`mb-5`} />
// 					<Form
// 						register={register}
// 						handleSubmit={handleSubmit}
// 						onSubmit={handleEditSession}
// 						className="w-full">
// 						<div className={`flex gap-2`}>
// 							<Input
// 								bg="white"
// 								name="name"
// 								label="naam"
// 								register={register}
// 								error={errors.email?.message}
// 								className="mb-7 w-full"
// 							/>
// 							<Button label="Bevestig" style="secondary" className={`w-fit`} />
// 						</div>
// 					</Form>

// 					<HeadingSecondary title="Start een nieuwe sessie" className={`mb-5`} />

// 					<P
// 						className={`block mb-8`}
// 						text="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil error adipisci facilis dolor saepe voluptatibus minus."
// 					/>
// 					<div>
// 						<Button
// 							onClick={handleDuplicateSession}
// 							label="Maak een kopie"
// 							style="secondary"
// 							className={`w-full`}
// 						/>
// 						<Button
// 							onClick={handleNewSession}
// 							label="Begin opnieuw"
// 							style="outline"
// 							className={`w-full mt-4`}
// 						/>
// 					</div>
// 				</Modal>
// 			)}
// 			<ValidateModal />
// 		</>
// 	);
// };

// export default SessionModal;
