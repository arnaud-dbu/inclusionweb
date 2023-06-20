import Modal from "@/components/Modal";
import { H2, P } from "@/components/Typography";
import { Button } from "@/components/form/Button";
import { WebContext } from "@/context/WebContext";
import { CrossIcon } from "@/public/icons";
import { useContext } from "react";

const ValidateModal = () => {
	const { modalVisible, setModalVisible, setIsValid } = useContext(WebContext);

	return (
		<>
			{modalVisible === "validate" && (
				<Modal className={`w-[35rem] px-20 py-12`}>
					<div className={`relative`}>
						<button onClick={() => setModalVisible(null)}>
							<CrossIcon className={`absolute -right-14 -top-5 h-10 w-10 fill-neutral-800`} />
						</button>
						<H2 underline title="Deze actie kan niet ongedaan worden gemaakt." className={`mb-8`} />
						<P className={`mb-8 block`} text="blaalaba" />
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
								className={`mt-4 w-full`}
							/>
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default ValidateModal;
