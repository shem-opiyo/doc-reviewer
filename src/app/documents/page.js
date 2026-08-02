// import DocumentToolbar from "./Toolbar";


export const metadata = {
    title: "MyDocuments | DocReviewer",
    description: "videw, search, and manage all your uploaded documents."
};

export default function DocumentsPage(){
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


            {/* Display uploaded documents */}
            <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                <p className="text-gray-500">No documents uploaded yet. Go to upload to get started.</p>
            </div>
        </div>
    );

}