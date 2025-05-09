// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/create-match', label: 'Add Match' },
  { href: '/livematchNV', label: 'Start Match' },
  { href: '/All-Matches', label: 'All Matches' },
  { href: '/Complete-Matches', label: 'View Matches' },
  { href: '/Profile', label: 'Profile' },
  
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Match Pointer 🏆</h1>
      <ul className="flex space-x-6">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-yellow-400 transition ${
                pathname === href ? 'text-yellow-400 font-semibold' : ''
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="ml-6">
        {session ? (
          <button
            onClick={() => signOut()}
            className="bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Sign Out
          </button>
        ) : (
          <Link
            href="/auth/signin"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}
