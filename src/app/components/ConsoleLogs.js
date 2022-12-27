import React, { useEffect, useRef, useState } from "react"
import { useLogs } from "../../hooks/useLogs"
import { Grid, Stack } from "@mui/material"
import { Item } from "./Item"
import { styled } from "@mui/system"
import { red, orange, green } from "@mui/material/colors"

const TerminalBar = styled("div")(() => ({
  background: "white",
  padding: "10px",
  display: "flex",
  button: {
    cursor: "pointer",
    border: "none",
    borderRadius: "100%",
    width: "12px",
    height: "12px",
  },
  "button:not(.clearConsole)": {
    pointerEvents: "none",
  },
  ".clearConsole": {
    outline: "none",
    marginLeft: "auto",
    height: "unset",
    width: "unset",
    background: "white",
    textDecoration: "underline",
  },
}))

const ScrollStatus = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  padding: "5px",
  div: {
    padding: "5px 8px",
    background: "#292c32",
    borderRadius: "10px",
  },
}))

export default function ConsoleLogs() {
  const [userScrolled, setUserScrolled] = useState(false)
  const { logs, clearLogs } = useLogs()
  const logsRef = useRef(null)

  useEffect(() => {
    // scroll to bottom of logs
    if (!userScrolled) logsRef.current.scrollTop = logsRef.current.scrollHeight
  }, [logs])

  const atBottom = () =>
    Math.floor(logsRef.current.scrollHeight - logsRef.current.scrollTop) ===
    logsRef.current.offsetHeight

  useEffect(() => {
    const handleScroll = () => {
      if (!atBottom()) {
        setUserScrolled(true)
      } else setUserScrolled(false)
    }

    logsRef.current.addEventListener("scroll", handleScroll)

    return () => {
      logsRef.current.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <Grid item xs={12} height="calc(100% - 95px)" minHeight={200}>
      <Item
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          maxHeight: "100%",
          background: "#373f4a",
          color: "white",
          padding: 0,
          overflow: "auto",
        }}
      >
        <TerminalBar>
          <Stack
            gap={1}
            direction="row"
            alignItems="center"
            sx={{
              width: "100%",
            }}
          >
            <button style={{ backgroundColor: red[500] }} />
            <button style={{ backgroundColor: orange[500] }} />
            <button style={{ backgroundColor: green[500] }} />
            <button className="clearConsole" onClick={clearLogs}>
              Clear Console
            </button>
          </Stack>
        </TerminalBar>
        <pre
          ref={logsRef}
          style={{
            overflow: "auto",
            height: "100%",
          }}
        >
          {!(logs.length > 0)
            ? "Console cleared."
            : logs.map(({ text, color }, i) => {
                if (color)
                  return (
                    <span key={i} style={{ color }}>
                      {text}
                    </span>
                  )

                return <span key={i}>{text}</span>
              })}
          <ScrollStatus>{!userScrolled && <div>Auto Scroll</div>}</ScrollStatus>
        </pre>
      </Item>
    </Grid>
  )
}
