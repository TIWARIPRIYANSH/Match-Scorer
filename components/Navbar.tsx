"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/create-match", label: "Add Match" },
  { href: "/start-match", label: "Start Match" },
  { href: "/All-Matches", label: "Live Match" },
  { href: "/Completed-matches", label: "View Matches" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-black text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Match Pointer 🏆</h1>
      <ul className="flex space-x-6">
        {navLinks.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`hover:text-yellow-400 transition ${
                pathname === href ? "text-yellow-400 font-semibold" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
