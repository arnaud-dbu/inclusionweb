import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const namesVisibility = await request.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data, error } = await supabase.from("webs").update(namesVisibility).eq("id", id);

	if (error) {
		NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json({ message: "Names Visibility updated" }, { status: 201 });
}
