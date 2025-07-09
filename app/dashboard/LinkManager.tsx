// app/dashboard/LinkManager.tsx
'use client'

import { createClient } from '@/lib/supabase/client'
import { useState, useTransition, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import { Trash2, PlusCircle, Link as LinkIcon } from 'lucide-react'

type TLink = { id: number, user_id: string, title: string, url: string, created_at: string }
type Profile = { username: string | null, full_name: string | null }

export default function LinkManager({ initialLinks }: { initialLinks: TLink[] }) {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [links, setLinks] = useState<TLink[]>(initialLinks)
  const [newLinkTitle, setNewLinkTitle] = useState('')
  const [newLinkUrl, setNewLinkUrl] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
        const { data: profileData, error } = await supabase.from('profiles').select('username, full_name').eq('id', user.id).single()
        if (error) console.error('Error fetching profile:', error)
        else if (profileData) {
          setProfile(profileData)
          setUsername(profileData.username || '')
        }
      }
      setLoading(false)
    }
    fetchUserProfile()
  }, [supabase])

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const { error } = await supabase.from('profiles').update({ username: username.toLowerCase(), updated_at: new Date().toISOString() }).eq('id', user.id)
    if (error) alert('Error: ' + error.message); else alert('Profile updated!');
    startTransition(() => router.refresh())
  }

  const handleAddLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    const { data, error } = await supabase.from('links').insert({ title: newLinkTitle, url: newLinkUrl, user_id: user.id }).select().single()
    if (error) alert('Error: ' + error.message);
    else if (data) {
      setLinks([data, ...links]);
      setNewLinkTitle('');
      setNewLinkUrl('');
      startTransition(() => router.refresh())
    }
  }

  const handleDeleteLink = async (id: number) => {
    const { error } = await supabase.from('links').delete().eq('id', id)
    if (error) alert('Error: ' + error.message);
    else {
      setLinks(links.filter((link) => link.id !== id));
      startTransition(() => router.refresh())
    }
  }

  if (loading) return <div className="text-center p-8">Loading your dashboard...</div>

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Card */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Your Public Profile</h3>
          <p className="text-sm text-slate-500 mb-4">
            Your public page is:{' '}
            <a href={username ? `/${username}` : '#'} target="_blank" className="font-medium text-indigo-600 hover:underline">
              link-vibe/{username || "..."}
            </a>
          </p>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-700">Username</label>
              <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="your-unique-name" required
                className="w-full px-3 py-2 mt-1 bg-white border border-slate-300 rounded-md shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <button type="submit" disabled={isPending}
              className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:bg-green-300 transition-colors">
              {isPending ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>

        {/* Add Link Card */}
        <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-slate-800">Add a New Link</h3>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-slate-700">Title</label>
              <input id="title" type="text" value={newLinkTitle} onChange={(e) => setNewLinkTitle(e.target.value)} placeholder="My Portfolio" required
                className="w-full px-3 py-2 mt-1 bg-white border border-slate-300 rounded-md shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-slate-700">URL</label>
              <input id="url" type="url" value={newLinkUrl} onChange={(e) => setNewLinkUrl(e.target.value)} placeholder="https://example.com" required
                className="w-full px-3 py-2 mt-1 bg-white border border-slate-300 rounded-md shadow-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            <button type="submit" disabled={isPending}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 transition-colors">
              <PlusCircle className="h-5 w-5" />
              {isPending ? 'Adding...' : 'Add Link'}
            </button>
          </form>
        </div>
      </div>

      {/* List of Links */}
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-slate-800">Your Links</h3>
        {links.length > 0 ? (
          links.map((link) => (
            <div key={link.id} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <LinkIcon className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="font-semibold text-slate-800">{link.title}</p>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:underline truncate max-w-xs">
                    {link.url}
                  </a>
                </div>
              </div>
              <button onClick={() => handleDeleteLink(link.id)}
                className="p-2 text-slate-500 rounded-md hover:bg-red-50 hover:text-red-600 transition-colors">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-xl">
            <h3 className="text-lg font-medium text-slate-700">No links yet!</h3>
            <p className="text-slate-500 mt-1">Use the form above to add your first link.</p>
          </div>
        )}
      </div>
    </div>
  )
}