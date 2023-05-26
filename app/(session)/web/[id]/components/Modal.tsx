"use client";

import { useContext, useEffect, useState } from "react";
import { NewContactAvatar } from "./NewContactAvatar";
import { NewContactForm } from "./NewContactForm";
import { CustomAvatarForm } from "./CustomAvatarForm";
import { CustomAvatar } from "./CustomAvatar";
import { WebContext } from "@/context/WebContext";
import { EditAvatarContext } from "@/context/EditAvatarContext";

const Modal = () => {
	const { modalVisible } = useContext(WebContext);
	const { avatarEditWindow } = useContext(EditAvatarContext);

	return (
		modalVisible && (
			<>
				<div className="w-screen h-screen bg-neutral-900 relative z-50 opacity-30"></div>
				<dialog
					open
					className="relative flex items-center justify-center m-0 absolute-center z-50 rounded-3xl px-0 bg-primary-100 pt-[3.5rem] pb-[4rem] w-[65rem]">
					<div className="flex items-center justify-between gap-14 relative mx-20">
						{avatarEditWindow ? <CustomAvatar /> : <NewContactAvatar />}
						<div className="w-[1.5px] h-[50rem] bg-neutral-400"></div>
						{avatarEditWindow ? <CustomAvatarForm /> : <NewContactForm />}
					</div>
				</dialog>
			</>
		)
	);
};

export default Modal;
