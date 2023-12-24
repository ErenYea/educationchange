"use server"

import db from "./db";

export async function addFile(id: string, email: string, uploadedFiles: Array<string>) {
    try {
        const filePromises = uploadedFiles.map(async (file: any) => {
            const requestBody = {
                namespace: `${email}-${file.Location.split('/')[file.Location.split('/').length-1]}`,
                metadata: {
                    type: "fileURL",
                    link: file.Location
                },
                fileURL: file.Location,
                openAIKey: process.env.NEXT_PUBLIC_DEFAULT_OPENAI__API_KEY,
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/embeddings/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            const data = await response.json();

            try {
              await db.topic.create({
                  data: { name: `${email}-${file.Location.split('/')[file.Location.split('/').length-1]}`, userId: id },
              });
              return { success: true, message: "successful", data: data };
            } catch {
              return { success: false, message: "unsuccessful", error: data.error };
            }

        });

        const results = await Promise.all(filePromises);
        return results;
    } catch (error) {
        return { success: false, message: "error" };
    }
}
