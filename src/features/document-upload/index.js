"use client";
import { useRef, useState } from "react";


//Define the acceptable file types and maximum file size
const ALLOWED_TYPES = [".txt", ".doc", ".docx"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function UploadSection() {

    const [file, setFile] = useState(null);     //Store the currently selected file.
    const [status, setStatus] = useState("idle"); // control the displayed state of the upload workflow: idle | uploading | processing | success | error
    const [errorMessage, setErrorMessage] = useState(""); // Stores the error message displayed when validation or upload processing fails


    // // Define the reference object for storing uploaded files
    const fileInputRef = useRef(null);
    const openFileDialog = () => {
    fileInputRef.current?.click();
     }
    
     /*
   * Validate the selected file against the upload requirements.
   */
    const validateFile = (selectedFile) => {     
    const extension = "." + selectedFile.name.split(".").pop().toLowerCase(); // Extract the file extension and convert it to lowercase.
   
    if (!ALLOWED_TYPES.includes(extension)) {
      return `Unsupported file format. Allowed formats: ${ALLOWED_TYPES.join(", ")}`;
    }
    // Validate the file size.
    if (selectedFile.size > MAX_SIZE_BYTES) {
      return `File size exceeds ${MAX_SIZE_MB} MB limit.`;
    }
    // Returning null means the file passed validation.
    console.log("file passed validation");
    return null;
  };


     //handle file after upload
    const handleFileChange = (e) => {    
    const selectedFile = e.target.files?.[0];     // Retrieve the first selected file.    
    if (!selectedFile) return;    // Stop if the user did not select a file.
    const validationError = validateFile(selectedFile);  // Validate the selected file before storing it in state. 
    if (validationError) {
      // Display the validation error.
      setErrorMessage(validationError);
      // Change the UI to the error state.
      setStatus("error");
      return;
    }

    // Store the file and clear any previous error.
    setFile(selectedFile);
    setErrorMessage("");
    /*
     * Move the interface to the uploading state.
     *
     * NOTE:
     * In this demo, the actual upload begins only when the
     * user clicks the Upload button below.
     */
    setStatus("uploading");
  };

    
    return (
    // <div className="flex flex-col items-center justify-center min-h-[60vh] p-8"> 
    <div>   
      {/* drag and drop or upload files*/}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-lg">
        {/* drag and drop section */}
        <p className="text-gray-500">Drag and drop your file here, or click to browse</p>
         <p className="text-gray-500 mt-2"> or </p>
         {/* upload file section */}
         <button
            // onClick={() => fileInputRef.current.click()}
            onClick={openFileDialog}
            className="mt-5 px-6 py-2 bg-blue-900 hover:bg-indigo-600 rounded-md transition" >
            Browse Files
          </button>
          {/*  create a hidden file input element */}
          {/* note that the input element is present in the DOM, but hidden on the UI */}
          <input
          ref={fileInputRef}
          type="file"
          className="hidden"          
          accept=".txt,.doc,.docx,.pdf"
          onChange={handleFileChange}
           />
        
          
        <p className="text-sm text-gray-400 mt-2">Supported formats: .txt, .doc, .docx, .pdf </p>
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