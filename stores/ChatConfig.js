import create from 'zustand';

export const useChatConfig = create(() => ({
  model: "gpt-3.5-turbo",
  temperature: 0.5,
  maxTokens: 256,
}));