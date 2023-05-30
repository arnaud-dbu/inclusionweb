import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import MyWeb from "./components/MyWeb";
import type { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";

type Props = {
	data: any;
};

const WebPage = async ({ params }) => {
	const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies });
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const webRes = await fetch(`${process.env.HOST}/api/web/${params.id}`, {
		cache: "no-store",
	});
	const fetchedWebData = await webRes.json();

	const contactRes = await fetch(`${process.env.HOST}/api/contacts`, {
		cache: "no-store",
	});
	const contactData = await contactRes.json();
	const fetchedContactsData = await contactData?.filter(
		(contact: any) => contact.web_id === fetchedWebData.id
	);

	return <MyWeb fetchedContactsData={fetchedContactsData} fetchedWebData={fetchedWebData} />;
};

export default WebPage;
