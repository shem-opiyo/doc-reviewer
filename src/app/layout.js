import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";  //helps prevent the website reload only one page instead of the whole site
import "./globals.css";
import Navigation from "@/components/Navigation";

// configure fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// configure the monospace version of geist
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//define the metadata for the application
export const metadata = {
  title: "DocReviewer - AI-Powered Documents Proofreading",
  description: "Upload documents, receive intelligent grammar and style suggestions, and edit with side-by-side comparison.",
};


//define the common structure to be shared by the pages in the application
export default function RootLayout({ children }) {
  return (
    <html 
    lang="en"
    className= {`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <div className="flex flex-1">
          {/* sidebar navigation */}
          <aside className="flex flex-col fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-gray-700 p-6">
            {/* application branding and possibly logo. NOTE: this should be refactored to a branding component*/}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-indigo-600">Doc reviewer </h2>
            </div>          
          
          {/* Display the navigation component  (a client component) */}          
          <Navigation/>
          {/* display the current user/ profile name. NOTE: this should be refactored to a profile component */}
          <div className="mt-auto">
            <h2 className="text-xl bottom-4 left-4 font-bold text-indigo-600">Shem Opiyo </h2>
          </div>
          </aside>
          {/*display the main content */}
          <main className="flex-1 ml-64 p-8">{children}</main>
        </div>
      </body>
      
    </html>
  );
}
