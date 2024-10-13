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
} from '@mui/material';
import { Stack } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers';
import { CheckBox } from '@material-ui/icons';
import { Dayjs } from 'dayjs';

import React, { useState } from 'react';
import FormCol from './form/FormCol';
import FormRow from './form/FormRow';

interface BirthdayBoxRequestFormValues {
  // general info
  stateName: string | null;
  deadlineDate: Dayjs | null;

  // child info
  childBirthday: Dayjs | null;
  childAge: number | null;
  childFirstName: string | null;
  childGender: string | null;
  childRace: string | null;
  childInterests: string | null;
  childAllergies: string;
  childGiftSuggestions: string;
  childAdditionalInfo: string;

  // agency info
  agencyWorkerName: string | null;
  agencyWorkerOrganization: string | null;
  agencyWorkerPhoneNumber: string | null;
  agencyWorkerEmail: string | null;
  agencyFirstTimeReferral: string | null;
  agencyFeedbackAgreement: boolean;
}

function BirthdayBoxRequestForm() {
  const [values, setValues] = useState<BirthdayBoxRequestFormValues>({
    // general info
    stateName: '',
    deadlineDate: null,

    // child info
    childBirthday: null,
    childAge: null,
    childFirstName: null,
    childGender: null,
    childRace: null,
    childInterests: null,
    childAllergies: '',
    childGiftSuggestions: '',
    childAdditionalInfo: '',

    // agency info
    agencyWorkerName: null,
    agencyWorkerOrganization: null,
    agencyWorkerPhoneNumber: null,
    agencyWorkerEmail: null,
    agencyFirstTimeReferral: null,
    agencyFeedbackAgreement: false,
  });

  const [showError, setShowError] = useState({
    stateName: false,
    deadlineDate: false,

    childBirthday: false,
    childAge: false,
    childFirstName: false,
    childGender: false,
    childRace: false,
    childInterests: false,
    childAllergies: false,
    childGiftSuggestions: false,
    childAdditionalInfo: false,

    agencyWorkerName: false,
    agencyWorkerOrganization: false,
    agencyWorkerPhoneNumber: false,
    agencyWorkerEmail: false,
    agencyFirstTimeReferral: false,
    agencyFeedbackAgreement: false,
  });

  const [errorMessage, setErrorMessage] = useState({
    stateName: '',
    deadlineDate: '',

    childBirthday: '',
    childAge: '',
    childFirstName: '',
    childGender: '',
    childRace: '',
    childInterests: '',
    childAllergies: '',
    childGiftSuggestions: '',
    childGift: '',
    childAdditionalInfo: '',

    agencyWorkerName: '',
    agencyWorkerOrganization: '',
    agencyWorkerPhoneNumber: '',
    agencyWorkerEmail: '',
    agencyFirstTimeReferral: '',
    agencyFeedbackAgreement: '',
  });

  const setValue = (field: string, value: any) => {
    setValues((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
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
                    value="true"
                    control={<Radio />}
                    label="Boy"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Girl"
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
                    value="true"
                    control={<Radio />}
                    label="White"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Black or African American"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Hispanic or Latino"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Native American or American Indian"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Asian/Pacific Islander"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="Not Sure"
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
              label="Every great party begins with a great theme! Tell us what the child likes; General ideas are fine but specifics are great."
              value={values.childInterests}
              onChange={(e) => setValue('childInterests', e.target.value)}
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
                  value={values.childAllergies || ''}
                  onChange={(e) => e.target.value === 'Yes'}
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
              error={showError.childAllergies}
              helperText={errorMessage.childAllergies}
              size="small"
              type="text"
              required
              label="If yes, please list:?"
              value={values.childAllergies}
              onChange={(e) => setValue('childAllergies', e.target.value)}
            />
          </Grid>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.childGiftSuggestions}
              helperText={errorMessage.childGiftSuggestions}
              size="small"
              type="text"
              required
              label="Any suggestions for a birthday gift?"
              value={values.childGiftSuggestions}
              onChange={(e) => setValue('childGiftSuggestions', e.target.value)}
            />
          </Grid>
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.childAdditionalInfo}
              helperText={errorMessage.childAdditionalInfo}
              size="small"
              type="text"
              required
              label="Anything else you would like us to know about the child?"
              value={values.childAdditionalInfo}
              onChange={(e) => setValue('childAdditionalInfo', e.target.value)}
            />
          </Grid>
          {/* Text field */}
          <Grid item width=".5">
            <TextField
              fullWidth
              error={showError.childFirstName}
              helperText={errorMessage.childFirstName}
              size="small"
              type="text"
              required
              label="Child First Name"
              value={values.childFirstName}
              onChange={(e) => setValue('childFirstName', e.target.value)}
            />
          </Grid>
          <Grid item container justifyContent="center" spacing={0}>
            <Typography variant="h2">Agency Information</Typography>
          </Grid>
          {/* Text field */}
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyWorkerName}
                helperText={errorMessage.agencyFeedbackAgreement}
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
                error={showError.agencyWorkerOrganization}
                helperText={errorMessage.agencyWorkerOrganization}
                size="small"
                type="text"
                required
                label="Agency Worker Organization"
                value={values.agencyWorkerName}
                onChange={(e) =>
                  setValue('agencyWorkerOrganization', e.target.value)
                }
              />
            </Grid>
          </FormRow>
          {/* Text field */}
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.agencyWorkerPhoneNumber}
                helperText={errorMessage.agencyWorkerPhoneNumber}
                size="small"
                type="text"
                required
                label="Agency Worker Phone Number"
                value={values.agencyWorkerPhoneNumber}
                onChange={(e) =>
                  setValue('agencyWorkerPhoneNumber', e.target.value)
                }
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
              <FormControl error={showError.agencyFirstTimeReferral}>
                <FormLabel id="first-time-referral">
                  Is this the first time you have been referred?
                </FormLabel>
                <RadioGroup
                  aria-labelledby="first-time-referral"
                  value={values.agencyFirstTimeReferral || ''}
                  onChange={(e) =>
                    setValue('agencyFirstTimeReferral', e.target.value)
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
                  <FormHelperText>
                    {errorMessage.agencyFirstTimeReferral}
                  </FormHelperText>
                </RadioGroup>
              </FormControl>
            </Grid>
          </FormRow>
          <FormRow>
            {/* <Grid item container width="1">
              <CheckBox
                value={values.agencyFeedbackAgreement}
                onChange={(e) =>
                  setValue('agencyFeedbackAgreement', e.target.value)
                }
              />
              <FormLabel id="feedback-agreement">
                I agree to provide feedback on the birthday box experience
              </FormLabel>
            </Grid> */}
          </FormRow>
        </FormCol>
      </Grid>
    </Grid>
  );
}

export default BirthdayBoxRequestForm;
