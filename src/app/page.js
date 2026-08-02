import Link from "next/link";

export const metadata = {
  title: "DocReviewer - AI-Powered Document Proofreading",
  description: "Upload documents, receive intelligent grammar and style suggestions, and edit with side-by-side comparison.",
};

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start" >
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50" >
          Welcome to DocReviewer
        </h1>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <p className="text-gray-600 dark:text-gray-300 max-w-md">
            AI-powered document proofreading and editing platform. Upload documents, receive intelligent suggestions, and compare versions side-by-side.
          </p>
          <div className="flex gap-4">
            <Link href="/upload" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              Upload Document
            </Link>
            <Link href="/documents" className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
              My Documents
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
