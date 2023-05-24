import { H1 } from "@/components/Headings";
import AvatarComponent from "@/components/avatar/AvatarComponent";
import useSWR from "swr";

type Props = {
	data: any;
};

export const Contacts = () => {
	const fetcher = async () => {
		const res = await fetch("/api/contacts");
		const json = await res.json();
		return json;
	};

	const { data: contacts, error } = useSWR("/api/contacts", fetcher, { refreshInterval: 1000 });
	if (error) return <div>failed to load</div>;
	if (!contacts) return <H1>loading...</H1>;

	return (
		<div className="flex flex-wrap justify-between gap-y-4 my-5">
			{contacts.map((contact) => (
				<div
					key={contact.id}
					className="bg-white w-[48%] flex flex-col items-center justify-center shadow-lg rounded-xl h-[14rem]">
					<AvatarComponent
						data={contact.avatar}
						className="w-24 h-24 bg-primary-500 mb-2 rounded-full shadow-lg object-cover"
					/>
					<span className="font-bold text-neutral-800 text-xl">{contact.name}</span>
					<span className="text-neutral-800 font-light">{contact.role}</span>
				</div>
			))}
		</div>
	);
};
