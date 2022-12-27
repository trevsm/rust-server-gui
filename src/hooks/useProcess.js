import React from "react"
import { useLogs } from "./useLogs"
import { red, blue, green } from "@mui/material/colors"

export const useProcess = ({ onClose, onError, onData }) => {
  const { logs, addLog, resetLogs } = useLogs()

  const process = (command) => {
    if (logs.length > 0) {
      resetLogs()
    }

    addLog({
      text: "$ " + command,
      color: blue[400],
    })

    // execute ls command using child_process
    const { exec } = require("child_process")
    const p = exec(command)

    // on data event, print the output
    p.stdout.on("data", (data) => {
      addLog({ text: data })
      onData && onData(data)
    })

    // on error event, print the error
    p.stderr.on("data", (data) => {
      addLog({ text: data, color: red[400] })
      onError && onError(data)
    })

    // on close event, print the exit code
    p.on("close", (code) => {
      addLog({ text: `Process exited with code ${code}`, color: green[400] })
      onClose && onClose(code)
    })
  }

  return { process }
}
