import React from "react"
import { Grid } from "@mui/material"
import ServerTools from "./components/ServerTools"
import ConsoleLogs from "./components/ConsoleLogs"
import UserInput from "./components/UserInput"

import "./app.css"

const App = () => {
  return (
    <Grid container spacing={2} alignItems="flex-start" p={2} height={1}>
      <ServerTools />
      <ConsoleLogs />
      <UserInput />
    </Grid>
  )
}

export default App
