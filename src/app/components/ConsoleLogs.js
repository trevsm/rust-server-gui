import React from "react"
import { Grid } from "@mui/material"
import { Item } from "./Item"

export default function ConsoleLogs() {
  return (
    <Grid item xs={12} height="calc(100% - 110px)" minHeight={200}>
      <Item sx={{ height: "100%", maxHeight: "100%" }}>
        <pre>Console Logs</pre>
      </Item>
    </Grid>
  )
}
