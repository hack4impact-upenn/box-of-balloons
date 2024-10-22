import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Checkbox } from '@mui/material';

function BirthdayRequestTable({ requests, onRequestClick, onDeliveryToggle }) {
  return (
    <Table>
      <TableHead>
        <TableRow sx={{ '& > *': { padding: '2px 4px' } }}>
          <TableCell>Child Name</TableCell>
          <TableCell>Birthday</TableCell>
          <TableCell>Agency</TableCell>
          <TableCell>Delivered</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {requests.map((request) => (
          <TableRow key={request.id} sx={{ '& > *': { padding: '2px 4px' } }}>
            <TableCell>{request.childName}</TableCell>
            <TableCell>{request.birthday}</TableCell>
            <TableCell>{request.agency}</TableCell>
            <TableCell>
              <Checkbox
                checked={request.delivered}
                onChange={() => onDeliveryToggle(request.id)}
                color="primary"
              />
            </TableCell>
            <TableCell>
              <Button variant="outlined" onClick={() => onRequestClick(request)}>View</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default BirthdayRequestTable;
