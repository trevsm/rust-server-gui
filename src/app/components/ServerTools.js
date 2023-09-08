import React from "react"
import { Stack, Button, Grid } from "@mui/material"
import { useStatus } from "../../hooks/useStatus"
import { AnimatedRunningDots } from "./AnimatedRunningDots"
import StopIcon from "@mui/icons-material/Stop"
import PlayArrow from "@mui/icons-material/PlayArrow"
import Construction from "@mui/icons-material/Construction"
import SettingsIcon from "@mui/icons-material/Settings"
import RefreshIcon from "@mui/icons-material/Refresh"

export default function ServerTools({ launch, stop, restart, update }) {
  const { isRunning, isStopped, isRestarting } = useStatus()

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
          disabled={isRunning() || isRestarting()}
          style={{
            display: "flex",
            alignItems: "flex-end",
            gap: "3px",
          }}
        >
          {isRunning() || isRestarting() ? (
            <>
              Running <AnimatedRunningDots />
            </>
          ) : (
            <>
              Launch <PlayArrow />
            </>
          )}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={isStopped() || isRestarting()}
          onClick={restart}
        >
          Restart{" "}
          <RefreshIcon
            style={{
              animation: isRestarting() ? "spin .55s linear infinite" : "none",
            }}
          />
        </Button>
        <Button
          variant="contained"
          color="stop"
          disabled={isStopped()}
          onClick={stop}
        >
          Stop <StopIcon />
        </Button>
        <Button
          variant="contained"
          color="update"
          disabled={isRunning() || isRestarting()}
          onClick={update}
        >
          Update <Construction />
        </Button>
        <Button variant="contained" color="settings">
          Settings <SettingsIcon />
        </Button>
      </Stack>
    </Grid>
  )
}
