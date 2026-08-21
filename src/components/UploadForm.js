"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

//Define the acceptable file types and maximum file size
const ALLOWED_TYPES = [".txt", ".doc", ".docx"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function UploadForm() {
  const router = useRouter();                  // initialize Next.js router; used to navigate the user to the review page
  const fileInputRef = useRef(null);         // Reference to the hidden file input for the file-selection  dialog

  const [file, setFile] = useState(null);     //Store the currently selected file.
  const [status, setStatus] = useState("idle"); // control the displayed state of the upload workflow: idle | uploading | processing | success | error
  const [errorMessage, setErrorMessage] = useState(""); // Stores the error message displayed when validation or upload processing fails

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
    return null;
  };

  /*
   * Handles the file input's change event.
   *
   * This function runs when the user selects a file
   * through the browser's file-selection dialog.
   */
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

  // Handles the upload workflow.
  const handleUpload = async () => {
    // There is nothing to upload if no file is selected.
    if (!file) return;

    try {
      // Simulate upload delay.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      // Upload has completed; move to the processing stage.
      setStatus("processing");

      // Simulate processing/validation delay (Simulate server-side document processing.)  
      await new Promise((resolve) => setTimeout(resolve, 1500));

       // The simulated workflow completed successfully.
      setStatus("success");
      // Give the user time to see the success message  before navigating to the review page.
      setTimeout(() => {
        // router.push("/review");
        router.push(`/review?document=${encodeURIComponent(file.name)}`);
      }, 2000);
    } catch {
      // Handle unexpected errors during the upload workflow.
      setErrorMessage("Upload failed. Please try again.");
      setStatus("error");
    }
  };

  /*
   * Opens the browser's native file-selection dialog.
   *
   * The actual <input type="file"> is hidden from the user.
   * The visible upload area calls this function instead.
   */
  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
    {/* Page heading */}
      <h1 className="text-3xl font-bold mb-4">Upload Document</h1>
      {/* Description of the upload requirements */}
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Upload your .txt, .doc, or .docx files (max 10 MB) for AI-powered proofreading and editing.
      </p>


     {/*
       * Hidden native file input.
       *
       * The browser still handles file selection through this
       * element, while the visible upload interface is provided
       * by the custom UI below.
       */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ALLOWED_TYPES.join(",")}
        onChange={handleFileChange}
        className="hidden"
      />

      {/*
       * IDLE STATE
       *
       * Initial state of the component.
       * The user can click the upload area to select a file.
       */}
      {status === "idle" && (
        <div
          onClick={openFileDialog}
          className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-lg cursor-pointer hover:border-indigo-400 transition"
        >
          <p className="text-gray-500">Click to browse files</p>
          <p className="text-sm text-gray-400 mt-2">Supported formats: .txt, .doc, .docx</p>
        </div>
      )}

      {/*
       * ERROR STATE
       *
       * Displayed when file validation or the upload workflow fails.
       */}
      {status === "error" && (
        <div className="w-full max-w-lg">
          <div className="border-2 border-dashed border-red-300 rounded-lg p-12 text-center bg-red-50">
            <p className="text-red-600 font-medium">{errorMessage}</p>
          </div>
          {/*
           * Reset the upload state so the user can select
           * another file and try again.
           */}
          <button
            onClick={() => {
              setStatus("idle");
              setFile(null);
              setErrorMessage("");
            }}
            className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Try Again
          </button>
        </div>
      )}

      {/*
       * UPLOADING STATE
       *
       * Displayed after a valid file has been selected.
       * The actual upload begins when the user clicks Upload.
       */}
      {status === "uploading" && (
        <div className="w-full max-w-lg border-2 border-dashed border-indigo-300 rounded-lg p-12 text-center bg-indigo-50">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Uploading...</p>
          {/* Display the selected file name */}
          {file && <p className="text-sm text-gray-500 mt-2">{file.name}</p>}
        </div>
      )}

     {/*
       * PROCESSING STATE
       *
       * Displayed after the upload operation while the
       * document is being processed.
       */}
      {status === "processing" && (
        <div className="w-full max-w-lg border-2 border-dashed border-indigo-300 rounded-lg p-12 text-center bg-indigo-50">
          {/* Loading spinner */}
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-indigo-700 font-medium">Processing file...</p>
          <p className="text-sm text-gray-500 mt-2">Validating format and size</p>
        </div>
      )}

      {/*
       * SUCCESS STATE
       *
       * Displayed when the upload and processing workflow
       * has completed successfully.
       */}
      {status === "success" && (
        <div className="w-full max-w-lg border-2 border-dashed border-green-300 rounded-lg p-12 text-center bg-green-50">
          <p className="text-green-700 font-medium mb-2">Successfully uploaded!</p>
          <p className="text-sm text-gray-600">Kindly wait as Doc Reviewer redirects you to the review page...</p>
        </div>
      )}

      {/*
       * UPLOAD ACTION
       *
       * Display the Upload button when the component is in
       * the "uploading" or "processing" state.
       *
       * Because "uploading" is currently also used to represent
       * "file selected and ready to upload", the naming of this
       * state may be refined later when a real upload API is added.
       */}
      {status !== "idle" && status !== "error" && status !== "success" && (
        <button
          onClick={handleUpload}
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Upload
        </button>
      )}
    </div>
  );
}
