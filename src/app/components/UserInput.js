import React from "react"
import { Grid, Input, Button, Stack, Checkbox } from "@mui/material"
import { Item } from "./Item"

export default function UserInput() {
  return (
    <Grid item xs={12}>
      <Stack spacing={2} direction="row">
        <Item>
          <Checkbox
            disabled
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "controlled" }}
          />
        </Item>
        <Item sx={{ width: "100%" }}>
          <Input fullWidth placeholder="Command" disabled />
        </Item>
        <Button variant="contained" color="primary" disabled>
          Send
        </Button>
      </Stack>
    </Grid>
  )
}
