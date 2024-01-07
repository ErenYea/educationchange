"use server";

export async function uploadCrawler(
  email: string,
  brainName: string,
  webUrlInput: string
) {
  try {
    const requestBody = {
      namespace: email + brainName,
      metadata: {
        type: "webpage",
        link: webUrlInput,
      },
      webpage: webUrlInput,
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
    return { success: true, message: "Uploaded Successfully", data: data };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}

export async function extractVideo(
  email: string,
  brainName: string,
  youtubeUrlInput: string
) {
  try {
    const requestBody = {
      namespace: email + brainName,
      metadata: {
        type: "youtubeURL",
        link: youtubeUrlInput,
      },
      youtubeURL: youtubeUrlInput,
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
    return { success: true, message: "Uploaded Successfully", data: data };
  } catch (e) {
    return { success: false, message: "Something went wrong" };
  }
}