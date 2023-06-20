import { BlockTitle } from "@/components/form/BlockTitle";
import CheckButton from "@/components/form/CheckButton";
import { NonVisibleIcon, UserCircleIcon, VisibleIcon } from "@/public/icons";
import { useContext } from "react";
import { WebContext } from "@/context/WebContext";
import { Button } from "@/components/form/Button";
import WebIllustration from "../new/WebIllustration";
import DivisionLine from "@/components/DivisionLine";
import { IconButton } from "@/components/form/IconButton";

export const WebSettings = ({ shareView }) => {
	const {
		namesVisible,
		setNamesVisible,
		setEditInfoVisible,
		avatarSize,
		setAvatarSize,
		session,
		web,
		sessions,
		getSession,
		setModalVisible,
		setThumbnail,
	} = useContext(WebContext);

	const currentSession = sessions.filter((x) => x.session == session)[0];

	const handleAvatarSize = async (size: string) => {
		setAvatarSize(size);

		try {
			const response = await fetch(`/api/webs/${web.id}`, {
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
			const response = await fetch(`/api/webs/${web.id}`, {
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

	const handleOpenWebMenu = () => {
		setEditInfoVisible("Versie");

		setModalVisible("menu");
		if (web.image_path) {
			setThumbnail("customImage");
		} else {
			setThumbnail("avatar");
		}
	};

	return (
		<div
			className={`relative left-1/2 flex max-w-[95%] -translate-x-1/2 items-center justify-between gap-3 px-2 py-2 lg:py-10 2xl:gap-6`}>
			<div className={`flex items-center gap-3`}>
				<WebIllustration className={`h-8 w-8`} />
				<span className={`text-md whitespace-nowrap font-medium text-neutral-800`}>{`${getSession(
					currentSession
				)}`}</span>
			</div>
			<DivisionLine className={`hidden xl:block xl:opacity-100`} />

			<div className={`flex items-center gap-4 xl:gap-6`}>
				<div className={`hidden items-center gap-2 xl:pointer-events-auto xl:flex xl:opacity-100`}>
					<BlockTitle className="!mb-0 !font-medium " title="Afbeeldingen" />
					<div className={`flex items-center gap-1`}>
						<IconButton
							onClick={() => handleAvatarSize("small")}
							icon={
								<UserCircleIcon
									className={`h-7 w-7 ${
										avatarSize === "small" ? "fill-primary-700" : "fill-neutral-600"
									}`}
								/>
							}
						/>
						<IconButton
							onClick={() => handleAvatarSize("large")}
							icon={
								<UserCircleIcon
									className={`h-9 w-9 ${
										avatarSize === "large" ? "fill-primary-700" : "fill-neutral-600"
									}`}
								/>
							}
						/>
					</div>
				</div>
				<div className={`hidden items-center gap-2 xl:pointer-events-auto xl:flex xl:opacity-100`}>
					<BlockTitle className="!mb-0 !font-medium" title="Namen" />
					<button className={``} onClick={() => handleNamesVisibility(!namesVisible)}>
						{namesVisible ? (
							<VisibleIcon className={`fill-primary-700`} />
						) : (
							<NonVisibleIcon className={`fill-primary-700`} />
						)}
					</button>
				</div>
				{!shareView && (
					<Button style="outline" label="Menu" size="sm" onClick={handleOpenWebMenu} />
				)}
			</div>
		</div>
	);
};
