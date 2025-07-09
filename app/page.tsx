// app/page.tsx
import Link from 'next/link';
import { Link as LinkIcon } from 'lucide-react'; // Let's add an icon! `npm install lucide-react`

export default function HomePage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="text-center p-8 max-w-2xl">
        <div className="flex justify-center items-center mb-6">
          <span className="p-3 bg-indigo-100 rounded-full">
            <LinkIcon className="h-8 w-8 text-indigo-600" />
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Link Vibe</span>
        </h1>
        <p className="text-lg text-slate-600 mb-8">
          Your personal corner of the internet. All your links, one beautiful page.
        </p>
        <div className="flex justify-center gap-4">
          <Link 
            href="/login" 
            className="px-8 py-3 font-semibold text-white bg-indigo-600 rounded-md shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link 
            href="/dashboard" 
            className="px-8 py-3 font-semibold text-slate-700 bg-slate-200 rounded-md shadow-lg hover:bg-slate-300 transition-all duration-300 transform hover:scale-105"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}