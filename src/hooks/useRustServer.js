import React, { useState } from "react"
import { useProcess } from "./useProcess"
import { useStatus } from "./useStatus"
import { useLogs } from "./useLogs"

export default function useRustServer() {
  const { clearLogs } = useLogs()
  const { setStatus, isRunning, isStopped, isRestarting } = useStatus()

  const currentProcess = React.useRef(null)

  const { process } = useProcess({
    onData: (data) => {
      if (isStopped() || isRestarting()) setStatus("running")
    },
    onError: (data) => {
      if (isRunning()) setStatus("stopped")
    },
    onClose: (code) => {
      if (isRunning()) setStatus("stopped")
    },
  })

  const launch = () => {
    clearLogs()
    currentProcess.current = process("ping", ["google.com", "-t", "-l", "1000"])
  }

  const stop = () => {
    currentProcess.current && currentProcess.current.kill()
  }

  const restart = () => {
    setStatus("restarting")
    stop()
    setTimeout(() => launch(), 1000)
  }

  return { launch, stop, restart }
}
