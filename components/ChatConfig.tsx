"use client";

import React from "react";
import { useChatConfig } from "@/stores/ChatConfig";

const ChatConfig = () => {
  const { model, temperature, maxTokens } = useChatConfig();

  const handleModelChange = (e: any) => {
    useChatConfig.setState({ model: e.target.value });
  };

  const handleTemperatureChange = (e: any ) => {
    useChatConfig.setState({ temperature: parseFloat(e.target.value) });
  };

  const handleMaxTokensChange = (e: any) => {
    useChatConfig.setState({ maxTokens: parseInt(e.target.value) });
  };

  return (
    <div className="w-[90vw] my-auto flex flex-col h-fit max-w-2xl rounded-xl bg-white dark:bg-[#00121f] border border-black/10 dark:border-white/25 p-10 shadow-xl dark:shadow-primary/50 focus:outline-none cursor-auto">
      <h2 className="m-0 text-2xl font-bold border-b border-grey pb-3">
        Chat configuration
      </h2>
      <p className="opacity-50 py-3">Adjust your chat settings</p>
      <div className="mt-10 flex flex-col items-center gap-2">
        <fieldset className="w-full flex flex-col">
          <label className="flex-1 text-sm">Model</label>
          <select
            className="px-5 py-2 dark:bg-gray-700 bg-gray-200 rounded-md"
            value={model}
            onChange={handleModelChange}
          >
            <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
            <option value="gpt-3.5-turbo-16k">gpt-3.5-turbo-16k</option>
          </select>
        </fieldset>
        <fieldset className="w-full flex mt-4">
          <label className="flex-1">Temperature: {temperature}</label>
          <input
            id="temp"
            min="0"
            max="1"
            step="0.01"
            type="range"
            onChange={handleTemperatureChange}
          />
        </fieldset>
        <fieldset className="w-full flex mt-4">
          <label className="flex-1">Max tokens: {maxTokens}</label>
          <input
            min="10"
            max="500"
            type="range"
            onChange={handleMaxTokensChange}
          />
        </fieldset>
      </div>
    </div>
  );
};

export default ChatConfig;
