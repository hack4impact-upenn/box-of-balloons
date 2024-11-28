import React, { useState, useEffect } from 'react';
import { Typography, Grid, Button, Card, CardContent, Box, Checkbox } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import axios from 'axios'; // Import axios for making HTTP requests
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/userSlice';

const theme = createTheme({
  typography: {
    fontFamily: "'Comic Sans MS', sans-serif", 
  },
});

function ChapterDashboardPage() {
  const { email } = useAppSelector(selectUser);  // Get the email from the Redux store
  const [birthdayRequests, setBirthdayRequests] = useState<any[]>([]); // State to hold fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling
  const [chapterId] = useState<string>('67156b8f624d2639a91ee518'); // Hardcoded chapterId for testing

  // Fetch birthday requests based on hardcoded chapterId
  useEffect(() => {
    const fetchRequests = async () => {
      if (!chapterId) return;  // Don't fetch if chapterId isn't set yet

      try {
        const response = await axios.get(`http://localhost:4000/api/birthdayrequest/all/${chapterId}`); // Fetch birthday requests using chapterId
        setBirthdayRequests(response.data); // Set data in state
        console.log('Birthday Requests:', response.data);  // Debugging: Log birthday requests
        setLoading(false); // Set loading to false once data is fetched
      } catch (err) {
        console.error('Error fetching birthday requests:', err);
        setError('Failed to load data');
        setLoading(false); // Set loading to false on error
      }
    };

    fetchRequests();
  }, [chapterId]); // Only run when chapterId is set

  if (loading) return <div>Loading...</div>; // Show loading message while data is being fetched
  if (error) return <div>Error: {error}</div>; // Show error message if the fetch fails

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ padding: 2, width: '100%', maxWidth: '900px', margin: 'auto' }}>
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

        {/* Active Requests */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Active Requests
          </Typography>

          {/* Table Header */}
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">Child Name</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">Birthday</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body1" fontWeight="bold">Agency Name</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="body1" fontWeight="bold">Mark Completed</Typography>
            </Grid>
            <Grid item xs={1}>
              {/* Empty for View Button */}
            </Grid>
          </Grid>

          {/* Active Requests Rows */}
          <Grid container direction="column" spacing={0.5}>
            {birthdayRequests
              .filter((request) => !request.delivered)  // Filter out delivered requests
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
                              backgroundColor: '#FFFFFF',
                              color: '#000000',
                              border: '1px solid #ccc',
                              '&:hover': {
                                backgroundColor: '#f0f0f0',
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
              .filter((request) => request.delivered)  // Filter out active requests
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
                              backgroundColor: '#FFFFFF',
                              color: '#000000',
                              border: '1px solid #ccc',
                              '&:hover': {
                                backgroundColor: '#f0f0f0',
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
