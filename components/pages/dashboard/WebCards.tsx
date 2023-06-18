"use client";

import DivisionLine from "@/components/DivisionLine";
import { SearchInput } from "@/components/form/SearchInput";
import { WebContext } from "@/context/WebContext";
import { useContext, useRef } from "react";
import { Button } from "@/components/form/Button";
import OverFlowContainer from "@/components/OverFlowContainer";
import { useRouter } from "next/navigation";
import { H3 } from "@/components/Typography";
import { useHover } from "usehooks-ts";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";
import { NeighborIllustration } from "@/public/illustrations";
import { PlusIcon } from "@/public/icons";

const WebCardsContainer = () => {
	const router = useRouter();

	return (
		<div className="w-full">
			<div className="mb-[2rem] flex h-fit items-center justify-between gap-12 ">
				<H3 className={`hidden md:block md:opacity-100`} title="Mijn Webben" />
				<DivisionLine className={`hidden md:block md:opacity-100`} />
				<SearchInput className={`w-full md:max-w-[17.5rem] `} />
			</div>
			<OverFlowContainer fadeBottom className={`h-[calc(100vh-20.25rem)]`}>
				<WebCards />
			</OverFlowContainer>
			<Button
				style="primary"
				icon={<PlusIcon className={`h-16 w-16`} />}
				onClick={() => router.push("/new")}
				className={`!fixed bottom-8 right-8 !h-20 w-20 !px-4 !py-7 !shadow-xxl md:right-12 xl:hidden`}
			/>
		</div>
	);
};

const WebCards = () => {
	const { searchFilter, webs, setWebs, sessions } = useContext(WebContext);
	const searchFilteredWebs = searchFilter(webs);
	const sortedWebs = searchFilteredWebs.sort((a, b) => {
		return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
	});

	const router = useRouter();

	const handleOpenSingleWeb = async (webId: string) => {
		// Get all sessions with this web id and redirect to the last used session
		const sessionsWithWebId = sessions.filter((session: any) => session.web_id == webId);
		const lastUsedSession = sessionsWithWebId[sessionsWithWebId.length - 1];

		try {
			// Update last used session
			const response = await fetch(`/api/webs/${webId}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					last_opened: new Date().toISOString(),
				}),
			});

			// Redirect to last used session
			if (response.status == 201) {
				router.push(`web/${webId}/${lastUsedSession.session}`);
			}

			const web = webs.find((web: any) => web.id == webId);
			const newWeb = {
				...web,
				last_opened: new Date().toISOString(),
			};
			const newWebs = webs.filter((web: any) => web.id !== webId);
			setWebs([newWeb, ...newWebs]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeleteSingleWeb = async (id: string) => {
		const newWebs = webs.filter((web: any) => web.id !== id);
		setWebs(newWebs);

		try {
			await fetch(`/api/webs/${id}`, {
				method: "DELETE",
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<section className={`pb-16`}>
			{sortedWebs.length == 0 ? (
				<div className="flex h-[calc(100vh-25rem)] flex-col items-center justify-center">
					<div className={`relative`}>
						<Image src={NeighborIllustration} width={500} height={500} alt="buurt afbeelding" />
						<div className={`absolute right-0 top-0 flex w-[12.5rem] flex-col`}>
							<span className="mb-3 text-3xl font-semibold text-neutral-800">
								Geen webben gevonden
							</span>
							<span className="text-xl text-neutral-600">
								Klik op &apos;Nieuw Web&apos; om je eerste inclusieweb te maken.
							</span>
						</div>
					</div>
				</div>
			) : (
				sortedWebs.map((web: any) => (
					<WebCard
						key={web.id}
						web={web}
						handleOpenSingleWeb={handleOpenSingleWeb}
						handleDeleteSingleWeb={handleDeleteSingleWeb}
					/>
				))
			)}
		</section>
	);
};

const WebCard = ({ web, handleOpenSingleWeb, handleDeleteSingleWeb }) => {
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	return (
		<article
			key={web?.id}
			ref={hoverRef}
			className="mb-4 flex flex-col items-center justify-between rounded-3xl border-1 border-neutral-500 bg-white px-20 py-10 text-neutral-800 shadow-sm md:flex-row md:px-12">
			<div className="flex w-full flex-col justify-between">
				<div className="my-4 flex flex-col md:mb-10">
					<span className="text-center text-2xl md:text-start">Inclusieweb</span>
					<span className="text-center font-primary text-5xl font-semibold uppercase text-neutral-900 md:text-start">
						{web?.name}
					</span>
				</div>
				<div className="flex items-center gap-2 self-center md:self-start">
					<Button
						onClick={() => handleOpenSingleWeb(web?.id)}
						label="Open"
						style="tertiary"
						className={`mt-8 md:mt-0`}
						size="sm"
					/>
					{/* <Button label="Deel" style="outline" size="sm" /> */}
					{/* <IconButton
						className={`${isHover ? "opacity-1" : "opacity-0"} h-5 w-5 transition-opacity`}
						onClick={() => handleDeleteSingleWeb(web?.id)}
						icon={<TrashIcon className={`h-5 w-5 fill-neutral-500 `} />}
					/> */}
				</div>
			</div>
			<div className={`web -order-1 h-[10rem] w-[10rem] md:order-1`}>
				<div
					className={`web-inner opacity-20 ${isHover ? "scale-1 opacity-0 shadow-lg" : ""}`}></div>
				<div
					className={`web-inner scale-[.75] opacity-20 transition-transform ${
						isHover ? "scale-[1]" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.5] opacity-20 transition-transform ${
						isHover ? "scale-[1]" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.25] opacity-20 transition-transform ${
						isHover ? "scale-[1]" : ""
					}`}></div>
				<div
					className={`absolute-center h-[10rem] w-[10rem]  transition ${
						isHover ? "opacity-1 scale-[1] delay-[.06s]" : "scale-0 opacity-0"
					}`}>
					{web?.avatar ? (
						<AvatarComponent className="h-[10rem] w-[10rem] shadow-lg" avatar={web.avatar} />
					) : (
						<Image
							src={`${process.env.NEXT_PUBLIC_SUPABASE_UPLOAD_URL}${web?.image_path}`}
							width={200}
							height={200}
							alt="test"
							className="aspect-square rounded-full object-cover shadow-lg"
						/>
					)}
				</div>
			</div>
		</article>
	);
};

export default WebCardsContainer;
