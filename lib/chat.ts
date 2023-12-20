"use server"

import db from "./db";

export async function uploadCrawler(topicName: string, userInput: string, chatId:string) {
    try {
        const requestBody = {
            namespace: topicName,
            query: userInput,
            model: "gpt-3.5-turbo",
            openAIKey: process.env.NEXT_PUBLIC_DEFAULT_OPENAI__API_KEY,
            prompt: "",
            temperature: 0.5,
            maxTokens: 255,
        };
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/query`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        const data = await response.json()

        try {
            await db.message.create({
              data: { text: userInput, type: "user", chatId: chatId },
            });
    
            return { success: true, message: "successful", data: data };
        } catch (error) {
            return { success: false, message: "error" };
        }
          
    } catch (e) {
        console.log(e);
        return { success: false, message: "error" };
    }
}

export async function createAChat(userId: string) {
    try {
        await db.chat.create({
          data: { userId: userId },
        });

        return { success: true, message: "successful" };
    } catch (error) {
        return { success: false, message: "error" };
    }
}

