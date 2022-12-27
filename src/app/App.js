import React from "react"
import { styled } from "@mui/material/styles"
import { Grid, Input, Paper, Button, Stack, Checkbox } from "@mui/material"

import StopIcon from "@mui/icons-material/Stop"
import PlayArrow from "@mui/icons-material/PlayArrow"
import RestartAlt from "@mui/icons-material/RestartAlt"
import Construction from "@mui/icons-material/Construction"

import "./app.css"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}))

const App = () => {
  return (
    <Grid container spacing={2} alignItems="flex-start" p={2} height={1}>
      <Grid item xs={12} height="auto">
        <Stack direction="row" flexWrap="wrap" gap={2}>
          <Button variant="contained" color="start">
            Start <PlayArrow />
          </Button>
          <Button variant="contained" color="restart" disabled>
            Restart <RestartAlt />
          </Button>
          <Button variant="contained" color="stop" disabled>
            Stop <StopIcon />
          </Button>
          <Button variant="contained" color="update" disabled>
            Update <Construction />
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12} height="calc(100% - 110px)" minHeight={200}>
        <Item sx={{ height: "100%", maxHeight: "100%" }}>
          <pre>Logs</pre>
        </Item>
      </Grid>
      <Grid item xs={12}>
        <Stack spacing={2} direction="row">
          <Item>
            <Checkbox
              defaultChecked
              color="primary"
              inputProps={{ "aria-label": "controlled" }}
            />
          </Item>
          <Item sx={{ width: "100%" }}>
            <Input fullWidth placeholder="Command" />
          </Item>
          <Button variant="contained" color="primary">
            Send
          </Button>
        </Stack>
      </Grid>
    </Grid>
  )
}

export default App
