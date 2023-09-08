import React, { useEffect } from "react"
import { useProcess } from "./useProcess"
import { useStatus } from "./useStatus"
import { useLogs } from "./useLogs"
import { exec } from "child_process"

const launchConfig = {
  executable: `C:\\rustserver\\RustDedicated.exe -batchmode -nographics`,
  args: {
    "server.maxplayers": 50,
    "server.worldsize": 4000,
    "server.hostname": "My Rust Server",
    "server.description": "My Rust Server Description",
    "server.url": "http://www.example.com",
    "server.headerimage": "http://www.example.com/header.jpg",
    "server.identity": "server1",
    "server.port": 28015,
    "server.level": "Procedural Map",
    "server.seed": 1234,
    "rcon.port": 28016,
    "rcon.web": 1,
    "rcon.password": `"letmein"`,
  },
  options: {
    shell: true,
    cwd: `C:\\rustserver\\`,
  },
}

const updateConfig = {
  executable: `C:\\steamcmd\\steamcmd.exe`,
  args: {
    login: "anonymous",
    force_install_dir: "C:\\rustserver\\",
    app_update: 258550,
    quit: "",
  },
  options: {
    shell: true,
    cwd: `C:\\rustserver\\`,
  },
}

export default function useRustServer() {
  const { clearLogs } = useLogs()
  const { setStatus, isRunning, isStopped, isRestarting } = useStatus()

  const killRustDedicated = () => {
    exec("taskkill /F /IM RustDedicated.exe", () => {}, {
      shell: true,
    })
  }

  const { spawnProcess, killProcess, writeToProcess } = useProcess({
    onData: () => {
      if ((isStopped() || isRestarting()) && !isRunning()) setStatus("running")
    },
    onError: () => {
      if (isRunning()) setStatus("stopped")
    },
    onClose: () => {
      if (isRunning()) setStatus("stopped")
    },
  })

  const runCommand = (executable, argsObject, options) => {
    let args = []

    for (const [key, value] of Object.entries(argsObject || {})) {
      if (typeof value === "string" && value.includes(" ")) {
        args.push(`+${key} "${value}"`)
      } else {
        args.push(`+${key} ${value}`)
      }
    }

    clearLogs()
    spawnProcess(executable, args, options)
  }

  const update = () =>
    runCommand(updateConfig.executable, updateConfig.args, updateConfig.options)

  const launch = () =>
    runCommand(launchConfig.executable, launchConfig.args, launchConfig.options)

  const restart = () => {
    setStatus("restarting")
    stop()
    setTimeout(() => launch(), 1000)
  }

  const stop = () => {
    killProcess()
    killRustDedicated()
  }

  useEffect(() => {
    killRustDedicated()
  }, [])

  return { launch, stop, restart, update, execute: writeToProcess }
}
