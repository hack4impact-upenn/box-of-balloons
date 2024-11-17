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
  agencyAddress: string | null;
  agencyWorkerPhone: string | null;
  agencyWorkerEmail: string | null;
  isFirstReferral: string | null;
  agreeFeedback: boolean;
  liability: boolean;
}

function BirthdayBoxRequestForm() {
  const [config, setConfig] = useState<BirthdayBoxRequestFormConfig>({
    deadlineDate: {
      label: 'What is the date this box is needed by?',
      type: 'date',
      initialValue: null,
    },
    childBirthday: {
      label: "When is the child's birthday?",
      type: 'date',
      initialValue: null,
    },
    childName: {
      label:
        "What is the child's first name? We try to personalize at least one item specifically for the child's celebration!",
      type: 'paragraph',
    },
    childAge: {
      label: 'How old will the child be turning?',
      type: 'number',
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
    childRace: {
      label: 'The child race and ethnicity are',
      type: 'select',
      options: {
        'American Indian or Alaska Native': 'American Indian or Alaska Native',
        Asian: 'Asian',
        'Black or African American': 'Black or African American',
        'Hispanic or Latino': 'Hispanic or Latino',
        'Middle Eastern or North African (MENA)':
          'Middle Eastern or North African (MENA)',
        'Native Hawaiian or Pacific Islander':
          'Native Hawaiian or Pacific Islander',
        White: 'White',
        Other: 'Other',
      },
    },
    childInterests: {
      label:
        'Every great party begins with a great theme! Tell us what the child likes; General ideas are fine but specifics are great.',
      type: 'paragraph',
    },
    giftSuggestions: {
      label:
        'Suggested birthday gift to be given by the parent or caregiver, please keep this suggestion under or around $30.00 value.',
      type: 'paragraph',
    },
    childAllergies: {
      label:
        'Does the child have any food allergies? (select yes or no - if yes, what are the allergies)',
      type: 'select',
      options: {
        Yes: 'Yes',
        No: 'No',
      },
    },
    additionalInfo: {
      label:
        'Anything else you would like us to know about the birthday child?',
      type: 'paragraph',
    },
    childSituation: {
      label:
        'Please select which one of the following situations best apply to the child being served',
      type: 'select',
      options: {
        Fostercare: 'Fostercare',
        Homelessness: 'Homelessness',
        'Domestic Violence': 'Domestic Violence',
        'Medical treatment': 'Medical treatment',
        'Financial insecurities': 'Financial insecurities',
      },
    },
    agencyWorkerName: {
      label: 'Your first and last name.',
      type: 'paragraph',
    },
    agencyOrganization: {
      label: 'The name of your organization.',
      type: 'paragraph',
    },
    agencyAddress: {
      label: "Your organization's physical address.",
      type: 'paragraph',
    },
    agnecyWorkerPhone: {
      label: 'Your phone number.',
      type: 'paragraph',
    },
    agencyWorkerEmail: {
      label: 'Your email address.',
      type: 'paragraph',
    },
    isFirstReferral: {
      label: 'Is this your first time making a referral?',
      type: 'select',
      options: {
        Yes: 'Yes',
        No: 'No',
      },
    },
    agreeFeedback: {
      label:
        "By submitting this request form you are agreeing to do your best to provide us with feedback from the child's party.* This can be done by filling out the online feedback form, emailing a short testimony from the family, submitting a picture of the child/party, etc.(when the family and child are safe and comfortable doing so) and understand that by doing so Box of Balloons, Inc. owns all rights to images, testimonials and form responses to use on social media, website promotions, email campaigns and to aid in organizational fundraising opportunities in any capacity the organization sees fit and that all names will be changed and locations are hidden to protect the child and the family being served.",
      type: 'select',
      options: {
        Yes: 'Yes',
        No: 'No',
      },
    },
    liability: {
      label:
        'Box of Balloons, Inc. and its volunteers shall not be held liable for any damages, injuries, or losses arising from the use, distribution, or provision of birthday party supplies donated to caseworkers, social workers, the families they serve or any recipients participating in birthday celebrations where these donated supplies are being used. All items are provided "as is" without any warranties or guarantees of any kind. Recipients acknowledge and accept that they assume all risks associated with using these supplies and that Box of Balloons, Inc. and their Volunteers are not held liable for these donations.',
      type: 'select',
      options: {
        Yes: 'Yes',
        No: 'No',
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
