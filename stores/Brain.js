import create from 'zustand';

export const useBrainStore = create(set => ({
  brainName: "Default Brain",
  setBrainName: newName => set(state => ({ brainName: newName })),
}));
