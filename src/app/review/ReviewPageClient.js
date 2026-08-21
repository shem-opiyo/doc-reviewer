"use client";

import {useEffect, useState} from "react";
import {useSearchParams, useRouter} from "next/navigation";


export default function ReviewPageClient(){   
    /**
   * Routing & Query Parameters
   * Extracts target document identifier from the URL search parameters
   */
  const searchParams = useSearchParams();
  const documentName = searchParams.get("document");
  /**
   * State Management
   * Manages document contents, data transit conditions, and runtime feedback
   */
  const [originalContent, setOriginalContent] = useState("");
  const [aiContent, setAiContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
   /**
   * Document Synchronization Lifecycle
   * Triggered on component mount and whenever the selected document name changes
   */
   useEffect(() => {
    // Validation guard: Halt operation if query parameters are missing
    if (!documentName) {
      setError("No document selected. Please select a document from My Documents or upload one.");
      return;
    }

     async function loadDocument() {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/documents/read?filename=${encodeURIComponent(documentName)}`);
        const data = await res.json();

         if (data.success) {
          setOriginalContent(data.content);
          // TODO: Integrate actual AI processing pipeline instead of mirroring original content
          setAiContent(data.content); 
        } else {
          setError(data.message || "Failed to load document.");
        }
      } catch (err) {
        setError("An unexpected error occurred while loading the document.");
      } finally {
        setLoading(false);
      }
    }

    loadDocument();
  }, [documentName]);
   /**
   * Conditional Render: Asynchronous Loading Interstitial
   */
  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Review & Edit</h1>
        <p className="text-gray-600">Loading document...</p>
      </div>
    );
  }
   /**
   * Conditional Render: Error Boundaries & Fallback Navigation
   */
   if (error) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Review & Edit</h1>
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => (window.location.href = "/documents")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go to My Documents
        </button>
      </div>
    );
  }
  /**
   * Main Layout Render
   */    
    return(
        <div className="p-8">
            {/* header  and contextual instructions banner */}
            <h1 className="text-3xl font-bold mb-4">Review & Edit</h1>
            <p className="text-gray-600 mb-8">Compare original and proofread versions side-by-side. Accept, Reject, or Manually Edit AI suggestions.</p>
            
            {/* Side-by-side comparison workspace grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Source Text Column  | original document */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="font-semibold mb-2 q"> Orignal document</h2>
                    <div className="whitespace-pre-wrap text-sm text-gray-800 overflow-auto max-h-[70vh] border border-gray-100 rounded p-4 bg-gray-50">
            {originalContent}
          </div>
                    {/* <p className="text-gray-500 text-sm"> Orignal content will appear here...</p> */}
                </div>

                {/* AI Processing Text Column|  AI proofread version */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="font-semibold mb-2"> AI Proofread version </h2>
                    {/* <p className="text-gray-500 text-sm">Proofread content with suggestiosn will appear here ...</p> */}
                    <div className="whitespace-pre-wrap text-sm text-gray-800 overflow-auto max-h-[70vh] border border-gray-100 rounded p-4 bg-gray-50">
            {aiContent}
          </div>
                </div>
            </div>
        </div>
    );
}