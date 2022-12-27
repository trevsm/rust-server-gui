import React from "react"
import { Stack, Button, Grid } from "@mui/material"
import { useStatus } from "../../hooks/useStatus"
import useRustServer from "../../hooks/useRustServer"

import StopIcon from "@mui/icons-material/Stop"
import PlayArrow from "@mui/icons-material/PlayArrow"
import RestartAlt from "@mui/icons-material/RestartAlt"
import Construction from "@mui/icons-material/Construction"
import SettingsIcon from "@mui/icons-material/Settings"

export default function ServerTools() {
  const { launch, stop, restart } = useRustServer()
  const { isRunning, isStopped } = useStatus()

  return (
    <Grid item xs={12} height="auto">
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{
          button: {
            textTransform: "none",
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={launch}
          disabled={isRunning()}
        >
          Launch <PlayArrow />
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={isStopped()}
          onClick={restart}
        >
          Restart <RestartAlt />
        </Button>
        <Button
          variant="contained"
          color="stop"
          disabled={isStopped()}
          onClick={stop}
        >
          Stop <StopIcon />
        </Button>
        <Button variant="contained" color="update" disabled={isRunning()}>
          Update <Construction />
        </Button>
        <Button variant="contained" color="settings">
          Settings <SettingsIcon />
        </Button>
      </Stack>
    </Grid>
  )
}
