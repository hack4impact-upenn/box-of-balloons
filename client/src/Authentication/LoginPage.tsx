import React, { useState } from 'react';
import { TextField, Link, Typography, Grid } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from '@emotion/styled';
import { useAppDispatch } from '../util/redux/hooks.ts';
import { login as loginRedux } from '../util/redux/userSlice.ts';
import FormGrid from '../components/form/FormGrid.tsx';
import FormCol from '../components/form/FormCol.tsx';
import FormRow from '../components/form/FormRow.tsx';
import { emailRegex, InputErrorMessage } from '../util/inputvalidation.ts';
import { loginUser } from './api.ts';
import AlertDialog from '../components/AlertDialog.tsx';
import PrimaryButton from '../components/buttons/PrimaryButton.tsx';
import ScreenGrid from '../components/ScreenGrid.tsx';

import PrimaryLogo from '../assets/Logos/BoxOfBalloonsPrimaryLogo.png';
import SupportingElement1 from '../assets/Logos/boxBalloonsSupportingEl.png';
import SupportingElement2 from '../assets/Logos/balloonBox.png';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF3F73', // Box of Balloons Pink
    },
    secondary: {
      main: '#54C2B9', // Box of Balloons Teal
    },
    warning: {
      main: '#FEE761', // Box of Balloons Yellow
    },
  },
  typography: {
    fontFamily: 'Open Sans Condensed Light, sans-serif',
    h2: {
      fontFamily: 'Janda Safe And Sound, sans-serif',
      color: '#FF3F73', // Primary Pink
    },
  },
});

const StyledScreenGrid = styled(ScreenGrid)`
  background-color: #fee761;
  background-image: radial-gradient(#f28f8a 10%, transparent 11%),
    radial-gradient(#54c2b9 10%, transparent 11%);
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
  background-repeat: repeat;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledFormGrid = styled(FormGrid)`
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  position: relative;
`;

const Logo = styled.img`
  width: 250px;
  margin-bottom: 1rem;
`;

const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
  .MuiOutlinedInput-root {
    border-radius: 25px;
    &:hover fieldset {
      border-color: ${theme.palette.primary.main};
    }
  }
`;

const StyledPrimaryButton = styled(PrimaryButton)`
  background-color: ${theme.palette.primary.main};
  color: white;
  font-family: 'Open Sans Bold', sans-serif;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 16px;
  &:hover {
    background-color: #f28f8a;
  }
`;

const SupportingElements = styled.div`
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
`;

const SupportingIcon = styled.img`
  width: 60px;
  margin: 0 10px;
`;

function LoginPage() {
  const navigate = useNavigate();

  const defaultValues = {
    email: '',
    password: '',
  };
  const defaultShowErrors = {
    email: false,
    password: false,
    alert: false,
  };
  const defaultErrorMessages = {
    email: '',
    password: '',
    alert: '',
  };
  type ValueType = keyof typeof values;

  const [values, setValueState] = useState(defaultValues);
  const [showError, setShowErrorState] = useState(defaultShowErrors);
  const [errorMessage, setErrorMessageState] = useState(defaultErrorMessages);

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

  const alertTitle = 'Error';
  const handleAlertClose = () => {
    setShowError('alert', false);
  };

  const dispatch = useAppDispatch();
  function dispatchUser(
    userEmail: string,
    firstName: string,
    lastName: string,
    admin: boolean,
  ) {
    dispatch(loginRedux({ email: userEmail, firstName, lastName, admin }));
  }

  const clearErrorMessages = () => {
    setShowErrorState(defaultShowErrors);
    setErrorMessageState(defaultErrorMessages);
  };

  const validateInputs = () => {
    clearErrorMessages();
    let isValid = true;

    Object.keys(values).forEach((valueTypeString) => {
      const valueType = valueTypeString as ValueType;
      if (!values[valueType]) {
        setErrorMessage(valueTypeString, InputErrorMessage.MISSING_INPUT);
        setShowError(valueTypeString, true);
        isValid = false;
      }
    });

    if (!values.email.match(emailRegex)) {
      setErrorMessage('email', InputErrorMessage.INVALID_EMAIL);
      setShowError('email', true);
      isValid = false;
    }
    if (!values.password) {
      setErrorMessage('password', InputErrorMessage.MISSING_INPUT);
      setShowError('password', true);
      isValid = false;
    }

    return isValid;
  };

  async function handleSubmit() {
    if (validateInputs()) {
      loginUser(values.email, values.password)
        .then((user) => {
          console.log('navigating to home!');
          dispatchUser(
            user.email!,
            user.firstName!,
            user.lastName!,
            user.admin!,
          );
          navigate('/home');
        })
        .catch((e) => {
          console.log('failed to login...');
          setShowError('alert', true);
          setErrorMessage('alert', e.message);
        });
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <StyledScreenGrid>
        <StyledFormGrid>
          <FormCol>
            <Grid item container justifyContent="center">
              <Logo src={PrimaryLogo} alt="Box of Balloons Logo" />
            </Grid>
            <Grid item container justifyContent="center">
              <Typography variant="h2" textAlign="center" color="primary">
                Welcome Back!
              </Typography>
            </Grid>
            <Grid item width="1">
              <StyledTextField
                fullWidth
                error={showError.email}
                helperText={errorMessage.email}
                type="email"
                required
                label="Email"
                value={values.email}
                onChange={(e) => setValue('email', e.target.value)}
              />
            </Grid>
            <Grid item width="1">
              <StyledTextField
                fullWidth
                error={showError.password}
                helperText={errorMessage.password}
                type="password"
                required
                label="Password"
                value={values.password}
                onChange={(e) => setValue('password', e.target.value)}
              />
            </Grid>
            <Grid item container justifyContent="center">
              <StyledPrimaryButton
                fullWidth
                type="submit"
                variant="contained"
                onClick={() => handleSubmit()}
              >
                Login
              </StyledPrimaryButton>
            </Grid>
            <FormRow>
              <Grid item>
                <Link
                  component={RouterLink}
                  to="/email-reset"
                  color="secondary"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/register" color="secondary">
                  Sign up
                </Link>
              </Grid>
            </FormRow>
            <SupportingElements>
              <SupportingIcon
                src={SupportingElement1}
                alt="Box Balloons Supporting Element"
              />
              <SupportingIcon src={SupportingElement2} alt="Balloon Box" />
            </SupportingElements>
          </FormCol>
        </StyledFormGrid>
        <Grid item>
          <AlertDialog
            showAlert={showError.alert}
            title={alertTitle}
            message={errorMessage.alert}
            onClose={handleAlertClose}
          />
        </Grid>
      </StyledScreenGrid>
    </ThemeProvider>
  );
}

export default LoginPage;
