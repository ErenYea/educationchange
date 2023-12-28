import create from 'zustand';

export const useNotificationStore = create((set) => ({
  showNotification: false,
  toggleShowNotification: () => set((state) => ({ showNotification: !state.showNotification })),
}));