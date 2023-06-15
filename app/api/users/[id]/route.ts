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

	const { data, error } = await supabase.auth.admin.deleteUser(id);

	if (error) {
		console.log(error);

		return NextResponse.json(error, { status: 500 });
	}

	return NextResponse.json({ message: "Contact deleted." }, { status: 200 });
}
