import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { error } = await supabase.from("sessions").delete().eq("id", id);

	if (error) {
		return NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json({ message: "Session deleted." }, { status: 200 });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const body = await request.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { error } = await supabase.from("sessions").update(body).eq("id", id);

	if (error) {
		NextResponse.json(error, { status: 500 });
		console.log(error);
	}

	return NextResponse.json({ message: "Session updated" }, { status: 201 });
}
