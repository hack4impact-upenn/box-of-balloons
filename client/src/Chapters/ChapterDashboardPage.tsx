import React from 'react';
import {
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  Box,
  Checkbox,
} from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { getData } from '../util/api';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { IBirthdayRequest } from '../util/types/birthdayRequest';

const theme = createTheme({
  typography: {
    fontFamily: "'Comic Sans MS', sans-serif",
  },
});

/** 
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

function ChapterDashboardPage() {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const (bdayRequest, setBdayRequest) = useState<IBirthdayRequest[]>([]);
  const birthdayRequests = getData('all/67156b8f624d2639a91ee518');
  useEffect(() => {
    setBdayRequest(birthdayRequests?.data);
  }, [birthdayRequests]);


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
                                {request.birthday}
                              </Typography>
                            </Grid>
                            {/* Agency Name */}
                            <Grid item xs={3}>
                              <Typography variant="body1">
                                {request.agency}
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
                                    backgroundColor: '#f0f0f0', // Slightly darker on hover
                                  },
                                  borderRadius: 4,
                                }}
                              >
                                View
                              </Button>
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
                                backgroundColor: 'green',
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
                                backgroundColor: 'red',
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
                            {request.birthday}
                          </Typography>
                        </Grid>
                        {/* Agency Name */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.agency}
                          </Typography>
                        </Grid>
                        {/* Mark Completed */}
                        <Grid item xs={2} textAlign="center">
                          <Checkbox
                            color="primary"
                            size="small"
                            inputProps={{ 'aria-label': 'Mark Completed' }}
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
                                backgroundColor: '#f0f0f0', // Slightly darker on hover
                              },
                              borderRadius: 4,
                            }}
                            onClick={handleOpenDialog}
                          >
                            View
                          </Button>
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
              .filter((request) => request.delivered)
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
                            {request.birthday}
                          </Typography>
                        </Grid>
                        {/* Agency Name */}
                        <Grid item xs={3}>
                          <Typography variant="body1">
                            {request.agency}
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
                                backgroundColor: '#f0f0f0', // Slightly darker on hover
                              },
                              borderRadius: 4,
                            }}
                          >
                            View
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Dialog Title!!</DialogTitle>
          <DialogContent>{/* Dialog content here */}</DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
}

export default ChapterDashboardPage;
