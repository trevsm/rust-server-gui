import React, { useEffect, useState } from "react"
import { useProcess } from "./useProcess"
import { useStatus } from "./useStatus"
import { useLogs } from "./useLogs"
import { exec } from "child_process"

export default function useRustServer() {
  const { clearLogs } = useLogs()
  const { setStatus, isRunning, isStopped, isRestarting } = useStatus()

  const killRustDedicated = () => {
    exec("taskkill /F /IM RustDedicated.exe", () => {}, {
      shell: true,
    })
  }

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

  const update = () => {
    clearLogs()
    currentProcess.current = process(
      "C:\\steamcmd\\steamcmd.exe",
      [
        "+login anonymous",
        "+force_install_dir C:\\rustserver\\",
        "+app_update 258550",
        "+quit",
      ],
      {
        shell: true,
        cwd: "C:\\steamcmd\\",
      }
    )
  }

  const launch = () => {
    clearLogs()
    currentProcess.current = process(
      `C:\\rustserver\\RustDedicated.exe -batchmode -nographics`,
      [
        `+server.port 28015`,
        `+server.level "Procedural Map"`,
        `+server.seed 1234`,
        `+server.maxplayers 50`,
        `+server.worldsize 4000`,
        `+server.hostname "My Rust Server"`,
        `+server.description "My Rust Server Description"`,
        `+server.url "http://www.example.com"`,
        `+server.headerimage "http://www.example.com/header.jpg"`,
        `+server.identity "server1"`,
        `+rcon.port 28016`,
        `+rcon.web 1`,
        `+rcon.password "letmein"`,
      ],
      {
        shell: true,
        cwd: `C:\\rustserver\\`,
      }
    )
  }

  const stop = () => {
    currentProcess.current && currentProcess.current.kill()
    killRustDedicated()
  }

  const restart = () => {
    setStatus("restarting")
    stop()
    setTimeout(() => launch(), 1000)
  }

  useEffect(() => {
    killRustDedicated()
  }, [])

  return { launch, stop, restart, update }
}
