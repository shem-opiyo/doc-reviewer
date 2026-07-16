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
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-lg">
        <p className="text-gray-500">Drag and drop your file here, or click to browse</p>
        <p className="text-sm text-gray-400 mt-2">Supported formats: .txt, .doc, .docx, .pdf</p>
      </div>
    </div>
  );
}