import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { BirthdayBoxRequestFormConfig } from './birthdayBoxRequestFormItemConfig';
import BirthdayBoxRequestFormItem from './BirthdayBoxRequestFormItems/BirthdayBoxRequestFormItem';

export type IBirthdayBoxRequestFormValues = {
  [id: string]: string;
};

interface IBirthdayBoxRequestFormContentsProps {
  config: BirthdayBoxRequestFormConfig;
  handleSubmit: (values: IBirthdayBoxRequestFormValues) => void;
}

function BirthdayBoxRequestFormContents({
  config,
  handleSubmit,
}: IBirthdayBoxRequestFormContentsProps) {
  const [values, setValues] = useState<IBirthdayBoxRequestFormValues>({
    ...Object.fromEntries(
      Object.keys(config).map((id) => [id, config[id].initialValue || '']),
    ),
  });

  const [errorMessages, setErrorMessages] = useState<{ [id: string]: string }>(
    {},
  );

  return (
    <>
      {Object.entries(config).map(([id, item]) => (
        <BirthdayBoxRequestFormItem
          key={id}
          value={values[id] || ''}
          setValue={(value) => setValues({ ...values, [id]: value })}
          label={item.label}
          errorMessage={errorMessages[id] || ''}
          type={item.type}
          options={item.options}
        />
      ))}
      <Grid item justifyContent="center">
        <Button onClick={() => handleSubmit(values)}>Submit</Button>
      </Grid>
    </>
  );
}

export default BirthdayBoxRequestFormContents;
