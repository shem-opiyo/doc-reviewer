import mammoth from "mammoth";              // for reading  Word .docx files
import { readFile } from "fs/promises";     // for reading files asynchronously
import path from "path";                // to work with file and directory paths

// Define the absolute path to the folder where uploaded files are stored
const UPLOAD_DIR = path.join(process.cwd(), "storage", "uploads");

// Export an async function that takes a file name and extracts its text content
export async function extractText(fileName) {
  // Get the file extension from the file name and convert it to lowercase
  const ext = "." + fileName.split(".").pop().toLowerCase();
  
  // Create the full file path by combining the upload directory and file name
  const filePath = path.join(UPLOAD_DIR, fileName);

  // Check if the file is a plain text file
  if (ext === ".txt") {
    // Read the text file using utf-8 encoding and return its contents
    const content = await readFile(filePath, "utf-8");
    return content;
  }

  // Check if the file is a modern Word document (.docx)
  if (ext === ".docx") {
    // Extract raw text from the .docx file using mammoth and return the text value
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  // Check if the file is an old binary Word document (.doc)
  if (ext === ".doc") {
    // Throw an error because old .doc binary files are not supported
    throw new Error("Binary .doc files are not supported for text extraction. Please convert to .docx or use .txt.");
  }

  // Throw an error if the file extension does not match any supported format
  throw new Error(`Unsupported file format: ${ext}`);
}