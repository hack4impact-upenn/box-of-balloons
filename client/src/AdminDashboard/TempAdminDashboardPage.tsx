import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';

function DashboardHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
      }}
    >
      <Typography variant="h3">Admin Dashboard</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Paper
          elevation={1}
          sx={{ p: 1, textAlign: 'center', width: 200, alignContent: 'center' }}
        >
          <Typography variant="subtitle1">Active Chapters</Typography>
          <Typography variant="h5">50</Typography>
        </Paper>
        <Paper
          elevation={1}
          sx={{ p: 1, textAlign: 'center', width: 200, alignContent: 'center' }}
        >
          <Typography variant="subtitle1">
            Chapters Accepting Requests
          </Typography>
          <Typography variant="h5">35</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

// function OverviewTable({ color }: { color: string }) {
//   return (
//     <Box sx={{ mb: 3, backgroundColor: '#F5F5F5', p: 0, borderRadius: 1 }}>
//       <Table size="small">
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 'bold', color }}>Age</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }} />
//             <TableCell sx={{ fontWeight: 'bold', color }}>
//               Race/ethnicity
//             </TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }} />
//             <TableCell sx={{ fontWeight: 'bold', color }}>
//               Sexual Identity
//             </TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }} />
//             <TableCell sx={{ fontWeight: 'bold', color }}>
//               Situation Being Faced
//             </TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }} />
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {[
//             {
//               age: '1-5',
//               ageCount: 55,
//               race: 'American Indian or Alaska Native',
//               raceCount: 55,
//               identity: 'Girl',
//               identityCount: 55,
//               situation: 'Foster care',
//               situationCount: 55,
//             },
//             {
//               age: '6-9',
//               ageCount: 20,
//               race: 'Asian',
//               raceCount: 20,
//               identity: 'Boy',
//               identityCount: 20,
//               situation: 'Homelessness',
//               situationCount: 20,
//             },
//             {
//               age: '9-12',
//               ageCount: 31,
//               race: 'Black or African American',
//               raceCount: 31,
//               identity: 'Transgender',
//               identityCount: 31,
//               situation: 'Domestic Violence',
//               situationCount: 31,
//             },
//             {
//               age: '',
//               ageCount: '',
//               race: 'Hispanic or Latino',
//               raceCount: 55,
//               identity: 'Non-binary/non-conforming',
//               identityCount: 55,
//               situation: 'Medical Treatment',
//               situationCount: 55,
//             },
//             {
//               age: '',
//               ageCount: '',
//               race: 'Middle Eastern or North African',
//               raceCount: 20,
//               identity: 'Prefer not to say',
//               identityCount: 20,
//               situation: 'Financial insecurity',
//               situationCount: 20,
//             },
//             {
//               age: '',
//               ageCount: '',
//               race: 'Native Hawaiian or Pacific Islander',
//               raceCount: 31,
//               identity: 'Other',
//               identityCount: 31,
//               situation: '',
//               situationCount: '',
//             },
//             {
//               age: '',
//               ageCount: '',
//               race: 'White',
//               raceCount: 55,
//               identity: '',
//               identityCount: '',
//               situation: '',
//               situationCount: '',
//             },
//             {
//               age: '',
//               ageCount: '',
//               race: 'Other',
//               raceCount: 20,
//               identity: '',
//               identityCount: '',
//               situation: '',
//               situationCount: '',
//             },
//           ].map((row, index) => (
//             <TableRow
//               key={index} /* eslint-disable-line react/no-array-index-key */
//             >
//               <TableCell>{row.age}</TableCell>
//               <TableCell sx={{ color }}>{row.ageCount}</TableCell>
//               <TableCell>{row.race}</TableCell>
//               <TableCell sx={{ color }}>{row.raceCount}</TableCell>
//               <TableCell>{row.identity}</TableCell>
//               <TableCell sx={{ color }}>{row.identityCount}</TableCell>
//               <TableCell>{row.situation}</TableCell>
//               <TableCell sx={{ color }}>{row.situationCount}</TableCell>
//             </TableRow>
//           ))}
//           <TableRow sx={{ backgroundColor: '#D9D9D9' }}>
//             <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
//             <TableCell> </TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
//             <TableCell> </TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
//             <TableCell> </TableCell>
//             <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
//           </TableRow>
//         </TableBody>
//       </Table>
//     </Box>
//   );
// }

function OverviewTable({ data }: { data: OverviewData }) {
  const { ages, races, genders, situations } = data;

  const maxRows = Math.max(
    ages.length,
    races.length,
    genders.length,
    situations.length,
  );

  return (
    <Box sx={{ mb: 3, backgroundColor: '#F5F5F5', p: 0, borderRadius: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Race/Ethnicity</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Sexual Identity</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Situation</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: maxRows }).map((_, i) => (
            <TableRow
              key={i} /* eslint-disable-line react/no-array-index-key */
            >
              <TableCell>{ages[i]?.label || ''}</TableCell>
              <TableCell>{ages[i]?.count || 0}</TableCell>
              <TableCell>{races[i]?.label || ''}</TableCell>
              <TableCell>{races[i]?.count || 0}</TableCell>
              <TableCell>{genders[i]?.label || ''}</TableCell>
              <TableCell>{genders[i]?.count || 0}</TableCell>
              <TableCell>{situations[i]?.label || ''}</TableCell>
              <TableCell>{situations[i]?.count || 0}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ backgroundColor: '#D9D9D9' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell>
              {ages.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
            <TableCell />
            <TableCell>
              {races.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
            <TableCell />
            <TableCell>
              {genders.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
            <TableCell />
            <TableCell>
              {situations.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

interface OverviewTableProps {
  color: string;
}

interface TransformedData {
  label: string;
  data: Record<string, number>; // Define data as an object with string keys and number values
}

interface BirthdayRequest {
  childAge: number;
  childRace: string;
  childGender: string;
  childSituation: string;
}

const childRaceOptions = [
  'American Indian or Alaska Native',
  'Asian',
  'Black or African American',
  'Hispanic or Latino',
  'Middle Eastern or North African (MENA)',
  'Native Hawaiian or Pacific Islander',
  'White',
  'Other',
];

const childGenderOptions = [
  'Boy',
  'Girl',
  'Transgender',
  'Non-binary/non-conforming',
  'Prefer not to say',
];

const childSituationOptions = [
  'Fostercare',
  'Homelessness',
  'Domestic Violence',
  'Medical treatment',
  'Financial insecurities',
];

interface OverviewData {
  ages: { label: string; count: number }[];
  races: { label: string; count: number }[];
  genders: { label: string; count: number }[];
  situations: { label: string; count: number }[];
}

// function TempAdminDashboardPage() {
//   const [monthlyOverview, setMonthlyOverview] = useState(null);

//   useEffect(() => {
//     const fetchMonthlyOverview = async () => {
//       try {
//         const startDate = new Date('2023-01-01');
//         const endDate = new Date('2024-11-15');
//         const response = await axios.get(
//           `http://localhost:4000/api/birthdayrequest/monthly-overview`,
//           {
//             params: { startDate, endDate },
//           },
//         );
//         console.log('Monthly Overview Response:', response.data); // Log the response to see the data structure
//         setMonthlyOverview(response.data); // Set state to use data in UI later
//       } catch (error) {
//         console.error('Error fetching monthly overview:', error);
//       }
//     };

//     fetchMonthlyOverview();
//   }, []);

//   // const [requests, setRequests] = useState(null);
//   // const testChapterId = '671e9ffc2c9e667bba7debc6';

//   // useEffect(() => {
//   //   const fetchAllRequests = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         `http://localhost:4000/api/birthdayrequest/all/${testChapterId}`,
//   //       );
//   //       console.log('All Requests Response:', response.data); // Log the response to inspect the data
//   //       setRequests(response.data); // Set state to use data in UI later if needed
//   //     } catch (error) {
//   //       console.error('Error fetching all requests:', error);
//   //     }
//   //   };

//   //   fetchAllRequests();
//   // }, [testChapterId]);

//   return (
//     <Box sx={{ p: 3 }}>
//       <DashboardHeader />
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-end',
//           mb: 2,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ mt: 4, mb: 2, color: '#0FA497', fontWeight: 'bold' }}
//         >
//           Monthly Overview of Children Served
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Jan 1 - Jan 31, 2024
//         </Typography>
//       </Box>
//       <OverviewTable color="#0FA497" />
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-end',
//           mb: 2,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ mt: 4, mb: 2, color: '#DF5959', fontWeight: 'bold' }}
//         >
//           Yearly Overview of Children Served
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           2024
//         </Typography>
//       </Box>
//       <OverviewTable color="#DF5959" />
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'flex-end',
//           mb: 2,
//         }}
//       >
//         <Typography
//           variant="h5"
//           sx={{ mt: 4, mb: 2, color: '#F1CA1F', fontWeight: 'bold' }}
//         >
//           To Date Overview of Children Served
//         </Typography>
//         <Typography variant="body2" color="textSecondary">
//           Since 2005
//         </Typography>
//       </Box>
//       <OverviewTable color="#F1CA1F" />
//     </Box>
//   );
// }

function TempAdminDashboardPage() {
  const [monthlyOverview, setMonthlyOverview] = useState<OverviewData | null>(
    null,
  );

  useEffect(() => {
    const fetchMonthlyOverview = async () => {
      try {
        const startDate = new Date('2023-01-01');
        const endDate = new Date('2024-11-15');
        const response = await axios.get(
          `http://localhost:4000/api/birthdayrequest/monthly-overview`,
          {
            params: { startDate, endDate },
          },
        );

        console.log('Monthly Overview Response:', response.data);

        // Extract the counts from the response
        const { ageCounts, raceCounts, genderCounts, situationCounts } =
          response.data[0];

        const ageRanges = ['1-5', '6-9', '10-12']; // Add all age ranges

        // Ensure that all counts are cast to numbers explicitly
        const formattedData: OverviewData = {
          ages: ageRanges.map((range) => ({
            label: range,
            count: Number(ageCounts[range] || 0), // Fill missing age ranges with 0
          })),
          races: childRaceOptions.map((race) => ({
            label: race,
            count: Number(raceCounts[race] || 0), // Explicitly set missing counts to 0
          })),
          genders: childGenderOptions.map((gender) => ({
            label: gender,
            count: Number(genderCounts[gender] || 0), // Explicitly set missing counts to 0
          })),
          situations: childSituationOptions.map((situation) => ({
            label: situation,
            count: Number(situationCounts[situation] || 0), // Explicitly set missing counts to 0
          })),
        };

        setMonthlyOverview(formattedData);
      } catch (error) {
        console.error('Error fetching monthly overview:', error);
      }
    };

    fetchMonthlyOverview(); // Call the function here
  }, []); // Add an empty dependency array to ensure it runs only once

  return (
    <Box sx={{ p: 3 }}>
      <DashboardHeader />
      <Box sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          sx={{ mt: 4, mb: 2, color: '#0FA497', fontWeight: 'bold' }}
        >
          Monthly Overview of Children Served
        </Typography>
        {monthlyOverview ? (
          <OverviewTable data={monthlyOverview} />
        ) : (
          <Typography>Loading...</Typography>
        )}
      </Box>
    </Box>
  );
}

export default TempAdminDashboardPage;
