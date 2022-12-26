import React, { useEffect } from "react"

const App = () => {
  useEffect(() => {
    // execute ls command using child_process
    const { exec } = require("child_process")
    exec("ls", (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`)
        return
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
    })
  }, [])
  return <div>Hello World</div>
}

export default App
