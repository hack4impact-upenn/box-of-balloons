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
  CircularProgress,
  Stack,
} from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useData, getData, putData, deleteData } from '../util/api';
import { useAppSelector } from '../util/redux/hooks';
import { selectUser } from '../util/redux/userSlice';
import IBirthdayRequest from '../util/types/birthdayRequest';
import Logo from './Logo';
import IChapter from '../util/types/chapter';
import ChapterDashboardHeader from './ChapterDashboardHeader';
import AcceptingRequestsToggle from './AcceptingRequestsToggle';
import PendingRequestsTable from './PendingRequestsTable';
import ActiveRequestsTable from './ActiveRequestsTable';
import CompletedRequestsTable from './CompletedRequestsTable';

/*
Things left to do:
1. when not currently accepting users go to admin and update the chapter to not accepting users @carolineychen8
2. when pending then move to approved and if not approved then die @aditighoshh
3. when mark as completed move to completed @aditighoshh
*/

const theme = createTheme({
  typography: {
    // fontFamily: "'Times New Roman', serif",
  },
});

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function ChapterDashboardPage() {
  const { chapterId } = useParams();

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  const chapterResponse = useData('chapter/query/' + chapterId);
  const { data: rawChapter, error: chapterError } = chapterResponse ?? {};
  const chapter = {
    ...rawChapter,
    id: chapterId,
  } as IChapter;

  const birthdayRequestsResponse = useData('birthdayRequest/all/' + chapterId);
  const { data: rawBirthdayRequests, error: birthdayRequestsError } =
    birthdayRequestsResponse ?? {};

  const [pendingRequests, setPendingRequests] = useState<IBirthdayRequest[]>(
    [],
  );
  const [approvedRequests, setApprovedRequests] = useState<IBirthdayRequest[]>(
    [],
  );
  const [deliveredRequests, setDeliveredRequests] = useState<
    IBirthdayRequest[]
  >([]);

  useEffect(() => {
    if (rawChapter && rawBirthdayRequests) {
      setLoading(false);

      const birthdayRequests = rawBirthdayRequests?.map(
        (rawBirthdayRequest: any) => ({
          ...rawBirthdayRequest,
          // eslint-disable-next-line no-underscore-dangle
          id: rawBirthdayRequest._id,
        }),
      ) as IBirthdayRequest[];

      const pendingRequestsData = birthdayRequests?.filter(
        (birthdayRequest) => {
          return birthdayRequest.status === 'Pending';
        },
      );
      setPendingRequests(pendingRequestsData);
      const approvedRequestsData = birthdayRequests?.filter(
        (birthdayRequest) => {
          return birthdayRequest.status === 'Approved';
        },
      );
      setApprovedRequests(approvedRequestsData);
      const deliveredRequestsData = birthdayRequests?.filter(
        (birthdayRequest) => {
          return birthdayRequest.status === 'Delivered';
        },
      );
      setDeliveredRequests(deliveredRequestsData);
    } else if (chapterError) {
      setError(chapterError);
    } else if (birthdayRequestsError) {
      setError(birthdayRequestsError);
    }
  }, [rawChapter, chapterError, rawBirthdayRequests, birthdayRequestsError]);

  const updateRequestStatus = async (
    request: IBirthdayRequest,
    newStatus: string,
  ) => {
    const { error } = await putData(
      `birthdayRequest/updatestatus/${request.id}`,
      {
        updatedValue: newStatus,
      },
    );

    if (error) {
      setError(error);
      return;
    }

    switch (newStatus) {
      case 'Approved':
        setPendingRequests(pendingRequests.filter((r) => r.id !== request.id));
        setApprovedRequests([...approvedRequests, request]);
        break;
      case 'Delivered':
        setApprovedRequests(
          approvedRequests.filter((r) => r.id !== request.id),
        );
        setDeliveredRequests([...deliveredRequests, request]);
        break;
      default:
        console.error('Invalid status update');
    }
  };

  const deleteRequest = async (requestId: string) => {
    const { error } = await deleteData(
      `birthdayRequest/deleterequest/${requestId}`,
    );

    if (error) {
      setError(error);
      return;
    }

    setPendingRequests(pendingRequests.filter((r) => r.id !== requestId));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack
        sx={{ padding: 2, width: '100%', maxWidth: '900px', margin: 'auto' }}
        spacing={2}
      >
        <ChapterDashboardHeader chapter={chapter} />
        <AcceptingRequestsToggle chapter={chapter} />
        <PendingRequestsTable
          pendingRequests={pendingRequests}
          approveRequest={(request) => updateRequestStatus(request, 'Approved')}
          rejectRequest={deleteRequest}
        />
        <ActiveRequestsTable
          activeRequests={approvedRequests}
          fulfillRequest={(request) =>
            updateRequestStatus(request, 'Delivered')
          }
        />
        <CompletedRequestsTable completedRequests={deliveredRequests} />
      </Stack>
    </ThemeProvider>
  );
}
export default ChapterDashboardPage;
