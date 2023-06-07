"use client";

import DivisionLine from "@/components/DivisionLine";
import { H2 } from "@/components/Typography";
import WebCard from "@/components/WebCard";
import { SearchInput } from "@/components/form/SearchInput";
import { useState } from "react";

type Props = {
	user: any;
	webs: any;
};

const WebCards = ({ user, webs }: Props) => {
	const [query, setQuery] = useState("");

	const handleSearchFilter = (e) => {
		setQuery(e.target.value.toLowerCase());
	};

	const searchFilter = (array) => {
		return array.filter((el) => el.name.toLowerCase().includes(query));
	};

	const searchFilteredWebs = searchFilter(webs);

	return (
		<div className="mt-8 w-full">
			<div className="flex justify-between items-center gap-12 mb-8 px-2">
				<H2>Mijn Webben</H2>
				<DivisionLine />
				<SearchInput handleSearchFilter={handleSearchFilter} setQuery={setQuery} />
			</div>
			<div>
				{searchFilteredWebs.map((web: any) => {
					if (web.user_id === user.id) {
						return <WebCard key={web.id} data={web} />;
					}
				})}
			</div>
		</div>
	);
};

export default WebCards;
