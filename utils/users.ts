import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { Database } from "@/lib/database.types";
import { useSupabase } from "@/app/supabase-provider";

export const getUser = async () => {
	const supabase = createServerComponentSupabaseClient<Database>({ headers, cookies });
	const { data: user, error } = await supabase.auth.getUser();

	if (error) {
		throw new Error("Error getting user: " + error.message);
	}

	return user;
};
