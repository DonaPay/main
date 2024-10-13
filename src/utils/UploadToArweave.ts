import axios from "axios";

export async function uploadToArweave(file: File) {
  const formData = new FormData();
  formData.append("Image", file);

  try {
    const response = await axios.post("/api/uploadToArweave", formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.status === 200 ? response.data.hash : "error";
  } catch (error) {
    console.error("Error uploading to Arweave:", error);
    return "error"; 
  }
}
