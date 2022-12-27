import React from "react"
import { useLogs } from "./useLogs"
import { red, blue, green } from "@mui/material/colors"

export const useProcess = ({ onClose, onError, onData }) => {
  const { addLog } = useLogs()

  const process = (command, args) => {
    addLog({
      text: "$ " + command + " " + args.join(" "),
      color: blue[400],
    })

    // execute ls command using child_process
    const { spawn } = require("child_process")
    const child = spawn(command, args)

    // on data event, print the output
    child.stdout.on("data", (raw) => {
      const data = raw.toString()
      addLog({ text: data })
      onData && onData(data)
    })

    // on error event, print the error
    child.stderr.on("data", (raw) => {
      const data = raw.toString()
      addLog({ text: data, color: red[400] })
      onError && onError(data)
    })

    // on close event, print the exit code
    child.on("close", (code) => {
      addLog({ text: `Process exited with code ${code}`, color: green[400] })
      onClose && onClose(code)
    })

    return child
  }

  return { process }
}
