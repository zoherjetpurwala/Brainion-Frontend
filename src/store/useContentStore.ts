import { create } from "zustand";

interface ContentState {
  contentUpdated: boolean;
  triggerUpdate: () => void;
}

export const useContentStore = create<ContentState>((set) => ({
  contentUpdated: false,
  triggerUpdate: () => set({ contentUpdated: true }),
}));