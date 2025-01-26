import { Box, CircularProgress, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { deleteData, putData, useData } from '../util/api.ts';
import IBirthdayRequest from '../util/types/birthdayRequest.ts';
import IUser from '../util/types/user.ts';
import AcceptingRequestsToggle from './AcceptingRequestsToggle.tsx';
import ActiveRequestsTable from './ActiveRequestsTable.tsx';
import ChapterDashboardHeader from './ChapterDashboardHeader.tsx';
import CompletedRequestsTable from './CompletedRequestsTable.tsx';
import PendingRequestsTable from './PendingRequestsTable.tsx';

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
  const { chapterId: userId } = useParams();

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error handling

  const chapterResponse = useData(`user/query/${userId}`);
  const { data: rawChapter, error: chapterError } = chapterResponse ?? {};
  const user = {
    ...rawChapter,
    id: userId,
  } as IUser;

  const birthdayRequestsResponse = useData(`birthdayRequest/all/${userId}`);
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
    const { error: updateStatusError } = await putData(
      `birthdayRequest/updatestatus/${request.id}`,
      {
        updatedValue: newStatus,
      },
    );

    if (updateStatusError) {
      setError(updateStatusError);
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
    const { error: deleteError } = await deleteData(
      `birthdayRequest/deleterequest/${requestId}`,
    );

    if (deleteError) {
      setError(deleteError);
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
        <ChapterDashboardHeader chapter={user} />
        <AcceptingRequestsToggle chapter={user} />
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
