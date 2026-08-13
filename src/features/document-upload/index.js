"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";


//Define the acceptable file types and maximum file size
const ALLOWED_TYPES = [".txt", ".doc", ".docx"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function UploadSection() {
    const router = useRouter();
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
   
    // verify that the file extension is allowed
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


     //verify that the uploaded file is of the correct size and type and is ready for uploading.
    const handleFileChange = (e) => {    
    const selectedFile = e.target.files?.[0];     // Retrieve the first selected file.     
    
    if (!selectedFile) return;    // Stop if the user did not select a file.
    const validationError = validateFile(selectedFile);  // Validate the selected file before storing it in state. 
    if (validationError) {
      // Display the validation error.
      setErrorMessage(validationError);
      // Change the UI to the error state.
      setStatus("Validation failed");
      return;
    }

    // Store the file as a broswer object and clear any previous error.
    setFile(selectedFile);
    setErrorMessage("");
    /*
     * Move the interface to the uploading state.
     *
     * NOTE:
     * In this demo, the actual upload begins only when the user clicks the Upload button below.
     */
    setStatus("verification passed, file ready for uploading");
    console.log("verification passed, file ready for uploading")
  };

   // Handles the upload workflow.
  const handleUpload = async () => {

    // create a package for storing the uploaded file
    const formData = new FormData();
    formData.append("file", file);    //add the file to the package
    

    // There is nothing to upload if no file is selected.
    if (!file) return;

    try {
      // update the user that uploading has begun 
      setStatus("uploading file");
      // Simulate upload delay.
      await new Promise((resolve) => setTimeout(resolve, 1500));
      //upload file
      const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      });
      console.log("file uploaded successfully");
      // Upload has completed; move to the processing stage.
      setStatus("processing uploaded file");

      // Simulate processing/validation delay (Simulate server-side document processing.)  
      await new Promise((resolve) => setTimeout(resolve, 1500));

       // The simulated workflow completed successfully.
      setStatus("upload completed");
      // Give the user time to see the success message  before navigating to the review page.
      setTimeout(() => {
        console.log("upload workflow completed. Redirecting to review...");
        router.push("/review");
      }, 1500);
    } catch {
      // Handle unexpected errors during the upload workflow.
      setErrorMessage("Upload failed. Please try again.");
      setStatus("upload error");
      // let the system display the error for 1.5 seconds 
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("idle");
    }
  };

    
    return (
    // <div className="flex flex-col items-center justify-center min-h-[60vh] p-8"> 
    <div>   
      {/* drag and drop or upload files section*/}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center w-full max-w-lg">
        {/* drag and drop section */}
        <p className="text-gray-500">Drag and drop your file here</p>
         <p className="text-gray-500 mt-2"> or </p>
         {/* upload file section */}
        

         {status === "idle" && (
          <>
           
        {/*  only display the browse button when the system is idle */}
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
        {/* <p className="text-gray-300 mt-2"> Uploading : Proposal.docx (3.2) MB </p> */}
        {/* <p className="text-gray-500 text-sm">68% Done</p> */}
        </>
        )}

        {/* if validation fails display the following  */}
        {status === "validation failed" && (
          <>                
        <p className="text-sm text-gray-400 mt-2">Validation Failed </p>
        <p className="text-sm text-gray-400 mt-2">{errorMessage}</p>                   

         <button  className="mt-4 border border-red-600 text-red-400 bg-red-900 hover:text-white px-5 py-2 bg-red-400 px-5 py-2 rounded-md transition-all duration-200" >
              Cancel upload
            </button> 
          
          </>
        )}

        {/* if verification is successful, allow the user to upload the selected valid file to the server */}
        {status === "verification passed, file ready for uploading" && (
          <>
        <p className="text-sm text-gray-400 mt-2">File ready for uploading</p>
        <p className="text-sm text-gray-400 mt-2">You have selected: {file.name}</p>
        <p className="text-sm text-gray-400 mt-2">{file.size} MB</p>
        <button
            // onClick={() => fileInputRef.current.click()}
            onClick={handleUpload}
            className="mt-5 px-6 py-2 bg-blue-900 hover:bg-indigo-600 rounded-md transition" >
            Upload
          </button>        
        </>
        )}

        {/* update the user that the upload has begun */}
        {status === "uploading file" && (
          <>
        <p className="text-sm text-gray-400 mt-2">Uploading File</p>
        <p className="text-sm text-gray-400 mt-2">You are uploading: {file.name}</p>
        <p className="text-sm text-gray-400 mt-2">{file.size} MB</p>
        <button className="mt-4 border border-red-600 text-red-400 bg-red-900 hover:text-white px-5 py-2 bg-red-400 px-5 py-2 rounded-md transition-all duration-200" >
            Cancel 
          </button>        
        </>
        )}

         {/* update the user that the uploaded file is being processed  */}
        {status === "processing uploaded file" && (
          <>
        <p className="text-sm text-gray-400 mt-2">Procesing Uploaded File</p>
        <p className="text-sm text-gray-400 mt-2"> {file.name} is being processed</p>
        <p className="text-sm text-gray-400 mt-2">{file.size} MB</p>
        <button className="mt-4 border border-red-600 text-red-400 bg-red-900 hover:text-white px-5 py-2 bg-red-400 px-5 py-2 rounded-md transition-all duration-200" >
            Cancel 
          </button>        
        </>
        )}

         {/* update the user that the file upload is completed  */}
        {status === "upload completed" && (
          <>
        <p className="text-sm text-gray-400 mt-2">Uploading complete </p>
        <p className="text-sm text-gray-400 mt-2"> You have uploaded: {file.name} </p>
        <p className="text-sm text-gray-400 mt-2">{file.size} MB</p>
        <p className="text-sm text-gray-400 mt-2">Kindly wait as the system redirects you to the review section </p>

        
        </>
        )}

        {/* if uploading fail   */}
        {status === "upload error" && (
          <>
        <p className="text-sm text-gray-400 mt-2">Upload Failed due to an error during uploading </p>
        {/* <p className="text-sm text-gray-400 mt-2">  </p> */}
        <p className="text-sm text-gray-400 mt-2">uploaded 0 files of 1 </p>
        
        
        {/* allow the user to start the upload process again */}
        {/* {setStatus("idle")} */}

        
        </>
        )}
        

    

        {/* <button
              // onClick={handleUpload}
              // disabled={uploading}
              className="mt-4 border border-red-600 text-red-400 bg-red-900 hover:text-white px-5 py-2 bg-red-400 px-5 py-2 rounded-md transition-all duration-200"
            >
              Cancel upload
            </button> */}
        
        </div>
      
      
      
    </div>
  

  
    );
    
}