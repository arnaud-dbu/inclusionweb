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

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const body = await request.json();

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { error } = await supabase.from("webs").update(body).eq("id", id);

	if (error) {
		NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json({ message: "Web updated" }, { status: 201 });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
	const { id } = params;

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	const { data, error } = await supabase.from("webs").delete().eq("id", id);

	if (error) {
		NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json({ message: "Web deleted" }, { status: 201 });
}
