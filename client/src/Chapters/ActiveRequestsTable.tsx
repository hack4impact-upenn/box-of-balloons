import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatDate } from '../util/date.ts';
import IBirthdayRequest from '../util/types/birthdayRequest.ts';
import RequestDetailDialog from './RequestDetailDialog.tsx';

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

  const [filterMonthOptions, setFilterMonthOptions] = useState<number[][]>([]);
  const [filterMonth, setFilterMonth] = useState<number[] | null | undefined>(
    undefined,
  );

  const viewRequest = (request: IBirthdayRequest) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  useEffect(() => {
    const months = activeRequests
      .map((request) => {
        const date = new Date(request.childBirthday);
        return [date.getMonth() + 1, date.getFullYear()];
      })
      .filter(
        (value, index, self) =>
          index ===
          self.findIndex((t) => JSON.stringify(t) === JSON.stringify(value)),
      );

    console.log(months);

    setFilterMonthOptions(months);
  }, [activeRequests]);

  const filteredRequests = activeRequests.filter((request) => {
    if (!filterMonth) {
      return true;
    }

    const date = new Date(request.childBirthday);
    return (
      date.getMonth() + 1 === filterMonth[0] &&
      date.getFullYear() === filterMonth[1]
    );
  });

  return (
    <>
      <Box>
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Active Requests
        </Typography>
        <FormControl sx={{ m: 1, minWidth: 150, color: 'black' }}>
          <InputLabel>Filter by month</InputLabel>
          <Select
            label="Filter by month"
            value={
              // eslint-disable-next-line no-nested-ternary
              filterMonth === undefined
                ? undefined
                : filterMonth
                ? `${filterMonth[0]}/${filterMonth[1]}`
                : 'None'
            }
            onChange={(event) => {
              if (event.target.value === 'None') {
                setFilterMonth(null);
                return;
              }

              const value = (event.target.value as string).split('/');
              setFilterMonth([parseInt(value[0], 10), parseInt(value[1], 10)]);
            }}
          >
            <MenuItem value="None">
              <em>None</em>
            </MenuItem>
            {filterMonthOptions.map((month) => (
              <MenuItem
                value={`${month[0]}/${month[1]}`}
                key={`${month[0]}/${month[1]}`}
              >
                {month[0]}/{month[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
            {filteredRequests.map((request) => (
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
