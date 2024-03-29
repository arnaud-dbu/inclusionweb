import {
	createRouteHandlerSupabaseClient,
	createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function GET() {
	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data, error } = await supabase.from("webs").select();

	if (error) {
		NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json(data, { status: 201 });
}

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
			share_id: crypto.randomUUID(),
		})
		.select();

	if (error) {
		NextResponse.json(error, { status: 500 });
		console.log(error);
	}

	return NextResponse.json(data[0].id, { status: 201 });
}
