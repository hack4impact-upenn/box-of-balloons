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
import { Stack, ThemeProvider, createTheme } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { CheckBox } from '@material-ui/icons';
import { Dayjs } from 'dayjs';
import styled from '@emotion/styled';

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormCol from '../form/FormCol';
import FormRow from '../form/FormRow';
import { postData } from '../../util/api';
import FormGrid from '../form/FormGrid';
import BirthdayBoxRequestFormContents, {
  IBirthdayBoxRequestFormValues,
} from './BirthdayBoxRequestFormContents';
import { BirthdayBoxRequestFormConfig } from './birthdayBoxRequestFormItemConfig';
// import logo from '../assets/Logos/BoxOfBalloonsPrimaryLogo.png';

interface BirthdayBoxRequestFormValues {
  // general info
  stateName: string | null;
  deadlineDate: Dayjs | null;

  // child info
  childBirthday: Dayjs | null;
  childAge: number | null;
  childName: string | null;
  childGender: string | null;
  childSituation: string | null;
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
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState<object>({});

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
      label: 'The child identifies as...',
      type: 'select',
      options: {
        Boy: 'Boy',
        Girl: 'Girl',
        Transgender: 'Transgender',
        'Prefer not to say': 'Prefer not to say',
        Other: 'Other',
      },
    },
    childRace: {
      label: "The child's race/ethnicity is...",
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
    // allergyDetails: {
    //   label: 'Yes, please specify:',
    //   type: 'paragraph',
    // },
    additionalInfo: {
      label:
        'Anything else you would like us to know about the birthday child?',
      type: 'paragraph',
    },
    childSituation: {
      label:
        'Please select which one of the following situations best apply to the child being served.',
      type: 'select',
      options: {
        Fostercare: 'Fostercare',
        Homelessness: 'Homelessness',
        'Domestic Violence': 'Domestic Violence',
        'Medical Treatment': 'Medical Treatment',
        'Financial Insecurities': 'Financial Insecurities',
      },
    },
    agencyWorkerName: {
      label: 'Your first and last name',
      type: 'paragraph',
    },
    agencyOrganization: {
      label: 'The name of your organization',
      type: 'paragraph',
    },
    agencyAddress: {
      label: "Your organization's physical address",
      type: 'paragraph',
    },
    agencyWorkerPhone: {
      label: 'Your phone number',
      type: 'paragraph',
    },
    agencyWorkerEmail: {
      label: 'Your email address',
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
        "By submitting this request form you are agreeing to do your best to provide us with feedback from the child's party.* This can be done by filling out the online feedback form, emailing a short testimony from the family, submitting a picture of the child/party, etc. (when the family and child are safe and comfortable doing so) and understand that by doing so Box of Balloons, Inc. owns all rights to images, testimonials and form responses to use on social media, website promotions, email campaigns and to aid in organizational fundraising opportunities in any capacity the organization sees fit and that all names will be changed and locations are hidden to protect the child and the family being served.",
      type: 'select',
      options: {
        Yes: 'Yes',
      },
    },
    liability: {
      label:
        'Box of Balloons, Inc. and its volunteers shall not be held liable for any damages, injuries, or losses arising from the use, distribution, or provision of birthday party supplies donated to caseworkers, social workers, the families they serve or any recipients participating in birthday celebrations where these donated supplies are being used. All items are provided "as is" without any warranties or guarantees of any kind. Recipients acknowledge and accept that they assume all risks associated with using these supplies and that Box of Balloons, Inc. and their Volunteers are not held liable for these donations.',
      type: 'select',
      options: {
        Yes: 'Yes',
      },
    },
  });

  const onSubmit = async (values: IBirthdayBoxRequestFormValues) => {
    let newErrorMessages = {};
    if (!chapterId || typeof chapterId !== 'string') {
      // TODO: tbh idk what this check is for
    }

    const deadlineDate = new Date(values.deadlineDate) ?? undefined;

    if (!values.deadlineDate || Number.isNaN(deadlineDate.getTime())) {
      newErrorMessages = {
        ...newErrorMessages,
        deadlineDate: 'Deadline Date Required',
      };
    }

    const childBirthday = new Date(values.childBirthday) ?? undefined;

    if (!values.childBirthday || Number.isNaN(childBirthday.getTime())) {
      newErrorMessages = {
        ...newErrorMessages,
        childBirthday: 'Child Birthday Required',
      };
    }

    if (!values.childAge || typeof values.childAge !== 'number') {
      newErrorMessages = {
        ...newErrorMessages,
        childAge: 'Child Age Required',
      };
    }
    if (!values.childName || typeof values.childName !== 'string') {
      newErrorMessages = {
        ...newErrorMessages,
        childName: 'Child Name Required',
      };
    }
    if (!values.childGender || typeof values.childGender !== 'string') {
      newErrorMessages = {
        ...newErrorMessages,
        childGender: 'Child Gender Required',
      };
    }
    if (
      values.childGender &&
      values.childGender !== 'Boy' &&
      values.childGender !== 'Girl' &&
      values.childGender !== 'Transgender' &&
      values.childGender !== 'Prefer not to say' &&
      values.childGender !== 'Other'
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        childGender: 'Child Gender Invalid',
      };
    }
    if (!values.childRace || typeof values.childRace !== 'string') {
      newErrorMessages = {
        ...newErrorMessages,
        childRace: 'Child Race Required',
      };
    }
    if (
      values.childRace &&
      values.childRace !== 'American Indian or Alaska Native' &&
      values.childRace !== 'Asian' &&
      values.childRace !== 'Black or African American' &&
      values.childRace !== 'Hispanic or Latino' &&
      values.childRace !== 'Middle Eastern or North African (MENA)' &&
      values.childRace !== 'Native Hawaiian or Pacific Islander' &&
      values.childRace !== 'White' &&
      values.childRace !== 'Other'
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        childRace: 'Child Race Invalid',
      };
    }
    if (!values.childSituation || typeof values.childSituation !== 'string') {
      newErrorMessages = {
        ...newErrorMessages,
        childSituation: 'Child Situation Required',
      };
    }
    if (
      values.childSituation &&
      values.childSituation !== 'Fostercare' &&
      values.childSituation !== 'Homelessness' &&
      values.childSituation !== 'Domestic Violence' &&
      values.childSituation !== 'Medical Treatment' &&
      values.childSituation !== 'Financial Insecurities'
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        childSituation: 'Child Situation Invalid',
      };
    }
    if (!values.childInterests || typeof values.childInterests !== 'string') {
      newErrorMessages = {
        ...newErrorMessages,
        childInterests: 'Child Interests Required',
      };
    }
    if (values.childAllergies !== 'Yes' && values.childAllergies !== 'No') {
      newErrorMessages = {
        ...newErrorMessages,
        childAllergies: 'Child Allergies Required',
      };
    }
    if (
      values.childAllergies === 'Yes' &&
      (!values.allergyDetails || typeof values.allergyDetails !== 'string')
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        allergyDetails: 'Allergy Details Required',
      };
    }
    if (!values.giftSuggestions || typeof values.giftSuggestions !== 'string') {
      newErrorMessages = {
        ...newErrorMessages,
        giftSuggestions: 'Gift Suggestions Required',
      };
    }
    // if (!values.additionalInfo || typeof values.additionalInfo !== 'string') {
    //   newErrorMessages.push('Additional Info Required');
    // }
    if (
      !values.agencyWorkerName ||
      typeof values.agencyWorkerName !== 'string'
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyWorkerName: 'Agency Worker Name Required',
      };
    }
    if (
      !values.agencyOrganization ||
      typeof values.agencyOrganization !== 'string'
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyOrganization: 'Agency Organization Required',
      };
    }

    const addressRegex = /^[a-zA-Z0-9\s,'-]{3,}$/;
    if (!values.agencyAddress) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyAddress: 'Agency Address Required',
      };
    }
    if (values.agencyAddress && !addressRegex.test(values.agencyAddress)) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyAddress: 'Agency Address Invalid',
      };
    }

    const phoneNumberRegex = /^\d{10}$/;
    if (!values.agencyWorkerPhone) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyWorkerPhone: 'Agency Worker Phone Required',
      };
    }
    if (
      values.agencyWorkerPhone &&
      !phoneNumberRegex.test(values.agencyWorkerPhone)
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyWorkerPhone: 'Agency Worker Phone Invalid',
      };
    }

    if (
      !values.agencyWorkerEmail ||
      typeof values.agencyWorkerEmail !== 'string'
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyWorkerEmail: 'Agency Worker Email Required',
      };
    }
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g;
    if (
      values.agencyWorkerEmail &&
      !values.agencyWorkerEmail.match(emailRegex)
    ) {
      newErrorMessages = {
        ...newErrorMessages,
        agencyWorkerEmail: 'Agency Worker Email Invalid',
      };
    }

    if (values.isFirstReferral !== 'Yes') {
      newErrorMessages = {
        ...newErrorMessages,
        isFirstReferral: 'Referral Required',
      };
    }
    if (values.agreeFeedback !== 'Yes') {
      newErrorMessages = {
        ...newErrorMessages,
        agreeFeedback: 'Must Agree to Feedback',
      };
    }
    if (values.liability !== 'Yes') {
      newErrorMessages = {
        ...newErrorMessages,
        liability: 'Must Agree to Liability',
      };
    }
    const errors = Object.entries(newErrorMessages).some(
      ([_, value]) => value && value !== '',
    );
    if (!errors) {
      // Make the request to save the data
      try {
        const cleanChapterId = chapterId.startsWith(':')
          ? chapterId.slice(1)
          : chapterId;
        const data = await postData('birthdayrequest/createrequest', {
          ...values,
          chapterId: cleanChapterId,
          childAllergies: values.childAllergies === 'Yes', // Ensure this is a boolean
          isFirstReferral: values.isFirstReferral === 'Yes',
          agreeFeedback: values.agreeFeedback === 'Yes',
          liability: values.liability === 'Yes',
        });

        console.log('Data being posted:', data);
        navigate('/success');
      } catch (error) {
        console.error('Error submitting form:', error);
        // eslint-disable-next-line no-return-assign
      }
    }

    setErrorMessages(newErrorMessages);
    console.log('error msgs');
    console.log(newErrorMessages);
  };

  return (
    <Grid
      item
      container
      justifyContent="center"
      spacing="0"
      sx={{ marginTop: 2 }}
    >
      {/* <Grid item container justifyContent="center">
        <Logo src={logo} alt="Box of Balloons Logo" />
      </Grid> */}
      <Grid>
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ fontWeight: 'bold', fontSize: '5rem' }}
        >
          Birthday Box Request Form
        </Typography>
        <Grid
          sx={{
            marginRight: 15,
            marginLeft: 15,
            marginTop: 5,
            marginBottom: -8,
          }}
        >
          <Typography variant="h5" sx={{ fontSize: '1.2rem' }}>
            &quot;We believe each birthday should be happy and every child
            should be celebrated!! Our birthday boxes provide customizable
            celebrations for parents or caregivers to give their child a special
            customized birthday party.&quot;
            <br /> <br />
            Each box includes{' '}
            <span style={{ fontWeight: 'bold' }}>
              decorations, balloons, a party game, favors for 6 children,
              cupcakes or cake for 10, plates, napkins, and a special gift for
              the birthday child.
            </span>
            Please answer the following questions to help us create the perfect
            birthday box.
            <br /> <br />
            We ask for at least{' '}
            <span style={{ fontWeight: 'bold' }}>
              2 weeks&apos; notice and serve children ages 1-12
            </span>
            . For urgent requests, contact your local chapter leader to leader
            to leader to leader to check availability.
            <br /> <br />
            Thank you for letting us be part of your child&apos;s special day!
            <br /> <br />
          </Typography>
          <hr />
        </Grid>
      </Grid>
      <FormGrid>
        <FormCol>
          <hr />
          {/* {errorMessages.length > 0 && (
            <div style={{ color: 'red', marginBottom: '1em' }}>
              {errorMessages.map((msg, index) => (
                <p key={msg}>{msg}</p>
              ))}
            </div>
          )} */}
          <BirthdayBoxRequestFormContents
            config={config}
            handleSubmit={onSubmit}
            errorMessages={errorMessages}
          />
        </FormCol>
        {Object.entries(errorMessages).some(
          ([_, value]) => value && value !== '',
        ) && (
          <div>
            <p style={{ color: 'red', marginBottom: '1em' }}>
              Unable to submit. Field(s) not filled out or not correctly filled
              out!
            </p>
          </div>
        )}
        {/* {Object.keys(errorMessages).length > 0 && (
          <div style={{ color: 'red', marginBottom: '1em' }}>
            {Object.entries(errorMessages).map(([field, message]) => (
              <p key={field}>{message}</p>
            ))}
          </div>
        )} */}
      </FormGrid>
    </Grid>
  );
}

export default BirthdayBoxRequestForm;
