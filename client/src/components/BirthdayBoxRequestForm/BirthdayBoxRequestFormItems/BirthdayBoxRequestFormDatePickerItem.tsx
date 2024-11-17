import { FormHelperText, Grid } from '@mui/material';
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
      <DatePicker
        label={label}
        value={value}
        onChange={(newValue) => setValue(newValue || new Dayjs())}
      />
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </Grid>
  );
}

export default BirthdayBoxRequestFormDatePickerItem;
