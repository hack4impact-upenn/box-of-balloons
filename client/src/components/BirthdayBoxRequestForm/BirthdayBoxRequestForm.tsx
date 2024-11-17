import {
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormHelperText,
  Checkbox,
  RadioGroup,
  Radio,
  Button,
} from '@mui/material';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { CheckBox } from '@material-ui/icons';
import { Dayjs } from 'dayjs';

import React, { useState } from 'react';
import FormCol from '../form/FormCol';
import FormRow from '../form/FormRow';
import { postData } from '../../util/api';
import FormGrid from '../form/FormGrid';
import BirthdayBoxRequestFormContents, {
  IBirthdayBoxRequestFormValues,
} from './BirthdayBoxRequestFormContents';
import { BirthdayBoxRequestFormConfig } from './birthdayBoxRequestFormItemConfig';

interface BirthdayBoxRequestFormValues {
  // general info
  stateName: string | null;
  deadlineDate: Dayjs | null;

  // child info
  childBirthday: Dayjs | null;
  childAge: number | null;
  childName: string | null;
  childGender: string | null;
  childRace: string | null;
  childInterests: string | null;
  childAllergies: boolean;
  allergyDetails: string;
  giftSuggestions: string;
  additionalInfo: string;

  // agency info
  agencyWorkerName: string | null;
  agencyOrganization: string | null;
  agencyWorkerPhone: string | null;
  agencyWorkerEmail: string | null;
  isFirstReferral: string | null;
  agreeFeedback: boolean;
}

function BirthdayBoxRequestForm() {
  const [config, setConfig] = useState<BirthdayBoxRequestFormConfig>({
    deadlineDate: {
      label: 'What is the date this box is needed by?',
      type: 'paragraph',
    },
    childBirthday: {
      label: "When is the child's birthday?",
      type: 'paragraph',
    },
    childName: {
      label:
        "What is the child's first name? We try to personalize at least one item specifically for the child's celebration!",
      type: 'paragraph',
    },
    childAge: {
      label: 'How old will the child be turning?',
      type: 'paragraph',
    },
    childGender: {
      label: 'The child identifies as:',
      type: 'select',
      options: {
        Boy: 'Boy',
        Girl: 'Girl',
        Transgender: 'Transgender',
        'Prefer not to say': 'Prefer not to say',
        'Other (short answer area to identify other gender)':
          'Other (short answer area to identify other gender)',
      },
    },
  });

  const onSubmit = (values: IBirthdayBoxRequestFormValues) => {
    const data = postData('birthday-request', values);
    console.log(data);
  };

  return (
    <FormGrid>
      <FormCol>
        <Grid item justifyContent="center" spacing={0}>
          <Typography variant="h2">Birthday Box Request Form</Typography>
        </Grid>
        <BirthdayBoxRequestFormContents
          config={config}
          handleSubmit={onSubmit}
        />
      </FormCol>
    </FormGrid>
  );
}

export default BirthdayBoxRequestForm;
