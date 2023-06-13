"use client";

import DivisionLine from "@/components/DivisionLine";
import { H2 } from "@/components/Typography";
import { SearchInput } from "@/components/form/SearchInput";
import { WebContext, WebProvider } from "@/context/WebContext";
import { useContext } from "react";
import WebIllustration from "../new/WebIllustration";
import { Button } from "@/components/form/Button";
import OverFlowContainer from "@/components/OverFlowContainer";
import { useRouter } from "next/navigation";

type Props = {
	fetchedWebsData: any;
	fetchedSessionsData: any;
};

const WebCardsContainer = ({ fetchedWebsData, fetchedSessionsData }: Props) => {
	return (
		<WebProvider fetchedWebsData={fetchedWebsData} fetchedSessionsData={fetchedSessionsData}>
			<div className="w-full">
				<div className="flex justify-between items-center gap-12 px-2 h-fit mb-[2rem]">
					<H2>Mijn Webben</H2>
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

	return (
		<section className={`pb-16`}>
			{searchFilteredWebs.map((web: any) => (
				<article
					key={web.id}
					className="bg-white flex justify-between rounded-3xl px-12 py-10 text-neutral-800 border-1 border-neutral-500 mb-4">
					<div className="flex flex-col justify-between">
						<div className="flex flex-col">
							<span className="text-2xl">Inclusieweb</span>
							<span className="font-primary uppercase text-neutral-900 font-extrabold text-5xl">
								{web.name}
							</span>
						</div>
						<div className="flex gap-3">
							<Button
								onClick={() => handleOpenSingleWeb(web.id)}
								label="Open"
								style="tertiary"
								size="sm"
							/>
							<Button label="Close" style="outline" size="sm" />
						</div>
					</div>
					<WebIllustration className="w-[10rem] opacity-80" />
				</article>
			))}
		</section>
	);
};

export default WebCardsContainer;
