import React, { useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { Dayjs } from 'dayjs';
import { BirthdayBoxRequestFormConfig } from './birthdayBoxRequestFormItemConfig';
import BirthdayBoxRequestFormItem from './BirthdayBoxRequestFormItems/BirthdayBoxRequestFormItem';

export type IBirthdayBoxRequestFormValues = {
  [id: string]: string | boolean | number | Dayjs | null;
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
      Object.keys(config).map((id) => [
        id,
        config[id].initialValue !== undefined ? config[id].initialValue : '',
      ]),
    ),
  });

  const [errorMessages, setErrorMessages] = useState<{ [id: string]: string }>(
    {},
  );

  const typographyConfig: Record<string, { label: string; color: string }> = {
    deadlineDate: { label: 'Child Information', color: '#54C2B9' },
    childSituation: { label: 'Agency Information', color: '#FF3F73' },
    agreeFeedback: {
      label: 'To Submit This Request for Assistance',
      color: '#FEE761',
    },
  };

  return (
    <>
      {Object.entries(config).map(([id, item]) => (
        <>
          <React.Fragment key={id}>
            {typographyConfig[id] && (
              <Grid container justifyContent="center">
                <Typography
                  variant="h2"
                  sx={{
                    color: typographyConfig[id].color,
                    fontWeight: 'bold',
                    marginTop: 2,
                  }}
                >
                  {typographyConfig[id].label}
                </Typography>
              </Grid>
            )}
          </React.Fragment>
          <BirthdayBoxRequestFormItem
            key={id}
            value={values[id]}
            setValue={(value: any) => setValues({ ...values, [id]: value })}
            label={item.label}
            errorMessage={errorMessages[id] || ''}
            type={item.type}
            options={item.options}
          />
        </>
      ))}
      <Grid item justifyContent="center">
        <Button
          onClick={() => handleSubmit(values)}
          sx={{
            backgroundColor: '#54C2B9',
            color: 'white',
            borderRadius: '20px',
            padding: '15px 30px',
            '&:hover': {
              backgroundColor: 'darkcyan',
            },
          }}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
}

export default BirthdayBoxRequestFormContents;
