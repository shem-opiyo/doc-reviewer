import DocumentsPageClient from "./DocumentsPageClient";

export const metadata = {
  title: "My Documents | DocReviewer",
  description:
    "View, search, and manage all your uploaded documents.",
};

export default function DocumentsPage() {
  return <DocumentsPageClient />;
}