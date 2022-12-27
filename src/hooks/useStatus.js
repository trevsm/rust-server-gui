import create from "zustand"

export const useStatus = create((set, get) => ({
  status: "stopped", // stopped, running
  isRunning: () => get().status === "running",
  isStopped: () => get().status === "stopped",
  setStatus: (status) => set({ status }),
}))
