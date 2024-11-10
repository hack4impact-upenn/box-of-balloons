import React from 'react';
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

function OverviewTable({ color }: { color: string }) {
  return (
    <Box sx={{ mb: 3, backgroundColor: '#F5F5F5', p: 0, borderRadius: 1 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color }}>Age</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Race/ethnicity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Sexual Identity
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
            <TableCell sx={{ fontWeight: 'bold', color }}>
              Situation Being Faced
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {[
            {
              age: '1-5',
              ageCount: 55,
              race: 'American Indian or Alaska Native',
              raceCount: 55,
              identity: 'Girl',
              identityCount: 55,
              situation: 'Foster care',
              situationCount: 55,
            },
            {
              age: '6-9',
              ageCount: 20,
              race: 'Asian',
              raceCount: 20,
              identity: 'Boy',
              identityCount: 20,
              situation: 'Homelessness',
              situationCount: 20,
            },
            {
              age: '9-12',
              ageCount: 31,
              race: 'Black or African American',
              raceCount: 31,
              identity: 'Transgender',
              identityCount: 31,
              situation: 'Domestic Violence',
              situationCount: 31,
            },
            {
              age: '',
              ageCount: '',
              race: 'Hispanic or Latino',
              raceCount: 55,
              identity: 'Non-binary/non-conforming',
              identityCount: 55,
              situation: 'Medical Treatment',
              situationCount: 55,
            },
            {
              age: '',
              ageCount: '',
              race: 'Middle Eastern or North African',
              raceCount: 20,
              identity: 'Prefer not to say',
              identityCount: 20,
              situation: 'Financial insecurity',
              situationCount: 20,
            },
            {
              age: '',
              ageCount: '',
              race: 'Native Hawaiian or Pacific Islander',
              raceCount: 31,
              identity: 'Other',
              identityCount: 31,
              situation: '',
              situationCount: '',
            },
            {
              age: '',
              ageCount: '',
              race: 'White',
              raceCount: 55,
              identity: '',
              identityCount: '',
              situation: '',
              situationCount: '',
            },
            {
              age: '',
              ageCount: '',
              race: 'Other',
              raceCount: 20,
              identity: '',
              identityCount: '',
              situation: '',
              situationCount: '',
            },
          ].map((row, index) => (
            <TableRow
              key={index} /* eslint-disable-line react/no-array-index-key */
            >
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
          <TableRow sx={{ backgroundColor: '#D9D9D9' }}>
            <TableCell sx={{ fontWeight: 'bold' }}>Total</TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
            <TableCell> </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
            <TableCell> </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
            <TableCell> </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color }}>55</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
}

function TempAdminDashboardPage() {
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
      <OverviewTable color="#0FA497" />
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
        <Typography variant="body2" color="textSecondary">
          2024
        </Typography>
      </Box>
      <OverviewTable color="#DF5959" />
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
        <Typography variant="body2" color="textSecondary">
          Since 2005
        </Typography>
      </Box>
      <OverviewTable color="#F1CA1F" />
    </Box>
  );
}

export default TempAdminDashboardPage;