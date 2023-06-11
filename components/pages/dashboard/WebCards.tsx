"use client";

import DivisionLine from "@/components/DivisionLine";
import { H2 } from "@/components/Typography";
import WebCard from "@/components/WebCard";
import { SearchInput } from "@/components/form/SearchInput";
import { WebContext, WebProvider } from "@/context/WebContext";
import { useContext } from "react";

type Props = {
	user?: any;
	webs?: any;
};

const WebCards = ({ user, webs }: Props) => {
	return (
		<WebProvider>
			<div className="mt-8 w-full">
				<div className="flex justify-between items-center gap-12 mb-8 px-2">
					<H2>Mijn Webben</H2>
					<DivisionLine />
					<SearchInput />
				</div>
				<WebCardsList user={user} webs={webs} />
			</div>
		</WebProvider>
	);
};
export default WebCards;

const WebCardsList = ({ user, webs }) => {
	const { searchFilter } = useContext(WebContext);

	const searchFilteredWebs = searchFilter(webs);

	return (
		<section>
			{searchFilteredWebs.map((web: any) => {
				if (web.user_id === user.id) {
					return <WebCard key={web.id} data={web} />;
				}
			})}
		</section>
	);
};
