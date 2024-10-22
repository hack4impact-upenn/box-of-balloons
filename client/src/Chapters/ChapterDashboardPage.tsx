import React from 'react';
import { Typography, Grid, Button, Card, CardContent, Box, Checkbox, Avatar } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: "'Comic Sans MS', sans-serif", 
  },
});



const birthdayRequests = [
  { id: 1, childName: 'Danny', birthday: '10/21/2024', agency: 'Agency 1', delivered: false },
  { id: 2, childName: 'Alice', birthday: '12/25/2024', agency: 'Agency 2', delivered: false },
  { id: 3, childName: 'Anna', birthday: '01/13/2025', agency: 'Agency 3', delivered: false },
  { id: 4, childName: 'Ethan', birthday: '02/28/2025', agency: 'Agency 4', delivered: false },
  { id: 5, childName: 'Steven', birthday: '08/28/2024', agency: 'Agency 4', delivered: true },
];

function ChapterDashboardPage() {
  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ padding: 2, width: '100%', maxWidth: '900px', margin: 'auto' }}>
      {/* Header with Image */}
      <Box sx={{ textAlign: 'left', mb: 2 }}>
        
        

      { <img src="https://static.wixstatic.com/media/1c2bb5_a72721620feb4837b950cc07884703cf~mv2.jpg/v1/fill/w_1178,h_266,al_c,lg_1,q_80,enc_auto/1c2bb5_a72721620feb4837b950cc07884703cf~mv2.jpg" alt="Logo" style={{ width: 200, marginBottom: '16px' }} /> }


        <Typography variant="h4" fontWeight="bold" mb={1}>
          Welcome California!
        </Typography>
      </Box>

      {/* Active Requests */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={1}>
          Active Requests
        </Typography>

        {/* Table Header */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={3}>
            <Typography variant="body1" fontWeight="bold">
              Child Name
            </Typography>
          </Grid>
          <Grid item xs={3}>
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
            <Typography variant="body1" fontWeight="bold">
              Mark Completed
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {/* Empty for View Button */}
          </Grid>
        </Grid>

        {/* Active Requests Rows */}
        <Grid container direction="column" spacing={0.5}>
          {birthdayRequests
            .filter((request) => !request.delivered)
            .map((request) => (
              <Grid item key={request.id}>
                <Card variant="outlined" sx={{ backgroundColor: '#F6F6F6', width: '100%' }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      {/* Child Name */}
                      <Grid item xs={3}>
                        <Typography variant="body1">{request.childName}</Typography>
                      </Grid>
                      {/* Birthday */}
                      <Grid item xs={3}>
                        <Typography variant="body1">{request.birthday}</Typography>
                      </Grid>
                      {/* Agency Name */}
                      <Grid item xs={3}>
                        <Typography variant="body1">{request.agency}</Typography>
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
    color: '#000000',           // Black text
    border: '1px solid #ccc',   // Optional border
    '&:hover': {
      backgroundColor: '#f0f0f0', // Slightly darker on hover
    },
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
                <Card variant="outlined" sx={{ backgroundColor: '#D9D9D9', width: '100%' }}>
                  <CardContent>
                    <Grid container alignItems="center">
                      {/* Child Name */}
                      <Grid item xs={3}>
                        <Typography variant="body1">{request.childName}</Typography>
                      </Grid>
                      {/* Birthday */}
                      <Grid item xs={3}>
                        <Typography variant="body1">{request.birthday}</Typography>
                      </Grid>
                      {/* Agency Name */}
                      <Grid item xs={3}>
                        <Typography variant="body1">{request.agency}</Typography>
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
    color: '#000000',           // Black text
    border: '1px solid #ccc',   // Optional border
    '&:hover': {
      backgroundColor: '#f0f0f0', // Slightly darker on hover
    },
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
    </Box>
    </ThemeProvider>
  );
}

export default ChapterDashboardPage;
