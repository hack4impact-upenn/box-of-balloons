import React from 'react';
import { Typography, Grid, Button, Card, CardContent, Box } from '@mui/material';

const birthdayRequests = [
  { id: 1, childName: 'Danny', birthday: '10/21/2024', agency: 'Agency 1', delivered: false },
  { id: 2, childName: 'Alice', birthday: '12/25/2024', agency: 'Agency 2', delivered: false },
  { id: 3, childName: 'Anna', birthday: '01/13/2025', agency: 'Agency 3', delivered: false },
  { id: 4, childName: 'Ethan', birthday: '02/28/2025', agency: 'Agency 4', delivered: false },
  { id: 5, childName: 'Steven', birthday: '08/28/2024', agency: 'Agency 4', delivered: true },
];

function ChapterDashboardPage() {
  return (
    <Box sx={{ padding: 2, width: '100%', maxWidth: '900px', margin: 'auto' }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
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
          <Grid item xs={3}>
            {/* Empty for View Button */}
          </Grid>
        </Grid>

        {/* Active Requests Rows */}
        <Grid container direction="column" spacing={2}>
          {birthdayRequests
            .filter((request) => !request.delivered)
            .map((request) => (
              <Grid item key={request.id}>
                <Card variant="outlined">
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
                      {/* View Button */}
                      <Grid item xs={3} textAlign="right">
                        <Button variant="contained" size="small">
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
        <Grid container direction="column" spacing={2}>
          {birthdayRequests
            .filter((request) => request.delivered)
            .map((request) => (
              <Grid item key={request.id}>
                <Card variant="outlined">
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
                      {/* View Button */}
                      <Grid item xs={3} textAlign="right">
                        <Button variant="contained" size="small">
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
  );
}

export default ChapterDashboardPage;
