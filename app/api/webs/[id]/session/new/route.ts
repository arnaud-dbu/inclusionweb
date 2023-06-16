import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function POST(req: Request) {
	const session = await req.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data, error } = await supabase.from("sessions").insert(session).select();

	if (error) {
		NextResponse.json(error, { status: 500 });
		console.log(error);
	}

	return NextResponse.json(data, { status: 201 });
}
