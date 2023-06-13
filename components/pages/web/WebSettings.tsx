import { BlockTitle } from "@/components/form/BlockTitle";
import CheckButton from "@/components/form/CheckButton";
import { NonVisibleIcon, PencilIcon, PlusIcon, ShareIcon, VisibleIcon } from "@/public/icons";
import { useContext, useState } from "react";
import { WebContext } from "@/context/WebContext";
import { Button } from "@/components/form/Button";
import DropdownVersion from "@/components/pages/web/VersionDropdown";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { IconButton } from "@/components/form/IconButton";
import WebIllustration from "../new/WebIllustration";
import DivisionLine from "@/components/DivisionLine";

export const WebSettings = () => {
	const {
		namesVisible,
		setNamesVisible,
		avatarSize,
		setAvatarSize,
		session,
		web,
		sessions,
		getSession,
		setModalVisible,
	} = useContext(WebContext);

	const currentSession = sessions.filter((x) => x.session == session)[0];

	const handleAvatarSize = async (size: string) => {
		setAvatarSize(size);

		try {
			const response = await fetch(`/api/webs/${web.id}/images`, {
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
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleNamesVisibility = async (visible: boolean) => {
		setNamesVisible(visible);

		try {
			const response = await fetch(`/api/webs/${web.id}/names`, {
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
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section
			className={`w-full px-20 flex gap-4 justify-center items-center absolute z-50 left-1/2 pt-12 -translate-x-1/2 top-0 `}>
			<div className={`flex gap-12 items-center justify-between w-full`}>
				<div className={`flex items-center gap-3`}>
					<WebIllustration className={`w-8 h-8`} />
					<span
						className={`text-md text-neutral-800 whitespace-nowrap font-semibold`}>{`${getSession(
						currentSession
					)}`}</span>
				</div>
				<DivisionLine className={``} />
				<div className={`flex items-center gap-8`}>
					<div className={`flex gap-2 items-center`}>
						<BlockTitle className="!mb-0 " title="Afbeeldingen" />
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
						<BlockTitle className="!mb-0 " title="Namen" />
						<button className={``} onClick={() => handleNamesVisibility(!namesVisible)}>
							{namesVisible ? (
								<VisibleIcon className={`fill-primary-700`} />
							) : (
								<NonVisibleIcon className={`fill-primary-700`} />
							)}
						</button>
					</div>
				</div>
				<DivisionLine className={``} />
				<Button style="outline" label="Menu" onClick={() => setModalVisible("menu")} />
			</div>
		</section>
	);
};
