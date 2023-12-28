"use server";

export async function uploadCrawler(
  email: string,
  webUrlInput: string
) {
  try {
    const requestBody = {
      namespace: email,
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
    return { success: true, message: "successful", data: data };
  } catch (e) {
    console.log(e);
    return { success: false, message: "error" };
  }
}