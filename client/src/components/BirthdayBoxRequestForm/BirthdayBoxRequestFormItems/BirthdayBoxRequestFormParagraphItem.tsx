import { Grid, TextField } from '@mui/material';
import React from 'react';
import { IBirthdayBoxRequestFormItemProps } from './IBirthdayBoxRequestFormItemProps';

export type BirthdayBoxRequestFormParagraphItemProps =
  IBirthdayBoxRequestFormItemProps<string>;

function BirthdayBoxRequestFormParagraphItem({
  value,
  setValue,
  errorMessage,
  label,
}: BirthdayBoxRequestFormParagraphItemProps) {
  return (
    <Grid item width="1">
      <TextField
        fullWidth
        error={errorMessage !== ''}
        helperText={errorMessage}
        size="small"
        type="text"
        required
        label={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Grid>
  );
}

export default BirthdayBoxRequestFormParagraphItem;
