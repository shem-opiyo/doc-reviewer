import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";  //helps prevent the website reload only one page instead of the whole site
import "./globals.css";

// configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DocReviewer - AI-Powered Documents Proofreading",
  description: "Upload documents, receive intelligent grammar and style suggestions, and edit with side-by-side comparison.",
};

// navigation data array
const navItems =[
  {href: "/", label: "Home"},
  {href: "/upload", label: "Upload"},
  {href: "/documents", label: "Documents"},
  {href: "/review", label: "Review"},
  {href: "/settings", label: "Settings"},
  
]

export default function RootLayout({ children }) {
  return (
    <html 
    lang="en"
    className= {`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1">
          {/* sidebar navigation */}
          <aside className="flex flex-col fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-indigo-600">Doc reviewer </h2>
            </div>          
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
          <div className="mt-auto">
            <h2 className="text-xl bottom-4 left-4 font-bold text-indigo-600">Shem Opiyo </h2>
          </div>
          </aside>
          {/* main content */}
          <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
      </body>
      
    </html>
  );
}
