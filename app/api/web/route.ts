import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

export async function POST(request: Request) {
	const web = await request.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	await supabase.from("webs").insert(web).select();

	const { data, error } = await supabase
		.from("sessions")
		.insert({
			id: crypto.randomUUID(),
			web_id: web.id,
			session: 1,
		})
		.select();

	if (error) {
		NextResponse.json(error, { status: 500 });
		console.log(error);
	}

	return NextResponse.json(data[0].id, { status: 201 });
}
