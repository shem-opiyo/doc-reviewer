import Link from "next/link";

export default function ReviewNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Not Found</h2>
      <p className="text-gray-600 mb-4">The requested review could not be found.</p>
      <Link
        href="/review"
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        Back to Review
      </Link>
    </div>
  );
}
