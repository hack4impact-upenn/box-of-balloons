import React from 'react';
import { Grid, Typography } from '@mui/material';

function SuccessPage() {
  return (
    <Grid container justifyContent="center" sx={{ marginTop: 4 }}>
      <Grid item xs={12}>
        <Typography variant="h2" textAlign="center">
          Success!
        </Typography>
        <Typography variant="h5" textAlign="center" sx={{ marginTop: 2 }}>
          Your birthday box request has been successfully submitted.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SuccessPage;