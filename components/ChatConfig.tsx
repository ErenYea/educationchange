"use client";

import React, { useState } from "react";

const ChatConfig = () => {
  const [model, setModel] = useState("gpt-3.5-turbo");
  const [temperature, setTemperature] = useState(0.5);
  const [maxTokens, setMaxTokens] = useState(256);

  const handleModelChange = (e: any) => {
    setModel(e.target.value);
  };

  const handleTemperatureChange = (e: any) => {
    setTemperature(parseFloat(e.target.value));
  };

  const handleMaxTokensChange = (e: any) => {
    setMaxTokens(parseInt(e.target.value));
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
        <button
          className="px-8 py-3 text-sm disabled:opacity-80 text-center font-medium rounded-md focus:ring ring-primary/10 outline-none flex items-center justify-center gap-2 bg-[#00121f] border border-black dark:border-white disabled:bg-gray-500 disabled:hover:bg-gray-500 text-white dark:bg-white dark:text-black hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors mt-12 self-end"
          type="submit"
        >
          Save
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            className="text-xl"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="none" d="M0 0h24v24H0z"></path>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
          </svg>{" "}
        </button>
      </div>
    </div>
  );
};

export default ChatConfig;
