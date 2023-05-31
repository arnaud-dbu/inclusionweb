import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { Database } from "@/lib/database.types";

export const getUser = async () => {
	const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies });
	const { data: user, error } = await supabase.auth.getUser();
	if (error) {
		console.error("Error getting user:", error);
		return null;
	}
	return user;
};
