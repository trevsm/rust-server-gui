import React from "react"
import { useProcess } from "./useProcess"
import { useStatus } from "./useStatus"
import { useLogs } from "./useLogs"

export default function useRustServer() {
  const { setStatus, isRunning, isStopped } = useStatus()
  const { resetLogs } = useLogs()
  const currentProcess = React.useRef(null)

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
    resetLogs()
    currentProcess.current = process("ping", ["google.com"])
  }

  const stop = () => {
    currentProcess.current && currentProcess.current.kill()
  }

  const restart = () => {
    stop()
    setTimeout(() => launch(), 100)
  }

  return { launch, stop, restart }
}
