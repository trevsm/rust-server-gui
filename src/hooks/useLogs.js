import create from "zustand"

export const useLogs = create((set) => ({
  logs: [],
  clearLogs: () => set({ logs: [] }),
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
}))
