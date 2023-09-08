import React, { useState } from "react"
import { Grid, TextField, Button, Stack, Checkbox } from "@mui/material"

export default function UserInput({ execute }) {
  const [command, setCommand] = useState("")

  return (
    <Grid item xs={12}>
      <Stack spacing={2} direction="row">
        <TextField
          fullWidth
          label="Command"
          variant="outlined"
          size="small"
          style={{
            background: "white",
          }}
          value={command}
          onChange={(e) => setCommand(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => execute(command)}
        >
          Execute
        </Button>
      </Stack>
    </Grid>
  )
}
