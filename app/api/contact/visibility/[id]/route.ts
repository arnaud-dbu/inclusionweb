import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	const id = params.id;
	const { status } = await req.json();
	if (!status || typeof status !== "string") {
		return NextResponse.json({ message: "Wrong payload." }, { status: 400 });
	}

	const supabase = createRouteHandlerSupabaseClient<Database>({
		headers,
		cookies,
	});

	// // Update a todo
	// const { data, error } = await supabase.from("todos").update({ status }).match({ id }).select("*");

	// if (error) {
	// 	return NextResponse.json(error, { status: 500 });
	// }

	// return NextResponse.json(data, { status: 200 });
}
