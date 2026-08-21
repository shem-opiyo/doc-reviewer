import { extractText } from "@/lib/extractText";            // Custom text extraction helper utility

// Export an async GET request handler for the API endpoint
export async function GET(request) {
  try {
    // Parse the incoming request URL to extract query parameters
    const { searchParams } = new URL(request.url);
    // Retrieve the value of the "filename" query parameter (?filename=yourfile.txt)
    const fileName = searchParams.get("filename");

    // Validate that a filename was actually provided in the request
    if (!fileName) {
      // Return a 400 Bad Request error if the filename is missing
      return Response.json(
        { success: false, message: "Filename is required." },
        { status: 400 }
      );
    }

    // Basic path traversal protection
    // Reject filenames containing relative paths or directory slashes to prevent unauthorized file access
    if (fileName.includes("..") || fileName.includes("/") || fileName.includes("\\")) {
      // Return a 400 Bad Request error if suspicious characters are found
      return Response.json(
        { success: false, message: "Invalid filename." },
        { status: 400 }
      );
    }

    // Call the utility function to read and extract text content from the file
    const content = await extractText(fileName);

    // Return a successful JSON response containing the filename and extracted text string
    return Response.json({
      success: true,
      fileName,
      content,
    });
  } catch (error) {
    // Log the error details to the server console for debugging
    console.error("Error reading document:", error);
    
    // Determine the error message; check if it is a standard Node.js "File Not Found" (ENOENT) error
    const message =
      error.message === "ENOENT"
        ? "File not found."
        : error.message || "Failed to read document.";

    // Return an error JSON response, mapping ENOENT to a 404 Not Found, otherwise a 500 Server Error
    return Response.json(
      { success: false, message },
      { status: error.message === "ENOENT" ? 404 : 500 }
    );
  }
}
