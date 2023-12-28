"use server";

export async function addFile(email: string, uploadedFiles: Array<string>) {
  try {
    const filePromises = uploadedFiles.map(async (file: any) => {
      const requestBody = {
        namespace: email,
        metadata: {
          type: "fileURL",
          link: file.Location,
        },
        fileURL: file.Location,
        openAIKey: process.env.NEXT_PUBLIC_DEFAULT_OPENAI__API_KEY,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/embeddings/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      return { success: true, message: "successful", data: data };
    });

    const results = await Promise.all(filePromises);
    return results;
  } catch (error) {
    return { success: false, message: error };
  }
}
