// app/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

// This import should now work if your file is named correctly.
import LinkManager from './LinkManager' 

export default async function DashboardPage() {
  
  const cookieStore = cookies()
  const supabase = createClient(cookieStore) 

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: links, error } = await supabase
    .from('links')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching links:', error)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center p-4 bg-white border-b">
        <h1 className="text-xl font-bold">Link Vibe Dashboard</h1>
        <form action="/auth/signout" method="post">
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-md hover:bg-gray-700">
                Sign Out
            </button>
        </form>
      </nav>
      <main className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold">Welcome, {user.email}</h2>
            <p className="text-gray-600">Manage your links below.</p>
          </div>
          
          <LinkManager initialLinks={links ?? []} />

        </div>
      </main>
    </div>
  )
}