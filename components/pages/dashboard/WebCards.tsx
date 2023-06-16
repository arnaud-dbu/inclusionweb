"use client";

import DivisionLine from "@/components/DivisionLine";
import { SearchInput } from "@/components/form/SearchInput";
import { WebContext, WebProvider } from "@/context/WebContext";
import { useContext, useRef, useState } from "react";
import { Button } from "@/components/form/Button";
import OverFlowContainer from "@/components/OverFlowContainer";
import { useRouter } from "next/navigation";
import { H3 } from "@/components/Typography";
import { useHover } from "usehooks-ts";
import { motion } from "framer-motion";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import Image from "next/image";

type Props = {
	fetchedWebsData: any;
	fetchedSessionsData: any;
};

const WebCardsContainer = ({ fetchedWebsData, fetchedSessionsData }: Props) => {
	return (
		<WebProvider fetchedWebsData={fetchedWebsData} fetchedSessionsData={fetchedSessionsData}>
			<div className="w-full">
				<div className="mb-[2rem] flex h-fit items-center justify-between gap-12 px-2">
					<H3 title="Mijn Webben" />
					<DivisionLine />
					<SearchInput />
				</div>
				<OverFlowContainer fadeBottom className={`h-[calc(100vh-20.25rem)]`}>
					<WebCards />
				</OverFlowContainer>
			</div>
		</WebProvider>
	);
};

const WebCards = () => {
	const { searchFilter, webs, sessions } = useContext(WebContext);
	const searchFilteredWebs = searchFilter(webs);
	const router = useRouter();

	const handleOpenSingleWeb = (webId: string) => {
		// Get all sessions with this web id and redirect to the last used session
		const sessionsWithWebId = sessions.filter((session: any) => session.web_id == webId);
		const lastUsedSession = sessionsWithWebId[sessionsWithWebId.length - 1];
		router.push(`web/${webId}/${lastUsedSession.session}`);
	};

	const variants = {
		hover: {
			scale: [1],
		},
		initial: {
			x: 0,
		},
	};

	return (
		<section className={`pb-16`}>
			{searchFilteredWebs.map((web: any) => (
				<WebCard key={web.id} web={web} handleOpenSingleWeb={handleOpenSingleWeb} />
			))}
		</section>
	);
};

const WebCard = ({ web, handleOpenSingleWeb }) => {
	const hoverRef = useRef(null);
	const isHover = useHover(hoverRef);

	return (
		<article
			key={web?.id}
			ref={hoverRef}
			className="mb-4 flex justify-between rounded-3xl border-1 border-neutral-500 bg-white px-12 py-10 text-neutral-800 shadow-sm">
			<div className="flex flex-col justify-between">
				<div className="flex flex-col">
					<span className="text-2xl">Inclusieweb</span>
					<span className="font-primary text-5xl font-semibold uppercase text-neutral-900">
						{web?.name}
					</span>
				</div>
				<div className="flex gap-3">
					<Button
						onClick={() => handleOpenSingleWeb(web?.id)}
						label="Open"
						style="tertiary"
						size="sm"
					/>
				</div>
			</div>
			<div className={`web w-[10rem]`}>
				<div
					className={`web-inner opacity-20 ${isHover ? "scale-1 opacity-30 shadow-lg" : ""}`}></div>
				<div
					className={`web-inner scale-[.75] opacity-20 transition-transform ${
						isHover ? "scale-[.5]" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.5] opacity-20 transition-transform ${
						isHover ? "scale-[.5]" : ""
					}`}></div>
				<div
					className={`web-inner scale-[.25] opacity-20 transition-transform ${
						isHover ? "scale-[.5]" : ""
					}`}></div>
				<div
					className={`absolute-center h-[10rem] w-[10rem]  transition ${
						isHover ? "opacity-1 scale-[.7] " : "scale-0 opacity-0"
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
