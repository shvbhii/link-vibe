// app/auth/signout/route.ts
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  
  const cookieStore = cookies() 
  const supabase = createClient(cookieStore)

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
  }

  return NextResponse.redirect(new URL('/login', req.url), {
    status: 302,
  })
}