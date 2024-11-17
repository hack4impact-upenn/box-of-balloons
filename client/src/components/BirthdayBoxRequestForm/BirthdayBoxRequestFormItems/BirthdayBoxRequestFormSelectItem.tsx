import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  MenuItem,
  RadioGroup,
  Radio,
  Select,
} from '@mui/material';
import React from 'react';
import { IBirthdayBoxRequestFormItemProps } from './IBirthdayBoxRequestFormItemProps';

export type BirthdayBoxRequestFormSelectItemProps =
  IBirthdayBoxRequestFormItemProps<string | boolean> & {
    options: { [value: string]: string | boolean };
  };

function BirthdayBoxRequestFormSelectItem({
  value,
  setValue,
  errorMessage,
  label,
  options,
}: BirthdayBoxRequestFormSelectItemProps) {
  if (!options) {
    console.log(label);
  }

  return (
    <Grid item container width="1">
      <FormControl error={errorMessage !== ''}>
        <FormLabel>{label}</FormLabel>
        <RadioGroup value={value} onChange={(e) => setValue(e.target.value)}>
          {Object.entries(options).map(([optionValue, optionLabel]) => (
            <FormControlLabel
              key={optionValue}
              value={optionValue}
              control={<Radio />}
              label={optionLabel}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {errorMessage && <FormHelperText>{errorMessage}</FormHelperText>}
    </Grid>
  );
}

export default BirthdayBoxRequestFormSelectItem;
