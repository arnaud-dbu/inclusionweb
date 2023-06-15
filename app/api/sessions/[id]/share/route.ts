import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function PATCH(request: Request, { params }) {
	const { id } = params;
	const shareId = await request.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { error } = await supabase.from("sessions").update(shareId).eq("id", id);

	if (error) {
		NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json({ message: "Session share id updated" }, { status: 201 });
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data: session, error } = await supabase.from("sessions").select().eq("share_id", id);

	if (session) {
		NextResponse.json(error, { status: 500 });
	}

	const { data: web, error: webError } = await supabase
		.from("webs")
		.select()
		.eq("id", session[0].web_id)
		.single();

	if (web) {
		NextResponse.json(error, { status: 500 });
	}

	const { data: contacts, error: contactsError } = await supabase
		.from("contacts")
		.select()
		.eq("session_id", session[0].id);

	if (contacts) {
		NextResponse.json(error, { status: 500 });
	}

	const data = {
		session,
		web,
		contacts,
	};

	return NextResponse.json(data, { status: 201 });
}
