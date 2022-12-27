import create from "zustand"

export const useStatus = create((set, get) => ({
  status: "stopped", // stopped, running, restarting, updating
  isRunning: () => get().status === "running",
  isStopped: () => get().status === "stopped",
  isRestarting: () => get().status === "restarting",
  isUpdating: () => get().status === "updating",
  setStatus: (status) => set({ status }),
  clearSecondaryStatus: () => set({ secondaryStatus: null }),
}))
