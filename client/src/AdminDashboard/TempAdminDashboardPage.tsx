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

type OverviewData = {
  age: string;
  ageCount: number;
  race: string;
  raceCount: number;
  identity: string;
  identityCount: number;
  situation: string;
  situationCount: number;
};

function OverviewTable({
  color,
  data,
}: {
  color: string;
  data: OverviewData[];
}) {
  return (
    <Box sx={{ mb: 3, backgroundColor: '#F5F5F5', p: 0, borderRadius: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Race/ethnicity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Sexual Identity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>Count</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>Situation</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell>{row.age}</TableCell>
              <TableCell sx={{ color }}>{row.ageCount}</TableCell>
              <TableCell>{row.race}</TableCell>
              <TableCell sx={{ color }}>{row.raceCount}</TableCell>
              <TableCell>{row.identity}</TableCell>
              <TableCell sx={{ color }}>{row.identityCount}</TableCell>
              <TableCell>{row.situation}</TableCell>
              <TableCell sx={{ color }}>{row.situationCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}

// function TempAdminDashboardPage() {
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
  const [monthlyData, setMonthlyData] = useState<OverviewData[]>([]);

  useEffect(() => {
    // Fetch data from the backend
    async function fetchMonthlyData() {
      try {
        const response = await axios.get('/api/requests/monthly-overview');
        console.log('Data fetched from backend:', response.data);
        const data = response.data.map((item: any) => ({
          age: item.ageRange || '', // Adjust field names as necessary
          ageCount: item.ageCount || 0,
          race: item.race || '',
          raceCount: item.raceCount || 0,
          identity: item.identity || '',
          identityCount: item.identityCount || 0,
          situation: item.situation || '',
          situationCount: item.situationCount || 0,
        }));
        setMonthlyData(data);
      } catch (error) {
        console.error('Error fetching monthly overview data:', error);
      }
    }

    fetchMonthlyData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <DashboardHeader />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mb: 2,
        }}
      >
        <Typography
          variant="h5"
          sx={{ mt: 4, mb: 2, color: '#0FA497', fontWeight: 'bold' }}
        >
          Monthly Overview of Children Served
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Jan 1 - Jan 31, 2024
        </Typography>
      </Box>
      <OverviewTable color="#0FA497" data={monthlyData} />

      {/* Additional sections for yearly and to-date overviews */}
    </Box>
  );
}

export default TempAdminDashboardPage;
