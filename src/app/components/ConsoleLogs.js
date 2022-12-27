import React from "react"
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
    border: "none",
    borderRadius: "100%",
    width: "12px",
    height: "12px",
  },
}))

export default function ConsoleLogs() {
  const { logs } = useLogs()
  return (
    <Grid item xs={12} height="calc(100% - 95px)" minHeight={200}>
      <Item
        sx={{
          height: "100%",
          maxHeight: "100%",
          background: "#373f4a",
          color: "white",
          padding: 0,
          overflow: "auto",
          button: {
            pointerEvents: "none",
          },
        }}
      >
        <TerminalBar>
          <Stack gap={1} direction="row">
            <button style={{ backgroundColor: red[500] }} />
            <button style={{ backgroundColor: orange[500] }} />
            <button style={{ backgroundColor: green[500] }} />
          </Stack>
        </TerminalBar>
        <pre>
          {!(logs.length > 0)
            ? "Console is empty"
            : logs.map((log, i) => <div key={i}>{log}</div>)}
        </pre>
      </Item>
    </Grid>
  )
}
