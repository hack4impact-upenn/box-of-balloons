import { FormHelperText, Grid, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import React from 'react';
import { Dayjs } from 'dayjs';
import { IBirthdayBoxRequestFormItemProps } from './IBirthdayBoxRequestFormItemProps';

export type BirthdayBoxRequestFormDatePickerItemProps =
  IBirthdayBoxRequestFormItemProps<Dayjs | null>;

function BirthdayBoxRequestFormDatePickerItem({
  value,
  setValue,
  errorMessage,
  label,
}: BirthdayBoxRequestFormDatePickerItemProps) {
  console.log(typeof value);

  return (
    <Grid item width="1">
      <Typography variant="body1" sx={{ marginBottom: 1 }}>
        {label}
      </Typography>
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue || new Dayjs())}
      />
      {errorMessage && (
        <FormHelperText
          sx={{ color: 'red' }}
        >{`*${errorMessage}`}</FormHelperText>
      )}
    </Grid>
  );
}

export default BirthdayBoxRequestFormDatePickerItem;
