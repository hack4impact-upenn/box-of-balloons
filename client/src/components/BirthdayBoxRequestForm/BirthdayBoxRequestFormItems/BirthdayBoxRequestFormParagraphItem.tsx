import { FormHelperText, Grid, TextField, Typography } from '@mui/material';
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
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        {label}
      </Typography>
      <TextField
        fullWidth
        size="small"
        type="text"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {errorMessage && (
        <FormHelperText
          sx={{ color: 'red' }}
        >{`*${errorMessage}`}</FormHelperText>
      )}
    </Grid>
  );
}

export default BirthdayBoxRequestFormParagraphItem;
