'use client';

// import DocumentToolbar from "./Toolbar";
import{useEffect, useState} from "react";
import {useRouter} from "next/navigation";


// export const metadata = {
//     title: "MyDocuments | DocReviewer",
//     description: "videw, search, and manage all your uploaded documents."
// };

export default function DocumentsPageClient(){
    //Initialize router for client-side navigation
    const router = useRouter();

    // Define component state for documents data, loading status, and error messages
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch document list from the API on initial component mount
    useEffect(() => {
     async function loadDocuments() {
          try {
         const res = await fetch('/api/documents');
         const data = await res.json();
            
           if (data.success) {
            setDocuments(data.documents);
         } else {
           setError(data.message || 'Failed to load documents.');
         }
       } catch (err) {
         setError('An unexpected error occurred.');
       } finally {
         setLoading(false);
       }
     }
     loadDocuments();
   }, []);

    // Utility function to convert raw byte sizes into readable formats (B, KB, MB)
  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  // Utility function to format ISO date strings into local date representation
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Navigate to the review page for a specific document name
  const openDocument = (fileName) => {
    router.push(`/review?document=${encodeURIComponent(fileName)}`);
  };

  // Render loading state while data is being fetched
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">My Documents</h1>
        <p className="text-gray-600">Loading documents...</p>
      </div>
    );
  }

   // Render error state if the fetch operation failed
  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">My Documents</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }



 // Render main dashboard view with search, filters, and document table/empty state

    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">My Documents</h1>
            <p className="text-gray-600 mb-8"> View, search, and manage all your uploaded documents. Filter by status, owner, or date</p>
            {/* search for documents */}
            <div className="bg-white border border-black-100 rounded-lg p-1 text-left">
                <p className="text-gray-500"> Search... </p>
            </div>
            {/* filter section */}
             <div className="flex items-center gap-4 bg-white border border-black-100 rounded-lg p-1">
             <div className="rounded-lg border border-black-100 px-4 py-1 text-gray-600"> Status</div>
             <div className="rounded-lg border border-black-100 px-4 py-1 text-gray-600"> Owner </div>
             <div className="rounded-lg border border-black-100 px-4 py-1 text-gray-600"> Date </div>
             <div className="rounded-lg border border-black-100 px-4 py-1 text-gray-600"> Reset Filter</div>
             </div>


            {/* Document list or empty state message */}
            {documents.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">No documents uploaded yet. Go to upload to get started.</p>
            </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Size</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">Last Modified</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {documents.map((doc) => (
                <tr
                  key={doc.name}
                  onClick={() => openDocument(doc.name)}
                  className="cursor-pointer hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-900">{doc.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatSize(doc.size)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(doc.lastModified)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
        </div>
    );

}