import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { headers, cookies } from "next/headers";
import type { Database } from "@/lib/database.types";

// do not cache this page
export const revalidate = 0;

// export async function GET(request: Request) {
//     const { id } = await request.json();
//     console.log(id);

//     const supabase = createRouteHandlerSupabaseClient<Database>({
//         headers,
//         cookies,
//     });

//     const { data } = await supabase.from("webs").select().eq("id", id);

//     return NextResponse.json(data);
// }
