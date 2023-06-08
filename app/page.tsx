import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

const HomePage = async () => {
	const supabase = createServerComponentSupabaseClient<Database>({
		headers,
		cookies,
	});

	const {
		data: { user },
	} = await supabase.auth.getUser();

	if (!user) {
		return redirect("/login");
	} else {
		return redirect("/dashboard");
	}
};

export default HomePage;
