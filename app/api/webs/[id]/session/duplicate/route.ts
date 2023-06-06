import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function POST(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const body = await req.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	// Create a new session
	const { data: newSession, error: newSessionError } = await supabase
		.from("sessions")
		.insert({
			id: body.random_id,
			session: body.new_session,
			web_id: id,
		})
		.select();

	// Get all contacts with matching web_id and matching current_session id
	const { data: currentContacts, error: currentContactsError } = await supabase
		.from("contacts")
		.select()
		.eq("web_id", id)
		.eq("session_id", body.current_session);

	// Create new contacts with new session id
	const newContacts = currentContacts.map((item) => {
		return {
			...item,
			id: crypto.randomUUID(),
			session_id: body.new_session,
		};
	});

	// Insert new contacts
	const { error } = await supabase.from("contacts").insert(newContacts).select();

	return new NextResponse(JSON.stringify({ message: "New session duplicated" }), {
		status: 201,
		headers: {
			"content-type": "application/json",
		},
	});
}
