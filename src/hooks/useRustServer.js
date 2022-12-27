import React from "react"
import { useProcess } from "./useProcess"
import { useStatus } from "./useStatus"

export default function useRustServer() {
  const { setStatus, isRunning, isStopped } = useStatus()
  const { process } = useProcess({
    onData: (data) => {
      if (isStopped()) setStatus("running")
    },
    onError: (data) => {
      if (isRunning()) setStatus("stopped")
    },
    onClose: (code) => {
      if (isRunning()) setStatus("stopped")
    },
  })

  const launch = () => {
    process("ping google.com")
  }

  return { launch }
}
