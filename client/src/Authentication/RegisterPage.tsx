import React, { useState } from 'react';
import { Link, TextField, Grid, Typography } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import FormCol from '../components/form/FormCol.tsx';
import {
  emailRegex,
  InputErrorMessage,
  nameRegex,
  passwordRegex,
} from '../util/inputvalidation.ts';
import { register } from './api.ts';
import AlertDialog from '../components/AlertDialog.tsx';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';
import ScreenGrid from '../components/ScreenGrid.tsx';
import FormRow from '../components/form/FormRow.tsx';
import FormGrid from '../components/form/FormGrid.tsx';

/**
 * A page users visit to be able to register for a new account by inputting
 * fields such as their name, email, and password.
 */
function RegisterPage() {
  const navigate = useNavigate();

  // Default values for state
  const defaultValues = {
    city: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const defaultShowErrors = {
    city: false,
    state: false,
    email: false,
    password: false,
    confirmPassword: false,
    alert: false,
  };
  const defaultErrorMessages = {
    city: '',
    state: '',
    email: '',
    password: '',
    confirmPassword: '',
    alert: '',
  };
  type ValueType = keyof typeof values;

  // State values and hooks
  const [values, setValueState] = useState(defaultValues);
  const [showError, setShowErrorState] = useState(defaultShowErrors);
  const [errorMessage, setErrorMessageState] = useState(defaultErrorMessages);
  const [alertTitle, setAlertTitle] = useState('Error');
  const [isRegistered, setRegistered] = useState(false);

  // Helper functions for changing only one field in a state object
  const setValue = (field: string, value: string) => {
    setValueState((prevState) => ({
      ...prevState,
      ...{ [field]: value },
    }));
  };
  const setShowError = (field: string, show: boolean) => {
    setShowErrorState((prevState) => ({
      ...prevState,
      ...{ [field]: show },
    }));
  };
  const setErrorMessage = (field: string, msg: string) => {
    setErrorMessageState((prevState) => ({
      ...prevState,
      ...{ [field]: msg },
    }));
  };

  const handleAlertClose = () => {
    if (isRegistered) {
      navigate('/login');
    }
    setShowError('alert', false);
  };

  const clearErrorMessages = () => {
    setShowErrorState(defaultShowErrors);
    setErrorMessageState(defaultErrorMessages);
  };

  const validateInputs = () => {
    clearErrorMessages();
    let isValid = true;

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const valueTypeString in values) {
      const valueType = valueTypeString as ValueType;
      if (!values[valueType]) {
        setErrorMessage(valueTypeString, InputErrorMessage.MISSING_INPUT);
        setShowError(valueTypeString, true);
        isValid = false;
      }
    }

    if (!values.city.match(nameRegex)) {
      setErrorMessage('city', InputErrorMessage.INVALID_NAME);
      setShowError('city', true);
      isValid = false;
    }
    if (!values.state.match(nameRegex)) {
      setErrorMessage('state', InputErrorMessage.INVALID_NAME);
      setShowError('state', true);
      isValid = false;
    }
    if (!values.email.match(emailRegex)) {
      setErrorMessage('email', InputErrorMessage.INVALID_EMAIL);
      setShowError('email', true);
      isValid = false;
    }
    if (!values.password.match(passwordRegex)) {
      setErrorMessage('password', InputErrorMessage.INVALID_PASSWORD);
      setShowError('password', true);
      isValid = false;
    }
    if (!(values.confirmPassword === values.password)) {
      setErrorMessage('confirmPassword', InputErrorMessage.PASSWORD_MISMATCH);
      setShowError('confirmPassword', true);
      isValid = false;
    }

    return isValid;
  };

  async function handleSubmit() {
    if (validateInputs()) {
      register(values.city, values.state, values.email, values.password)
        .then(() => {
          setShowError('alert', true);
          setAlertTitle('');
          setRegistered(true);
          setErrorMessage('alert', 'Check email to verify account');
        })
        .catch((e) => {
          setShowError('alert', true);
          setErrorMessage('alert', e.message);
        });
    }
  }

  const title = "Let's get started";
  return (
    <ScreenGrid>
      <FormGrid>
        <FormCol>
          <Grid item container justifyContent="center">
            <Typography variant="h2">{title}</Typography>
          </Grid>
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.city}
                helperText={errorMessage.city}
                size="small"
                type="text"
                required
                label="City"
                value={values.city}
                onChange={(e) => setValue('city', e.target.value)}
              />
            </Grid>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.state}
                helperText={errorMessage.state}
                size="small"
                type="text"
                required
                label="State"
                value={values.state}
                onChange={(e) => setValue('lastName', e.target.value)}
              />
            </Grid>
          </FormRow>
          <Grid item width="1">
            <TextField
              fullWidth
              error={showError.email}
              helperText={errorMessage.email}
              size="small"
              type="text"
              required
              label="Email"
              value={values.email}
              onChange={(e) => setValue('email', e.target.value)}
            />
          </Grid>
          <FormRow>
            <Grid item width=".5">
              <TextField
                fullWidth
                error={showError.password}
                helperText={errorMessage.password}
                size="small"
                type="password"
                required
                label="Password"
                value={values.password}
                onChange={(e) => setValue('password', e.target.value)}
              />
            </Grid>
            <Grid item container width=".5">
              <TextField
                fullWidth
                error={showError.confirmPassword}
                helperText={errorMessage.confirmPassword}
                size="small"
                type="password"
                required
                label=" Confirm Password"
                value={values.confirmPassword}
                onChange={(e) => setValue('confirmPassword', e.target.value)}
              />
            </Grid>
          </FormRow>
          <Grid item container justifyContent="center">
            <PrimaryButton
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Register
            </PrimaryButton>
          </Grid>
          <FormRow>
            <Grid container justifyContent="center">
              <Link component={RouterLink} to="../">
                Back to Login
              </Link>
            </Grid>
          </FormRow>
        </FormCol>
        {/* The alert that pops up */}
        <Grid item>
          <AlertDialog
            showAlert={showError.alert}
            title={alertTitle}
            message={errorMessage.alert}
            onClose={handleAlertClose}
          />
        </Grid>
      </FormGrid>
    </ScreenGrid>
  );
}

export default RegisterPage;
