import React, { useEffect } from "react"

export const useProcess = (logState, { onClose, onError, onData }) => {
  // {color:string, text:string}[]
  const [logs, setLogs] = logState

  const process = (command) => {
    if (logs.length > 0) {
      setLogs([])
    }

    // add command to logs
    setLogs((prevLogs) => [
      ...prevLogs,
      {
        text: "$ " + command,
        color: "#a7f3ff",
      },
    ])

    // execute ls command using child_process
    const { exec } = require("child_process")
    const p = exec(command)

    // on data event, print the output
    p.stdout.on("data", (data) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          text: data,
        },
      ])
      onData && onData(data)
    })

    // on error event, print the error
    p.stderr.on("data", (data) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          text: data,
          color: "red",
        },
      ])
      onError && onError(data)
    })

    // on close event, print the exit code
    p.on("close", (code) => {
      setLogs((prevLogs) => [
        ...prevLogs,
        {
          text: `Process exited with code ${code}`,
          color: "green",
        },
      ])
      onClose && onClose(code)
    })

    return p
  }

  // clean up process on unmount
  useEffect(() => {
    return () => {
      process.kill()
    }
  }, [])

  return { process }
}
