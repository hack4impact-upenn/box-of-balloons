/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Box,
  Checkbox,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useData, getData, putData } from '../util/api';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/userSlice';
import { IBirthdayRequest } from '../util/types/birthdayRequest';

/*
Things left to do:
1. when not currently accepting users go to admin and update the chapter to not accepting users @carolineychen8
2. when pending then move to approved and if not approved then die @aditighoshh
3. when mark as completed move to completed @aditighoshh
*/

const theme = createTheme({
  typography: {
    fontFamily: "'Comic Sans MS', sans-serif",
  },
});
/*
// hard coded data for table populating
const bdayRequests = [
  {
    id: 1,
    childName: 'Danny',
    birthday: '10/21/2024',
    agency: 'Agency 1',
    delivered: false,
    status: 'pending',
  },
  {
    id: 2,
    childName: 'Alice',
    birthday: '12/25/2024',
    agency: 'Agency 2',
    delivered: false,
    status: 'pending',
  },
  {
    id: 3,
    childName: 'Anna',
    birthday: '01/13/2025',
    agency: 'Agency 3',
    delivered: false,
    status: 'active',
  },
  {
    id: 4,
    childName: 'Ethan',
    birthday: '02/28/2025',
    agency: 'Agency 4',
    delivered: false,
    status: 'active',
  },
  {
    id: 5,
    childName: 'Steven',
    birthday: '08/28/2024',
    agency: 'Agency 4',
    delivered: true,
    status: 'completed',
  },
];
*/

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

interface ChapterDashboardPageProps {
  chapterId: string;
}

function ChapterDashboardPage() {
  const { email } = useAppSelector(selectUser); // Get the email from the Redux store
  const [birthdayRequests, setBirthdayRequests] = useState<IBirthdayRequest[]>(
    [],
  ); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  // const [chapterId] = useState<string>('67156b8f624d2639a91ee518'); // Hardcoded chapterId for testing
  const { chapterId } = useParams();
  // dialog stuff
  const [open, setOpen] = useState(false);

  function SimpleDialog(props: SimpleDialogProps) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
      onClose(selectedValue);
    };

    let data = {};

    for (let i = 0; i < birthdayRequests.length; i += 1) {
      if (birthdayRequests[i].id === selectedValue) {
        data = birthdayRequests[i];
        break;
      }
    }

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Birthday Request</DialogTitle>
        <List sx={{ pt: 0 }}>
          {Object.entries(data).map(([key, value]) => (
            <ListItem key={key}>
              <ListItemText primary={key} secondary={value?.toString()} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const response = useData('birthdayRequest/all/' + chapterId);
  useEffect(() => {
    if (response?.data) {
      setLoading(false);
      if (!Array.isArray(response?.data)) {
        setBirthdayRequests([response?.data]);
      } else {
        setBirthdayRequests(response?.data);
      }
    }
  }, [response]);

  const [checked, setChecked] = useState(false);
  const [checkboxCheck, setCheckboxCheck] = useState(false);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const response = await putData(`chapter/toggleRequests/${chapterId}`);
  };

  const handleCheckboxChange = async (id: string) => {
    setCheckboxCheck(true);
    const response = await putData(`birthdayRequest/updateStatus/${id}`, {
      updatedValue: 'Delivered',
    });
    console.log('CHANGED');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ padding: 2, width: '100%', maxWidth: '900px', margin: 'auto' }}
      >
        {/* Header with Image */}
        <Box sx={{ textAlign: 'left', mb: 2 }}>
          <img
            src="https://static.wixstatic.com/media/1c2bb5_a72721620feb4837b950cc07884703cf~mv2.jpg/v1/fill/w_1178,h_266,al_c,lg_1,q_80,enc_auto/1c2bb5_a72721620feb4837b950cc07884703cf~mv2.jpg"
            alt="Logo"
            style={{ width: 200, marginBottom: '16px' }}
          />
          <Typography variant="h4" fontWeight="bold" mb={1}>
            Welcome California!
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                color="primary"
              />
            }
            label={
              checked
                ? 'Currently Accepting Requests'
                : 'Not curently accepting requests'
            }
          />
        </Box>
        {/* Pending Requests */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Pending Requests
          </Typography>
          {/* Pending Header */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                Child Name
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography variant="body1" fontWeight="bold">
                Birthday
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                Agency Name
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* Empty for View Button */}
            </Grid>
          </Grid>
          {/* Pending Requests Rows */}
          <Grid container direction="column" spacing={0.5}>
            {birthdayRequests
              .filter((request) => request.status === 'Pending')
              .map((request) => (
                <Grid item key={request.id}>
                  <Grid container spacing={1} alignItems="center">
                    {/* Pending Request Card */}
                    <Grid item xs={9}>
                      <Card
                        variant="outlined"
                        sx={{
                          backgroundColor: '#F6F6F6', // Same as active requests background color
                          width: '100%', // Shrink the width of the card
                        }}
                      >
                        <CardContent sx={{ padding: 2 }}>
                          <Grid container>
                            {/* Child Name */}
                            <Grid item xs={4}>
                              <Typography variant="body1">
                                {request.childName}
                              </Typography>
                            </Grid>
                            {/* Birthday */}
                            <Grid item xs={3.5}>
                              <Typography variant="body1">
                                {request.childBirthday.toString()}
                              </Typography>
                            </Grid>
                            {/* Agency Name */}
                            <Grid item xs={3}>
                              <Typography variant="body1">
                                {request.agencyOrganization}
                              </Typography>
                            </Grid>
                            {/* View Button */}
                            <Grid item xs={1} textAlign="right">
                              <Button
                                variant="contained"
                                size="small"
                                sx={{
                                  backgroundColor: '#FFFFFF', // White background
                                  color: '#000000', // Black text
                                  border: '1px solid #ccc', // Optional border
                                  '&:hover': {
                                    backgroundColor: '#F0F0F0', // Slightly darker on hover
                                  },
                                  borderRadius: 4,
                                }}
                                onClick={handleOpenDialog}
                              >
                                View
                              </Button>
                              <SimpleDialog
                                selectedValue={request.id}
                                open={open}
                                onClose={handleClose}
                              />
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                    </Grid>
                    {/* Approve/Deny Card */}
                    <Grid item xs={3}>
                      <Box>
                        <Grid container spacing={1} justifyContent="center">
                          {/* Approve and Deny buttons side by side */}
                          <Grid item>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: '#AEFAA0',
                                color: 'white',
                                borderRadius: 6,
                              }}
                            >
                              Approve
                            </Button>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              size="small"
                              sx={{
                                backgroundColor: '#FC6A6A',
                                color: 'white',
                                borderRadius: 6,
                              }}
                            >
                              Deny
                            </Button>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </Box>
        {/* Active Requests */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Active Requests
          </Typography>
          {/* Active Header */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                Child Name
              </Typography>
            </Grid>
            <Grid item xs={2.5}>
              <Typography variant="body1" fontWeight="bold">
                Birthday
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                Agency Name
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">
                Mark Completed
              </Typography>
            </Grid>
            <Grid item xs={2}>
              {/* Empty for View Button */}
            </Grid>
          </Grid>
          {/* Active Requests Rows */}
          <Grid container direction="column" spacing={0.5}>
            {birthdayRequests
              .filter((request) => request.status === 'Approved')
              .map((request) => (
                <Grid item key={request.id}>
                  <Card
                    variant="outlined"
                    sx={{ backgroundColor: '#F6F6F6', width: '100%' }}
                  >
                    <CardContent>
                      <Grid container alignItems="center">
                        {/* Child Name */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.childName}
                          </Typography>
                        </Grid>
                        {/* Birthday */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.childBirthday.toString()}
                          </Typography>
                        </Grid>
                        {/* Agency Name */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.agencyOrganization}
                          </Typography>
                        </Grid>
                        {/* Mark Completed */}
                        <Grid item xs={2} textAlign="center">
                          <Checkbox
                            color="primary"
                            size="small"
                            inputProps={{ 'aria-label': 'Mark Completed' }}
                            onChange={() => handleCheckboxChange(request.id)}
                            checked={checkboxCheck}
                          />
                        </Grid>
                        {/* View Button */}
                        <Grid item xs={1} textAlign="right">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: '#FFFFFF', // White background
                              color: '#000000', // Black text
                              border: '1px solid #ccc', // Optional border
                              '&:hover': {
                                backgroundColor: '#F0F0F0', // Slightly darker on hover
                              },
                              borderRadius: 4,
                            }}
                            onClick={handleOpenDialog}
                          >
                            View
                          </Button>
                          <SimpleDialog
                            selectedValue={request.id}
                            open={open}
                            onClose={handleClose}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
        {/* Completed Requests */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Completed Requests
          </Typography>
          {/* Completed Requests Rows */}
          <Grid container direction="column" spacing={0.5}>
            {birthdayRequests
              .filter((request) => request.status === 'Delivered')
              .map((request) => (
                <Grid item key={request.id}>
                  <Card
                    variant="outlined"
                    sx={{ backgroundColor: '#D9D9D9', width: '100%' }}
                  >
                    <CardContent>
                      <Grid container alignItems="center">
                        {/* Child Name */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.childName}
                          </Typography>
                        </Grid>
                        {/* Birthday */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.childBirthday.toString()}
                          </Typography>
                        </Grid>
                        {/* Agency Name */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.agencyOrganization}
                          </Typography>
                        </Grid>
                        <Grid item xs={2} textAlign="center">
                          <Checkbox
                            color="primary"
                            size="small"
                            disabled
                            checked
                          />
                        </Grid>
                        {/* View Button */}
                        <Grid item xs={1} textAlign="right">
                          <Button
                            variant="contained"
                            size="small"
                            sx={{
                              backgroundColor: '#FFFFFF', // White background
                              color: '#000000', // Black text
                              border: '1px solid #ccc', // Optional border
                              '&:hover': {
                                backgroundColor: '#F0F0F0', // Slightly darker on hover
                              },
                              borderRadius: 4,
                            }}
                            onClick={handleOpenDialog}
                          >
                            View
                          </Button>
                          <SimpleDialog
                            selectedValue={request.id}
                            open={open}
                            onClose={handleClose}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
export default ChapterDashboardPage;
