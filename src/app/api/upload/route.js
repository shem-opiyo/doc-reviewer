import { mkdir, writeFile } from "fs/promises";
import path from "path";

/*
 * Allowed file extensions.
 *
 *      VALIDATE THE SIZE AND TYPE OF FILE
 *  This is server-side validation. Even though the frontend
 * also validates the file, the server must validate it again.
 */
const ALLOWED_TYPES = [".txt", ".doc", ".docx", ".pdf"];
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

/*       POST handler
* For handling the post request sent to: /api/upload
*/

export async function POST(request) {
try{
    // Extract the multipart/form-data sent by the browser to retrieve the file.
  const formData = await request.formData();
  const file = formData.get("file");            //Retrieve the uploaded file

  //verify that the file is actually provided / present, otherwise return an error response
   if (!file || typeof file === "string") {
      return Response.json(
        {
          success: false,
          message: "No file was uploaded.",
        },
        {
          status: 400,
        }
      );
    }
// confirm that the file has been received successfully
  console.log("Received file:", file?.name);

//   validate the recveived file
  const fileExtension =  "." + file.name.split(".").pop().toLowerCase();

  if (!ALLOWED_TYPES.includes(fileExtension)) {
      return Response.json(
        {
          success: false,
          message: `Unsupported file format. Allowed formats: ${ALLOWED_TYPES.join(
            ", "
          )}`,
        },
        {
          status: 400,
        }
      );
    }

// Validate the size
    if (file.size > MAX_SIZE_BYTES) {
      return Response.json(
        {
          success: false,
          message: `File size exceeds the ${MAX_SIZE_MB} MB limit.`,
        },
        {
          status: 400,
        }
      );
    }
//Define where uploaded files will be stored.
    const uploadDirectory = path.join(
      process.cwd(),            //Joins the root of the Next.Js project(docReviewer/) with storage and uploads directories
      "storage",
      "uploads"
    );
//   Make sure the storage directory exists, or create them if they do not exist (; through the "recursive:true" option)
    await mkdir(uploadDirectory, { recursive: true });
//Convert the uploaded file into an ArrayBuffer.
const bytes = await file.arrayBuffer();
//Convert the ArrayBuffer into a Node.js Buffer.
const buffer = Buffer.from(bytes);
// Create the complete path where the file will be saved.
const filePath = path.join(
      uploadDirectory,
      file.name
    ); 
// store the file (physically save the uploaded file to your local computer)
await writeFile(filePath, buffer);
//Return a successful response to the frontend.
return Response.json(
      {
        success: true,
        message: "File uploaded successfully.",
        fileName: file.name,
      },
      {
        status: 200,
      }
    );


//   return Response.json({
//     message: "File received successfully",
//   });
}
//end of try
 catch (error) {
    console.error("File upload error:", error);

    return Response.json(
      {
        success: false,
        message: "An error occurred while uploading the file.",
      },
      {
        status: 500,
      }
    );
  }
}

