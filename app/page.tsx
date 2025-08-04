// app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex items-center justify-center">
      <div className="max-w-3xl text-center p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-4xl font-bold mb-4 text-blue-700">🏆 Match Pointer</h1>
        <p className="text-gray-700 text-lg mb-6">
          Welcome to Match Pointer – your go-to tool for creating, tracking, and scoring matches in real-time.
          Currently, you can create matches, assign teams, score raids/defence, and view winners and logs.
        </p>
        <p className="text-gray-600 mb-6">
          Login with your Google account to create and manage your own matches. In future updates, we'll introduce live sharing,
          real-time syncing across users, and player dashboards.
        </p>

        <div className="flex justify-center space-x-4">
          <Link href="/create-match">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Create Match
            </button>
          </Link>
          <Link href="/All-Matches">
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
              View All Matches
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
