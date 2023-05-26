import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function POST(request: Request) {
	const {
		id,
		user_id,
		avatar,
		type,
		name,
		role,
		relation,
		given_support,
		received_support,
		frequency,
		web_id,
	} = await request.json();

	console.log(request);

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const contact = {
		id: id,
		user_id: user_id,
		avatar: avatar,
		type: type,
		name: name,
		role: role,
		relation: relation,
		given_support: given_support,
		received_support: received_support,
		frequency: frequency,
		web_id: web_id,
	};

	const { data, error } = await supabase.from("contacts").insert(contact).select();

	if (error) {
		NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json(data, { status: 201 });
}
