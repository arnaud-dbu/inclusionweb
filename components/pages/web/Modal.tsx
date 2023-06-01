"use client";

import React, { useContext, useEffect, useState } from "react";
import { NewContactAvatar } from "./NewContactAvatar";
import { NewContactForm } from "./NewContactForm";
import { CustomAvatarForm } from "./CustomAvatarForm";
import { CustomAvatar } from "./CustomAvatar";
import { EditAvatarContext } from "@/context/EditAvatarContext";
import { WebContext } from "@/context/WebContext";

type Props = {
	setShowOnWeb?: any;
};

const Modal = ({ setShowOnWeb }: Props) => {
	const { modalVisible } = useContext(WebContext);
	const { avatarEditWindow } = useContext(EditAvatarContext);

	return (
		modalVisible && (
			<>
				<div className="absolute w-screen h-screen bg-neutral-900 z-50 opacity-30"></div>
				<dialog
					open
					className="relative flex items-center justify-center m-0 absolute-center z-50 rounded-3xl bg-primary-100 py-16 px-0">
					<div className="flex flex-col">
						{/* {avatarEditWindow ? <CustomAvatar /> : <NewContactAvatar />} */}
						{/* <div className="w-[1.5px] h-[50rem] bg-neutral-400"></div> */}
						{avatarEditWindow ? (
							<CustomAvatarForm setShowOnWeb={setShowOnWeb} />
						) : (
							<NewContactForm />
						)}
					</div>
				</dialog>
			</>
		)
	);
};

export default Modal;
