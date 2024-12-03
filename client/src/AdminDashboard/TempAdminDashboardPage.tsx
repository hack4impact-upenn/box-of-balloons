import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import axios from 'axios';

// function DashboardHeader() {
//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         p: 2,
//       }}
//     >
//       <Typography variant="h3">Admin Dashboard</Typography>
//     </Box>
//   );
// }

function DashboardHeader({
  activeUserCount,
  acceptingRequestsUserCount,
}: {
  activeUserCount: number | null;
  acceptingRequestsUserCount: number | null;
}) {
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
        <Box
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Active Chapters
          </Typography>
          <Typography variant="h6">
            {activeUserCount ?? 'Loading...'}
          </Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Chapters Accepting Requests
          </Typography>
          <Typography variant="h6">
            {acceptingRequestsUserCount ?? 'Loading...'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
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

function OverviewTable({ data, color }: { data: OverviewData; color: string }) {
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
            <TableCell sx={{ fontWeight: 'bold', color }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Race/Ethnicity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Sexual Identity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
            <TableCell sx={{ fontWeight: 'bold', color }}>Situation</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: maxRows }).map((_, i) => (
            <TableRow
              key={i} /* eslint-disable-line react/no-array-index-key */
            >
              <TableCell>{ages[i]?.label || ''}</TableCell>
              <TableCell sx={{ color }}>{ages[i]?.count || ''}</TableCell>
              <TableCell>{races[i]?.label || ''}</TableCell>
              <TableCell sx={{ color }}>{races[i]?.count || ''}</TableCell>
              <TableCell>{genders[i]?.label || ''}</TableCell>
              <TableCell sx={{ color }}>{genders[i]?.count || ''}</TableCell>
              <TableCell>{situations[i]?.label || ''}</TableCell>
              <TableCell sx={{ color }}>{situations[i]?.count || ''}</TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ backgroundColor: '#D9D9D9' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>
              {ages.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              {races.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              {genders.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
            <TableCell />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              {situations.reduce((sum, row) => sum + row.count, 0)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

function TempAdminDashboardPage() {
  const [monthlyOverview, setMonthlyOverview] = useState<OverviewData | null>(
    null,
  );
  const [yearlyOverview, setYearlyOverview] = useState<OverviewData | null>(
    null,
  );
  const [toDateOverview, setToDateOverview] = useState<OverviewData | null>(
    null,
  );
  const [dateLabels, setDateLabels] = useState({
    monthly: '',
    yearly: '',
    toDate: '',
  });

  const [activeUserCount, setActiveUserCount] = useState<number | null>(null);
  const [acceptingRequestsUserCount, setAcceptingRequestsUserCount] = useState<
    number | null
  >(null);

  useEffect(() => {
    const fetchOverview = async (startDate: Date, endDate: Date) => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/birthdayrequest/monthly-overview`,
          {
            params: { startDate, endDate },
          },
        );

        const activeUserResponse = await axios.get(
          `http://localhost:4000/api/user/activeUserCount`,
        );
        setActiveUserCount(activeUserResponse.data.activeUserCount);

        const acceptingRequestsUserResponse = await axios.get(
          `http://localhost:4000/api/user/acceptingRequestsUserCount`,
        );
        setAcceptingRequestsUserCount(
          acceptingRequestsUserResponse.data.acceptingRequestsUserCount,
        );

        const { ageCounts, raceCounts, genderCounts, situationCounts } =
          response.data[0];

        const ageRanges = ['1-5', '6-9', '10-12'];

        const formattedData: OverviewData = {
          ages: ageRanges.map((range) => ({
            label: range,
            count: Number(ageCounts[range] || 0),
          })),
          races: childRaceOptions.map((race) => ({
            label: race,
            count: Number(raceCounts[race] || 0),
          })),
          genders: childGenderOptions.map((gender) => ({
            label: gender,
            count: Number(genderCounts[gender] || 0),
          })),
          situations: childSituationOptions.map((situation) => ({
            label: situation,
            count: Number(situationCounts[situation] || 0),
          })),
        };

        return formattedData;
      } catch (error) {
        console.error('Error fetching overview:', error);
        return null;
      }
    };

    const fetchAllOverviews = async () => {
      const currentMonthStart = new Date();
      currentMonthStart.setDate(1);
      const currentMonthEnd = new Date();
      currentMonthEnd.setMonth(currentMonthStart.getMonth() + 1);
      currentMonthEnd.setDate(0);

      const currentYearStart = new Date(new Date().getFullYear(), 0, 1);
      const currentYearEnd = new Date(new Date().getFullYear(), 11, 31);

      const toDateStart = new Date(2005, 0, 1);
      const toDateEnd = new Date();

      const [monthly, yearly, toDate] = await Promise.all([
        fetchOverview(currentMonthStart, currentMonthEnd),
        fetchOverview(currentYearStart, currentYearEnd),
        fetchOverview(toDateStart, toDateEnd),
      ]);

      setMonthlyOverview(monthly);
      setYearlyOverview(yearly);
      setToDateOverview(toDate);

      // Set dynamic date labels
      setDateLabels({
        monthly: `${currentMonthStart.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })} - ${currentMonthEnd.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        })}`,
        yearly: `${currentYearStart.getFullYear()}`,
        toDate: `Since ${toDateStart.getFullYear()}`,
      });
    };

    fetchAllOverviews();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* <DashboardHeader /> */}
      <DashboardHeader
        activeUserCount={activeUserCount}
        acceptingRequestsUserCount={acceptingRequestsUserCount}
      />
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
        {/* <Box sx={{ display: 'flex', gap: 2 }}>
          <Box
            sx={{
              backgroundColor: '#DFF6F0',
              borderRadius: 2,
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Active Users
            </Typography>
            <Typography variant="h6">
              {activeUserCount ?? 'Loading...'}
            </Typography>
          </Box>
          <Box
            sx={{
              backgroundColor: '#FFF5D1',
              borderRadius: 2,
              padding: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Accepting Requests
            </Typography>
            <Typography variant="h6">
              {acceptingRequestsUserCount ?? 'Loading...'}
            </Typography>
          </Box>
        </Box> */}
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', color: '#0FA497' }}
        >
          {dateLabels.monthly}
        </Typography>
      </Box>
      {monthlyOverview && (
        <OverviewTable data={monthlyOverview} color="#0FA497" />
      )}
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
          sx={{ mt: 4, mb: 2, color: '#DF5959', fontWeight: 'bold' }}
        >
          Yearly Overview of Children Served
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', color: '#DF5959' }}
        >
          {dateLabels.yearly}
        </Typography>
      </Box>
      {yearlyOverview && (
        <OverviewTable data={yearlyOverview} color="#DF5959" />
      )}
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
          sx={{ mt: 4, mb: 2, color: '#F1CA1F', fontWeight: 'bold' }}
        >
          To Date Overview of Children Served
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 'bold', color: '#F1CA1F' }}
        >
          {dateLabels.toDate}
        </Typography>
      </Box>
      {toDateOverview && (
        <OverviewTable data={toDateOverview} color="#F1CA1F" />
      )}
    </Box>
  );
}

export default TempAdminDashboardPage;
