import {
	createRouteHandlerSupabaseClient,
	createServerComponentSupabaseClient,
} from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

export async function PATCH(request: Request, { params }) {
	const { sessionId } = params;
	console.log(sessionId);
}
