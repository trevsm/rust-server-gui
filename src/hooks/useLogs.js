import create from "zustand"

export const useLogs = create((set) => ({
  logs: [],
  resetLogs: () => set({ logs: [] }),
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
}))
