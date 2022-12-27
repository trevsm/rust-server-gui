import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { StyledEngineProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import { blue, green, red, orange } from "@mui/material/colors"
import { ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    start: {
      main: blue[400],
      light: blue[100],
      dark: blue[500],
      contrastText: "#fff",
    },
    restart: {
      main: green[400],
      light: green[100],
      dark: green[500],
      contrastText: "#fff",
    },
    stop: {
      main: red[400],
      light: red[100],
      dark: red[500],
      contrastText: "#fff",
    },
    update: {
      main: orange[400],
      light: orange[100],
      dark: orange[500],
      contrastText: "#fff",
    },
  },
})

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StyledEngineProvider>,
  document.getElementById("app")
)
