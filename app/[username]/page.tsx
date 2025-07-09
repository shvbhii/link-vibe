// app/[username]/page.tsx
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import Link from 'next/link'; // Make sure Link is imported

type TLink = { id: number; title: string; url: string; };

export default async function UserPage({ params }: { params: { username: string } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  
  // THIS IS THE CRITICAL LINE THAT WAS MISSING
  const { username } = params;

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url')
    .eq('username', username) // Now 'username' is correctly defined
    .single()

  if (!profile) {
    notFound()
  }

  const { data: links } = await supabase
    .from('links')
    .select('id, title, url')
    .eq('user_id', profile.id)
    .order('created_at', { ascending: true })

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200 p-4 pt-16">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 mb-4 shadow-lg flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{username.charAt(0).toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">@{username}</h1>
          {profile.full_name && <p className="text-slate-600 mt-1">{profile.full_name}</p>}
        </div>
        <div className="space-y-4">
          {links && links.length > 0 ? (
            links.map((link: TLink) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full p-4 text-center text-lg font-semibold text-indigo-700 bg-white/70 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                {link.title}
              </a>
            ))
          ) : (
            <div className="text-center p-6 bg-white/70 backdrop-blur-sm rounded-xl">
                <p className="text-slate-600">This user hasn't added any links yet.</p>
            </div>
          )}
        </div>
        <div className="text-center mt-12">
            <Link href="/" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">
                Powered by Link Vibe
            </Link>
        </div>
      </div>
    </div>
  )
}