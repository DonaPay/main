import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

// Ensure that your API key is set in your environment variables
const AKORD_API_KEY = process.env.AKORD_API_KEY!;

export async function POST(req: NextRequest) {
  try {
    // Parse the FormData from the incoming request
    const data = await req.formData();
    const Image = data.get("Image") as File;

    if (!Image) {
      return NextResponse.json({ message: "No image file provided" }, { status: 400 });
    }

    // Create a new FormData object for the Akord API request
    const formData = new FormData();
    formData.append("file", Image); // This might depend on Akord API's expected field name

    // Send the file to the Akord API
    const response = await axios.post("https://api.akord.com/files", formData, {
      headers: {
        Accept: "application/json",
        "Api-Key": AKORD_API_KEY,
        "Content-Type": "multipart/form-data", // Correct content type for file uploads
      },
    });

    console.log("response in API route", response);

    // Return the hash and status in the response
    return NextResponse.json({ hash: response.data.tx.id, status: 200 });
  } catch (error: any) {
    console.error("Error uploading to Arweave:", error);

    return NextResponse.json({ message: "Upload failed", error: error.message }, { status: 500 });
  }
}
