"use server"

import db from "./db";

export async function generateMessage(topicName: string, userInput: string, chatId:string, prompt: string, model: string, temperature: number, maxTokens: number) {
    try {
        const requestBody = {
            namespace: topicName,
            query: userInput,
            model: model,
            openAIKey: process.env.NEXT_PUBLIC_DEFAULT_OPENAI__API_KEY,
            prompt: prompt,
            temperature: temperature,
            maxTokens: maxTokens,
        };
        console.log(requestBody)
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

            await db.message.create({
                data: { text: data.answer, type: "system", chatId: chatId },
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
          data: { userId: userId, name: "New Chat" },
        });

        return { success: true, message: "successful" };
    } catch (error) {
        return { success: false, message: "error" };
    }
}

export async function deleteAChat(chatId: string) {
    try {
        await db.message.deleteMany({
            where: {
                chatId: chatId,
            },
        });

        await db.chat.delete({
            where: {
                id: chatId,
            },
        });

        return { success: true, message: "Chat and associated messages deleted successfully" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error deleting chat and messages" };
    }
}

export async function getAllChats(userId: string) {
    const chats = await db.chat.findMany({
        where: { userId: userId },
    });
    return { success: true, message: "successful", data: chats };
}

export async function createABrain(userId: string, brainName: string) {
    try {
        await db.topic.create({
          data: { userId: userId, name: brainName },
        });

        return { success: true, message: "Brain created successfully" };
    } catch (error) {
        return { success: false, message: "error" };
    }
}

export async function getAllBrains(userId: string) {
    const topicsResponse = await db.topic.findMany({
        where: { userId: userId },
    });
    return { success: true, message: "successful", data: topicsResponse };
}


export async function getAllTopics(userId: string) {
    const topicsResponse = await db.topic.findMany({
        where: { userId: userId },
    });
    const topics = topicsResponse.map(topic => topic.name)
    const details = await getTopicDetails(topics)
    return { success: true, message: "successful", data: details };
}

export async function getAllMessages(chatId: string) {
    const messages = await db.message.findMany({
        where: { chatId: chatId },
    });
    return { success: true, message: "successful", data: messages };
}

export async function getTopicDetails(topics: String[]) {
    try {
        const requestBody = {
            "namespace": topics
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/fetch`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        const data = await response.json()
        return data

    } catch (e) {
        return { success: false, message: "error" };
    }
}