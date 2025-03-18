import { FormHelperText, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { IBirthdayBoxRequestFormItemProps } from './IBirthdayBoxRequestFormItemProps';

export type BirthdayBoxRequestFormNumberItemProps =
  IBirthdayBoxRequestFormItemProps<number>;

function BirthdayBoxRequestFormNumberItem({
  value,
  setValue,
  errorMessage,
  label,
}: BirthdayBoxRequestFormNumberItemProps) {
  return (
    <Grid item width="1">
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        type="number"
        required
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      {errorMessage && (
        <FormHelperText
          sx={{ color: 'red' }}
        >{`*${errorMessage}`}</FormHelperText>
      )}
    </Grid>
  );
}

export default BirthdayBoxRequestFormNumberItem;
