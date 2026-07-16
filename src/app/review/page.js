export const metadata ={
    title: "Review & Edit | DocReviewer",
    description: "Compare original and proofread versions side-by-side and accept or reject AI suggestions."

};
export default function ReviewPage(){
    return(
        <div className="p-8">
            {/* header banner section */}
            <h1 className="text-3xl font-bold mb-4">Review & Edit</h1>
            <p className="text-gray-600 mb-8">Compare original and proofread versions side-by-side. Accept, Reject, or Manually Edit AI suggestions.</p>
            {/* original and AI proofread side-by-side comparison section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* original document */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="font-semibold mb-2 q"> Orignal document</h2>
                    <p className="text-gray-500 text-sm"> Orignal content will appear here...</p>
                </div>
                {/* AI proofread version */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h2 className="font-semibold mb-2"> AI Proofread version </h2>
                    <p className="text-gray-500 text-sm">Proofread content with suggestiosn will appear here ...</p>
                </div>
            </div>
        </div>
    );
}