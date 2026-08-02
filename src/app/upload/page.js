export const metadata = {
  title: "Upload Document | DocReviewer",
  description: "Upload your documents for AI-powered proofreading and editing.",
};

export default function UploadPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <h1 className="text-3xl font-bold mb-4">Upload Document</h1>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Upload your .txt, .doc, .docx, or .pdf files (max 10 MB) for AI-powered proofreading and editing.
      </p>
      {/* drag and drop or upload files*/}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-lg">
        {/* drag and drop section */}
        <p className="text-gray-500">Drag and drop your file here, or click to browse</p>
         <p className="text-gray-500 mt-2"> or </p>
         {/* upload file section */}
         <button
            // onClick={() => fileInputRef.current.click()}
            className="mt-5 px-6 py-2 bg-blue-900 hover:bg-indigo-600 rounded-md transition" >
            Browse Files
          </button>
          
        <p className="text-sm text-gray-400 mt-2">Supported formats: .txt, .doc, .docx, .pdf</p>
        <p className="text-gray-300 mt-2"> Uploading : Proposal.docx (3.2) MB </p>
        <p className="text-gray-500 text-sm">68% Done</p>

        <button
              // onClick={handleUpload}
              // disabled={uploading}
              className="mt-4 border border-red-600 text-red-400 bg-red-900 hover:text-white px-5 py-2 bg-red-400 px-5 py-2 rounded-md transition-all duration-200"
            >
              Cancel upload
            </button>
        
      </div>
      {/* display upload progress */}
      
      
    </div>
  );
}