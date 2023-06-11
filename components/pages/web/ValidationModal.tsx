import Modal from "@/components/Modal";
import { H1, HeadingPrimary, HeadingSecondary, P } from "@/components/Typography";
import { Button } from "@/components/form/Button";
import { WebContext } from "@/context/WebContext";
import { CrossIcon } from "@/public/icons";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const ValidateModal = () => {
	const { modalVisible, setModalVisible, setIsValid } = useContext(WebContext);

	return (
		<>
			{modalVisible === "validate" && (
				<Modal className={`w-[35rem] px-20 py-12`}>
					<div className={`relative`}>
						<button onClick={() => setModalVisible(null)}>
							<CrossIcon className={`w-10 h-10 absolute -right-14 -top-5 fill-neutral-800`} />
						</button>
						<HeadingSecondary
							underline
							title="Deze actie kan niet ongedaan worden gemaakt."
							className={`mb-8`}
						/>
						<P className={`block mb-8`} text="blaalaba" />
						<div>
							<Button
								onClick={() => setIsValid(true)}
								label="Ja"
								style="secondary"
								className={`w-full`}
							/>
							<Button
								onClick={() => setModalVisible(null)}
								label="Neen"
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

export default ValidateModal;
