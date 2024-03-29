import { redirect } from "next/navigation";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";
import { WebProvider } from "@/context/WebContext";
import NavBar from "@/components/navigation/NavBar";

type Props = {
	children: React.ReactNode;
};

const SessionLayout = async ({ children }: Props) => {
	const supabase = createServerComponentSupabaseClient<Database>({
		headers,
		cookies,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	}

	// Fetch contacts data
	const contactRes = await fetch(`${process.env.HOST}/api/contacts`, { cache: "no-cache" });
	const fetchedContactsData = await contactRes.json();

	// Fetch sessions data
	const sessionRes = await fetch(`${process.env.HOST}/api/sessions`, { cache: "no-cache" });
	const fetchedSessionsData = await sessionRes.json();

	// Get all webs
	const websRes = await fetch(`${process.env.HOST}/api/webs`, { cache: "no-cache" });
	const fetchedWebsData = await websRes.json();
	const userWebs = await fetchedWebsData?.filter((web: any) => web.user_id === user?.id);

	return (
		<WebProvider
			fetchedWebsData={userWebs}
			fetchedContactsData={fetchedContactsData}
			fetchedSessionsData={fetchedSessionsData}
			user={user}>
			<div className="relative mt-16 h-[calc(100vh-4rem)] xl:relative  xl:left-[6rem] xl:mt-0 xl:h-screen xl:w-[calc(100vw-6rem)]">
				<NavBar />
				{children}
			</div>
		</WebProvider>
	);
};

export default SessionLayout;
