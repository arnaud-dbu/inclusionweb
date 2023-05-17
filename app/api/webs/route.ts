import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import type { Database } from '@/lib/database.types'
import { log } from 'console'

// do not cache this page
export const revalidate = 0

export async function GET() {
    const supabase = createRouteHandlerSupabaseClient<Database>({
        headers,
        cookies,
    })
    const { data } = await supabase.from('webs').select()

    return NextResponse.json(data)
}

export async function POST(request: Request) {
    const { name, user_id, image_path } = await request.json()

    const supabase = createRouteHandlerSupabaseClient<Database>({
        headers,
        cookies,
    })

    console.log(name, user_id, image_path);
    

    const { data, error } = await supabase
        .from("webs")
        .insert({
            name: name,
            user_id: user_id,
            image_path: image_path
        })

    if (error) {
        return NextResponse.json(error, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
}
