export const metadata = {
    title: "MyDocuments | DocReviewer",
    description: "videw, search, and manage all your uploaded documents."
};

export default function DocumentsPage(){
    return(
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">My Documents</h1>
            <p className="text-gray-600 mb-8"> View, search, and manage all your uploaded documents. Filter by status, owner, or date</p>
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">No documents uploaded yet. Go to upload to get started.</p>
            </div>
        </div>
    );

}