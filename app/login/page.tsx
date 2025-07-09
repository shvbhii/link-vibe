'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  // ... (handleSignIn function is the same)
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert('Error signing in: ' + error.message)
    } else {
      router.push('/dashboard')
      router.refresh()
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        {/* ... (the form is the same) */}
        <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-800">Welcome Back</h1>
            <p className="mt-2 text-slate-500">Login to manage your Link Vibe</p>
        </div>
        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
            <input
              id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full px-4 py-3 mt-1 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">Password</label>
            <input
              id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full px-4 py-3 mt-1 text-slate-800 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-slate-600">
  Don't have an account?{' '}
  <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500 hover:underline">
    Sign Up
  </Link>
</p>
      </div>
    </div>
  )
}