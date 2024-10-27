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
import FormCol from './form/FormCol';
import FormRow from './form/FormRow';
import { postData } from '../util/api';

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
  const [values, setValues] = useState<BirthdayBoxRequestFormValues>({
    // general info
    stateName: '',
    chapterId: '67156b8f624d2639a91ee518',
    deadlineDate: null,

    // child info
    childBirthday: null,
    childAge: null,
    childName: null,
    childGender: null,
    childRace: null,
    childInterests: null,
    childAllergies: null,
    allergyDetails: '',
    giftSuggestions: '',
    additionalInfo: '',

    // agency info
    agencyWorkerName: null,
    agencyOrganization: null,
    agencyWorkerPhone: null,
    agencyWorkerEmail: null,
    isFirstReferral: null,
    agreeFeedback: false,
  });

  const [showError, setShowError] = useState({
    stateName: false,
    deadlineDate: false,

    childBirthday: false,
    childAge: false,
    childName: false,
    childGender: false,
    childRace: false,
    childInterests: false,
    childAllergies: false,
    allergyDetails: false,
    giftSuggestions: false,
    additionalInfo: false,

    agencyWorkerName: false,
    agencyOrganization: false,
    agencyWorkerPhone: false,
    agencyWorkerEmail: false,
    isFirstReferral: false,
    agreeFeedback: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    stateName: '',
    deadlineDate: '',

    childBirthday: '',
    childAge: '',
    childName: '',
    childGender: '',
    childRace: '',
    childInterests: '',
    childAllergies: '',
    allergyDetails: '',
    giftSuggestions: '',
    childGift: '',
    additionalInfo: '',

    agencyWorkerName: '',
    agencyOrganization: '',
    agencyWorkerPhone: '',
    agencyWorkerEmail: '',
    isFirstReferral: '',
    agreeFeedback: '',
  });

  const setValue = (field: string, value: any) => {
    setValues((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };

  const onSubmit = () => {
    const data = postData('birthday-request', values);
    console.log(data);
  };

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Grid
        item
        container
        direction="column"
        rowSpacing={3}
        xs={8}
        sm={6}
        fontSize="0.75em"
      >
        <FormCol>
          <Grid item container justifyContent="center" spacing={0}>
            <Typography variant="h2">Birthday Box Request Form</Typography>
          </Grid>
          {/* Select */}
          <FormRow>
            <Grid item width=".5">
              <FormLabel id="chapter-name-label">
                Chapter (State) Name
              </FormLabel>
              <Select
                fullWidth
                error={showError.stateName}
                size="small"
                required
                value={values.stateName}
                onChange={(e) => setValue('stateName', e.target.value)}
              >
                <MenuItem value="AL">Alabama</MenuItem>
                <MenuItem value="AK">Alaska</MenuItem>
                <MenuItem value="AZ">Arizona</MenuItem>
              </Select>
              {errorMessage.stateName && (
                <FormHelperText>{errorMessage.stateName}</FormHelperText>
              )}
            </Grid>
          </FormRow>
          {/* Date box */}
          <FormRow>
            <Grid item width=".5">
              <DatePicker
                label="Deadline Date"
                value={values.deadlineDate}
                onChange={(date) => setValue('deadlineDate', date)}
              />
              {errorMessage.deadlineDate && (
                <FormHelperText>{errorMessage.deadlineDate}</FormHelperText>
              )}
            </Grid>
          </FormRow>
          <Grid item container justifyContent="center" spacing={0}>
            <Typography variant="h2">Child Information</Typography>
          </Grid>
          {/* Date box */}
          <FormRow>
            <Grid item width=".5">
              <DatePicker
                label="Child Birthday"
                value={values.childBirthday}
                onChange={(date) =>
                  setValues({ ...values, childBirthday: date })
                }
              />
              {errorMessage.childBirthday && (
                <FormHelperText>{errorMessage.childBirthday}</FormHelperText>
              )}
            </Grid>
          </FormRow>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.childName}
              helperText={errorMessage.childName}
              size="small"
              type="text"
              required
              label="How old will the child be turning"
              value={values.childName}
              onChange={(e) => setValue('childName', e.target.value)}
            />
          </Grid>
          {/* Text field */}
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.childAge}
              helperText={errorMessage.childAge}
              size="small"
              type="text"
              required
              label="How old will the child be turning?"
              value={values.childAge}
              onChange={(e) => setValue('childAge', e.target.value)}
            />
          </Grid>
          <FormRow>
            <Grid item container width="1">
              <FormControl error={showError.childGender}>
                <FormLabel id="child-gender">This child is a...</FormLabel>
                <RadioGroup
                  aria-labelledby="child-gender"
                  value={values.childGender || ''}
                  onChange={(e) => setValue('childGender', e.target.value)}
                >
                  <FormControlLabel
                    value="Boy"
                    control={<Radio />}
                    label="Boy"
                  />
                  <FormControlLabel
                    value="Girl"
                    control={<Radio />}
                    label="Girl"
                  />
                  <FormControlLabel
                    value="Transgender"
                    control={<Radio />}
                    label="Transgender"
                  />
                  <FormControlLabel
                    value="Non-binary/non-conforming"
                    control={<Radio />}
                    label="Non-binary/non-conforming"
                  />
                  <FormControlLabel
                    value="Prefer not to say"
                    control={<Radio />}
                    label="Prefer not to say"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                  <FormHelperText>{errorMessage.childGender}</FormHelperText>
                </RadioGroup>
              </FormControl>
            </Grid>
          </FormRow>
          <FormRow>
            <Grid item container width="1">
              <FormControl error={showError.childRace}>
                <FormLabel id="child-race">This child is a...</FormLabel>
                <RadioGroup
                  aria-labelledby="child-race"
                  value={values.childRace || ''}
                  onChange={(e) => setValue('childRace', e.target.value)}
                >
                  <FormControlLabel
                    value="American Indian or Alaska Native"
                    control={<Radio />}
                    label="American Indian or Alaska Native"
                  />
                  <FormControlLabel
                    value="Asian"
                    control={<Radio />}
                    label="Asian"
                  />
                  <FormControlLabel
                    value="Black or African American"
                    control={<Radio />}
                    label="Black or African American"
                  />
                  <FormControlLabel
                    value="Hispanic or Latino"
                    control={<Radio />}
                    label="Hispanic or Latino"
                  />
                  <FormControlLabel
                    value="Middle Eastern or North African (MENA)"
                    control={<Radio />}
                    label="Middle Eastern or North African (MENA)"
                  />
                  <FormControlLabel
                    value="Native Hawaiian or Pacific Islander"
                    control={<Radio />}
                    label="Native Hawaiian or Pacific Islander"
                  />
                  <FormControlLabel
                    value="White"
                    control={<Radio />}
                    label="White"
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                  />
                  <FormHelperText>{errorMessage.childRace}</FormHelperText>
                </RadioGroup>
              </FormControl>
            </Grid>
          </FormRow>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.childInterests}
              helperText={errorMessage.childInterests}
              size="small"
              type="text"
              required
              label="Every great party begins with a great theme! Tell us what the child likes;General ideas are fine but specifics are great."
              value={values.childInterests}
              onChange={(e) => setValue('childInterests', e.target.value)}
            />
          </Grid>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.giftSuggestions}
              helperText={errorMessage.giftSuggestions}
              size="small"
              type="text"
              required
              label="Suggested birthday gift to be given by the parent or caregiver, please keep this suggestion under or around $30.00 value"
              value={values.giftSuggestions}
              onChange={(e) => setValue('giftSuggestions', e.target.value)}
            />
          </Grid>
          <FormRow>
            <Grid item container width="1">
              <FormControl error={showError.childAllergies}>
                <FormLabel id="childAllergies">
                  Does the child have allergies?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="childAllergies"
                  value={values.childAllergies && 'true'}
                  onChange={(e) =>
                    setValue('childAllergies', e.target.value === 'true')
                  }
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                  <FormHelperText>{errorMessage.childAllergies}</FormHelperText>
                </RadioGroup>
              </FormControl>
            </Grid>
          </FormRow>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.allergyDetails}
              helperText={errorMessage.allergyDetails}
              size="small"
              type="text"
              required
              label="If yes, please list:?"
              value={values.allergyDetails}
              onChange={(e) => setValue('allergyDetails', e.target.value)}
            />
          </Grid>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.additionalInfo}
              helperText={errorMessage.additionalInfo}
              size="small"
              type="text"
              required
              label="Anything else you would like us to know about the child?"
              value={values.additionalInfo}
              onChange={(e) => setValue('additionalInfo', e.target.value)}
            />
          </Grid>
          {/* Text field */}
          <Grid item container justifyContent="center" spacing={0}>
            <Typography variant="h2">Agency Information</Typography>
          </Grid>
          {/* Text field */}
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyWorkerName}
                helperText={errorMessage.agreeFeedback}
                size="small"
                type="text"
                required
                label="Agency Worker Name"
                value={values.agencyWorkerName}
                onChange={(e) => setValue('agencyWorkerName', e.target.value)}
              />
            </Grid>
          </FormRow>
          {/* Text field */}
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyWorkerName}
                helperText={errorMessage.agencyWorkerName}
                size="small"
                type="text"
                required
                label="Your first and last name"
                value={values.agencyWorkerName}
                onChange={(e) => setValue('agencyWorkerName', e.target.value)}
              />
            </Grid>
          </FormRow>
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyOrganization}
                helperText={errorMessage.agencyOrganization}
                size="small"
                type="text"
                required
                label="Agency Worker Organization"
                value={values.agencyOrganization}
                onChange={(e) => setValue('agencyOrganization', e.target.value)}
              />
            </Grid>
          </FormRow>
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyAddress}
                helperText={errorMessage.agencyAddress}
                size="small"
                type="text"
                required
                label="Your organization's physical address"
                value={values.agencyAddress}
                onChange={(e) => setValue('agencyAddress', e.target.value)}
              />
            </Grid>
          </FormRow>
          {/* Text field */}
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyWorkerPhone}
                helperText={errorMessage.agencyWorkerPhone}
                size="small"
                type="text"
                required
                label="Agency Worker Phone Number"
                value={values.agencyWorkerPhone}
                onChange={(e) => setValue('agencyWorkerPhone', e.target.value)}
              />
            </Grid>
          </FormRow>
          {/* Text field */}
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyWorkerEmail}
                helperText={errorMessage.agencyWorkerEmail}
                size="small"
                type="text"
                required
                label="Agency Worker Email Address"
                value={values.agencyWorkerEmail}
                onChange={(e) => setValue('agencyWorkerEmail', e.target.value)}
              />
            </Grid>
          </FormRow>
          {/* Radio buttons */}
          <FormRow>
            <Grid item container width="1">
              <FormControl error={showError.isFirstReferral}>
                <FormLabel id="first-time-referral">
                  Is this the first time you have been referred?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="first-time-referral"
                  value={values.isFirstReferral || ''}
                  onChange={(e) => setValue('isFirstReferral', e.target.value)}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="No"
                  />
                  <FormHelperText>
                    {errorMessage.isFirstReferral}
                  </FormHelperText>
                </RadioGroup>
              </FormControl>
            </Grid>
          </FormRow>
          <FormRow>
            {/* <Grid item container width="1">
              <CheckBox
                value={values.agreeFeedback}
                onChange={(e) =>
                  setValue('agreeFeedback', e.target.value)
                }
              />
              <FormLabel id="feedback-agreement">
                I agree to provide feedback on the birthday box experience
              </FormLabel>
            </Grid> */}
          </FormRow>
        </FormCol>
      </Grid>
      <Grid item width="1">
        <Button onClick={onSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}

export default BirthdayBoxRequestForm;
