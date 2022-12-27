import React from "react"
import { Stack, Button, Grid } from "@mui/material"

import StopIcon from "@mui/icons-material/Stop"
import PlayArrow from "@mui/icons-material/PlayArrow"
import RestartAlt from "@mui/icons-material/RestartAlt"
import Construction from "@mui/icons-material/Construction"
import SettingsIcon from "@mui/icons-material/Settings"

export default function ServerTools() {
  return (
    <Grid item xs={12} height="auto">
      <Stack direction="row" flexWrap="wrap" gap={2}>
        <Button variant="contained" color="start">
          Launch <PlayArrow />
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
        <Button variant="contained" color="update" disabled>
          Settings <SettingsIcon />
        </Button>
      </Stack>
    </Grid>
  )
}
