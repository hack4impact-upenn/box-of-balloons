import {
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import { IBirthdayBoxRequestFormItemProps } from './IBirthdayBoxRequestFormItemProps';

export type BirthdayBoxRequestFormDropdownItemProps =
  IBirthdayBoxRequestFormItemProps<string> & {
    options: { [value: string]: string };
  };

function BirthdayBoxRequestFormDropdownItem({
  value,
  setValue,
  errorMessage,
  label,
  options,
}: BirthdayBoxRequestFormDropdownItemProps) {
  return (
    <Grid item width=".5">
      <FormLabel id="chapter-name-label">{label}</FormLabel>
      <Select
        fullWidth
        error={errorMessage !== ''}
        size="small"
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
      >
        {Object.entries(options).map(([optionValue, optionLabel]) => (
          <MenuItem key={optionValue} value={optionValue}>
            {optionLabel}
          </MenuItem>
        ))}
      </Select>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </Grid>
  );
}

export default BirthdayBoxRequestFormDropdownItem;
