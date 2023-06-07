import SideMenu from "@/components/navigation/SideMenu";
import { redirect } from "next/navigation";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";

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

	return (
		<div className="h-[100dvh]">
			<SideMenu />
			{children}
		</div>
	);
};

export default SessionLayout;
