import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { createSupabaseServerClient } from '@/lib/supabase-server';
import { projectSchema } from '@/lib/validations';

export async function GET(request: NextRequest) {
  const supabase = await createSupabaseServerClient();
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');
  const search = searchParams.get('search');

  let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (status && status !== 'all') {
    query = query.eq('status', status);
  }

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const supabase = await createSupabaseServerClient();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const result = projectSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten() },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([result.data])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath('/');

  return NextResponse.json(data, { status: 201 });
}
