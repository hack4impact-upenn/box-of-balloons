import {
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import IBirthdayRequest from '../util/types/birthdayRequest';
import { formatDate } from '../util/date';
import RequestDetailDialog from './RequestDetailDialog';

interface IActiveRequestsTableProps {
  activeRequests: IBirthdayRequest[];
  fulfillRequest: (request: IBirthdayRequest) => void;
}

function ActiveRequestsTable({
  activeRequests,
  fulfillRequest,
}: IActiveRequestsTableProps) {
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
          Active Requests
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Child Name</TableCell>
              <TableCell>Child Birthday</TableCell>
              <TableCell>Agency Name</TableCell>
              <TableCell>Mark Completed</TableCell>
              <TableCell>{}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.childName}</TableCell>
                <TableCell>{formatDate(request.childBirthday)}</TableCell>
                <TableCell>{request.agencyOrganization}</TableCell>
                <TableCell>
                  <Checkbox onClick={() => fulfillRequest(request)} />
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={() => viewRequest(request)}
                  >
                    View
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

export default ActiveRequestsTable;
