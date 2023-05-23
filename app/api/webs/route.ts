import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import { headers, cookies } from 'next/headers';
import type { Database } from '@/lib/database.types';

// do not cache this page
export const revalidate = 0;

export async function GET() {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });
  const { data } = await supabase.from('webs').select();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const { name, user_id, image_path, avatar, id } = await request.json();

  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data, error } = await supabase
    .from('webs')
    .insert({
      id: id,
      name: name,
      user_id: user_id,
      image_path: image_path,
      avatar: avatar,
    })
    .select();

  if (error) {
    NextResponse.json(error, { status: 500 });
  }

  return NextResponse.json(data[0].id, { status: 201 });
}
