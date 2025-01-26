import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { formatDate } from '../util/date.ts';
import IBirthdayRequest from '../util/types/birthdayRequest.ts';
import RequestDetailDialog from './RequestDetailDialog.tsx';

interface IPendingRequestsTableProps {
  pendingRequests: IBirthdayRequest[];
  approveRequest: (request: IBirthdayRequest) => void;
  rejectRequest: (requestId: string) => void;
}

function PendingRequestsTable({
  pendingRequests,
  approveRequest,
  rejectRequest,
}: IPendingRequestsTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IBirthdayRequest>(
    {} as IBirthdayRequest,
  );

  const viewRequest = (request: IBirthdayRequest) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Pending Requests
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Child Name</TableCell>
              <TableCell>Child Birthday</TableCell>
              <TableCell>Agency Name</TableCell>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pendingRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.childName}</TableCell>
                <TableCell>{formatDate(request.childBirthday)}</TableCell>
                <TableCell>{request.agencyOrganization}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => viewRequest(request)}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => approveRequest(request)}
                  >
                    Approve
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => rejectRequest(request.id)}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <RequestDetailDialog
        request={selectedRequest}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default PendingRequestsTable;
