import React from "react"
import { Stack, Button, Grid } from "@mui/material"
import { useStatus } from "../../hooks/useStatus"
import useRustServer from "../../hooks/useRustServer"

import StopIcon from "@mui/icons-material/Stop"
import PlayArrow from "@mui/icons-material/PlayArrow"
import Construction from "@mui/icons-material/Construction"
import SettingsIcon from "@mui/icons-material/Settings"
import RefreshIcon from "@mui/icons-material/Refresh"

// dots animation ., .., ... where the dots just change in opacity
const AnimatedRunningDots = () => {
  const [dotCount, setDotCount] = React.useState(0)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((dotCount) => (dotCount + 1) % 4)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      style={{
        display: "flex",
        gap: "4px",
        marginBottom: "6px",
      }}
    >
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          style={{
            opacity: i === dotCount ? 1 : 0.2,
            transition: "opacity 0.5s",
            fontSize: "20px",
            width: "3px",
            height: "3px",
            background: "rgba(0, 0, 0, 0.26)",
            borderRadius: "100%",
          }}
        />
      ))}
    </div>
  )
}

export default function ServerTools() {
  const { launch, stop, restart } = useRustServer()
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
