import React, { useCallback, useEffect, useRef, useState } from "react"
import { useProcess } from "../hooks/useProcess"
import "./app.css"

const App = () => {
  const logState = useState([]) // {color:string, text:string}[]
  const [logs] = logState

  const preRef = useRef(null)

  const scrollDown = () => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight
    }
  }

  const { process } = useProcess(logState, {
    onData: (data) => {
      scrollDown()
    },
    onClose: (code) => {
      console.log("Process exited with code", code)
    },
    onError: (error) => {
      console.log("Process exited with error", error)
    },
  })

  const handleStart = () => {
    // ping google for 20 seconds
    process("ping google.com -t -w 20000")
  }
  return (
    <>
      <div className="tools">
        <button onClick={handleStart}>Start</button>
      </div>
      <pre ref={preRef}>
        {logs.map(({ text, color }, index) => {
          if (color) {
            return (
              <div key={index} style={{ color }}>
                {text}
              </div>
            )
          }
          return <div key={index}>{text}</div>
        })}
      </pre>
    </>
  )
}

export default App
