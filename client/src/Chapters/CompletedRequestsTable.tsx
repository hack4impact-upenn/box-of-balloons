import {
  Box,
  Button,
  FormControlLabel,
  Switch,
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

interface ICompletedRequestsTableProps {
  completedRequests: IBirthdayRequest[];
}

function CompletedRequestsTable({
  completedRequests,
}: ICompletedRequestsTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<IBirthdayRequest>(
    {} as IBirthdayRequest,
  );

  const [displayTable, setDisplayTable] = useState(false);

  const viewRequest = (request: IBirthdayRequest) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Completed Requests
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={displayTable}
              onChange={() => setDisplayTable(!displayTable)}
              color="primary"
            />
          }
          label={
            displayTable
              ? 'Showing completed requests'
              : 'Hiding completed requests'
          }
        />
        {displayTable && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Child Name</TableCell>
                <TableCell>Child Birthday</TableCell>
                <TableCell>Agency Name</TableCell>
                <TableCell>{}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {completedRequests.map((request) => (
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
      <RequestDetailDialog
        request={selectedRequest}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default CompletedRequestsTable;
