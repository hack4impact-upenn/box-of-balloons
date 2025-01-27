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
  Container,
  Box,
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
      <FormControl>
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
      <Container disableGutters sx={{ margin: 0 }}>
        {errorMessage && (
          <FormHelperText
            sx={{ color: 'red' }}
          >{`*${errorMessage}`}</FormHelperText>
        )}
      </Container>
    </Grid>
  );
}

export default BirthdayBoxRequestFormSelectItem;
