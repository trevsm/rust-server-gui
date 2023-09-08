import React, { useRef } from "react"
import { useLogs } from "./useLogs"
import { red, green, blue } from "@mui/material/colors"

export const useProcess = ({ onClose, onError, onData, shouldLog = true }) => {
  const { addLog } = useLogs()
  const activeProcess = useRef()

  const spawnProcess = (command, args, config) => {
    if (activeProcess.current) {
      shouldLog &&
        addLog({ text: "A process is already running", color: red[400] })
      return
    }

    const { spawn } = require("child_process")
    const child = spawn(command, args, config)

    activeProcess.current = child

    shouldLog &&
      addLog({
        text: `Started process: ${command} ${args.join(" ")}`,
        color: blue[400],
      })

    child.stdout.on("data", (raw) => {
      const data = raw.toString()
      shouldLog && addLog({ text: data })
      onData && onData(data)
    })

    child.stderr.on("data", (raw) => {
      const data = raw.toString()
      shouldLog && addLog({ text: data, color: red[400] })
      onError && onError(data)
    })

    child.on("close", (code) => {
      activeProcess.current = null
      shouldLog &&
        addLog({
          text: `Process exited with code ${code}\n`,
          color: green[400],
        })
      onClose && onClose(code)
    })
  }

  const killProcess = () => {
    if (!activeProcess.current) {
      shouldLog &&
        addLog({ text: "No active process to kill\n", color: red[400] })
      return
    }

    activeProcess.current.kill("SIGTERM")
    activeProcess.current = null
    shouldLog &&
      addLog({ text: "Killed the active process\n", color: red[400] })
  }

  const writeToProcess = (data) => {
    if (!activeProcess.current) {
      shouldLog &&
        addLog({ text: "No active process to write to\n", color: red[400] })
      return
    }

    activeProcess.current.stdin.write(data + "\n")
    shouldLog && addLog({ text: "> " + data + "\n", color: blue[400] })
  }

  return { spawnProcess, killProcess, writeToProcess }
}
