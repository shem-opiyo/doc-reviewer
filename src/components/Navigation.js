"use client";


import Link from "next/link";
import { usePathname } from "next/navigation";

// define the navigation configuration
const navItems = [
  { href: "/", label: "Home" },
  { href: "/upload", label: "Upload" },
  { href: "/documents", label: "Documents" },
  { href: "/review", label: "Review" },
  { href: "/settings", label: "Settings" },
];

export default function Navigation() {
    // Get the current URL path/ route
    const pathname = usePathname();

    return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return(
            // display the links
        <Link
          key={item.href}
          href={item.href}
        // highlight the active navigation link
          className={`block px-4 py-2 rounded-md transition ${
              isActive
                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 fondium"
                : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
            >
          {item.label}
        </Link>
        );
      })}
    </nav>
  );
}
