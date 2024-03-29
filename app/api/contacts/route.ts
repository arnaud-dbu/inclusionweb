import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
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
	const { data } = await supabase.from("contacts").select();

	return NextResponse.json(data);
}

export async function POST(req: Request) {
	const contact = await req.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data, error } = await supabase.from("contacts").insert(contact).select();

	if (error) {
		NextResponse.json(error, { status: 500 });
		console.log(error);
	}

	console.log(data);

	return NextResponse.json({ message: "New Contact Created" }, { status: 201 });
}
