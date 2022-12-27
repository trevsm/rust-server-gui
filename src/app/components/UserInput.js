import React from "react"
import { Grid, TextField, Button, Stack, Checkbox } from "@mui/material"
import { Item } from "./Item"

export default function UserInput() {
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
        />
        <Button variant="contained" color="start" size="small">
          Execute
        </Button>
      </Stack>
    </Grid>
  )
}
