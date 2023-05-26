"use client";

import { useContext } from "react";
import { CustomAvatar } from "../../web/[id]/components/CustomAvatar";
import { CustomAvatarForm } from "../../web/[id]/components/CustomAvatarForm";
import { EditAvatarContext } from "@/context/EditAvatarContext";

const Modal = () => {
	const { avatarEditWindow } = useContext(EditAvatarContext);

	return (
		avatarEditWindow && (
			<>
				<div className="w-screen h-screen bg-neutral-900 absolute z-50 opacity-30"></div>
				<dialog
					open
					className="relative flex items-center justify-center m-0 absolute-center z-50 rounded-3xl px-0 bg-primary-100 pt-[3.5rem] pb-[4rem] w-[65rem]">
					<div className="flex items-center justify-between gap-14 relative mx-20">
						<CustomAvatar />
						<div className="w-[1.5px] h-[50rem] bg-neutral-400"></div>
						<CustomAvatarForm />
					</div>
				</dialog>
			</>
		)
	);
};

export default Modal;
