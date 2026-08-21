import { readdir, stat } from "fs/promises";        // To read directories and check file stats
import path from "path";                //to securely resolve file and folder paths

// Define the absolute path to the directory where uploads are stored
const UPLOAD_DIR = path.join(process.cwd(), "storage", "uploads");

// Export an async GET handler (typically used in Next.js App Router or similar frameworks)
export async function GET() {
  try {
    // Pause the GET handler to check if the directory exists; throws an error if it is missing
    await stat(UPLOAD_DIR);
    // Read the directory contents and return an array of filenames found inside
    const files = await readdir(UPLOAD_DIR);

    // Map over filenames in parallel to look up metadata for each file
    const documents = await Promise.all(
      files.map(async (name) => {
        // Construct the full absolute path for the specific file
        const fullPath = path.join(UPLOAD_DIR, name);
        // Fetch filesystem details (like size and timestamps) for this file
        const stats = await stat(fullPath);
        
        // Return a clean metadata object for this specific document
        return {
          name, // The filename string
          size: stats.size, // File size in bytes
          lastModified: stats.mtime, // JavaScript Date object of the last modification
        };
      })
    );

    // Return a successful JSON response containing the list of document metadata
    return Response.json({ success: true, documents });
  } catch (error) {
    // Log any encountered error (e.g., missing directory) to the server console
    console.error("Error listing documents:", error);
    // Return a 500 Internal Server Error JSON response to the client
    return Response.json(
      { success: false, message: "Failed to list documents." },
      { status: 500 }
    );
  }
}
