import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function GET(req: Request, { params }: { params: { id: string } }) {
	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data, error } = await supabase.from("webs").select().eq("id", params.id).single();

	if (error) {
		return NextResponse.json(error, { status: 500 });
	}

	return new NextResponse(JSON.stringify(data), {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
	});
}
