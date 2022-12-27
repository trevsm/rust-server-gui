import React from "react"
import ReactDOM from "react-dom"
import App from "./app/App"
import { StyledEngineProvider } from "@mui/material/styles"
import { createTheme } from "@mui/material/styles"
import { blue, green, red, orange, grey } from "@mui/material/colors"
import { ThemeProvider } from "@mui/material/styles"

const theme = createTheme({
  palette: {
    primary: {
      main: blue[400],
      light: blue[100],
      dark: blue[500],
      contrastText: "#fff",
    },
    secondary: {
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
    settings: {
      main: grey[700],
      light: grey[500],
      dark: grey[800],
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
