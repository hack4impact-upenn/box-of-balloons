import { Grid, TextField } from '@mui/material';
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
      <TextField
        fullWidth
        error={errorMessage !== ''}
        helperText={errorMessage}
        size="small"
        type="number"
        required
        label={label}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </Grid>
  );
}

export default BirthdayBoxRequestFormNumberItem;
