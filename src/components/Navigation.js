"use client";

import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/documents", label: "Documents" },
  { href: "/review", label: "Review" },
  { href: "/settings", label: "Settings" },
];

export default function Navigation() {
  return (
    <nav className="space-y-2">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="block px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
