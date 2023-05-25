import { Btn } from "@/components/Buttons";
import { H1 } from "@/components/Headings";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import { useEffect } from "react";
import useSWR from "swr";

type Props = {
	data: any;
	contacts: any;
	setContacts: any;
};

export const Contacts = ({ contacts, setContacts }) => {
	const fetcher = async () => {
		const res = await fetch("/api/contacts");
		const json = await res.json();
		return json;
	};
	const { data: allData, error } = useSWR("/api/contacts", fetcher, { refreshInterval: 1000 });

	useEffect(() => {
		setContacts(allData);
	}, [allData, contacts, setContacts]);

	if (error) return <div>failed to load</div>;
	if (!allData) return <H1>loading...</H1>;

	return (
		<div className="flex flex-wrap justify-between gap-y-4 my-5">
			{allData.map((contact) => (
				<div
					key={contact.id}
					className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[15rem]">
					<AvatarComponent
						data={contact.avatar}
						className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
					/>
					<span className="font-bold text-neutral-800 text-xl">{contact.name}</span>
					<span className="text-neutral-800 font-light">{contact.role}</span>
					<button className="border-1 p-1 px-4 mt-3 border-neutral-500 rounded-full text-neutral-700 text-sm">
						Voeg toe
					</button>
				</div>
			))}
		</div>
	);
};
