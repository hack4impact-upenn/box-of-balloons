import React, { useState } from 'react';
import { Typography, Grid, Switch, Button, Checkbox, Modal } from '@mui/material';
import ScreenGrid from '../components/ScreenGrid.tsx';
// You may need to create this BirthdayRequestTable component based on UserTable
import BirthdayRequestTable from './BirthdayRequestTable.tsx'; 
import { useEffect } from 'react';

// Temporary hardcoded data (replace with schema and real API later)
const birthdayRequests = [
  { id: 1, childName: "Danny", birthday: "10/21/2024", agency: "Agency 1", delivered: false },
  { id: 2, childName: "Alice", birthday: "12/25/2024", agency: "Agency 2", delivered: false },
  { id: 3, childName: "Anna", birthday: "01/13/2025", agency: "Agency 3", delivered: false },
  { id: 4, childName: "Ethan", birthday: "02/28/2025", agency: "Agency 4", delivered: false },
  { id: 5, childName: "Steven", birthday: "08/28/2024", agency: "Agency 4", delivered: true },
];

function ChapterDashboardPage() {
  const [requests, setRequests] = useState(birthdayRequests);
  const [chapterStatus, setChapterStatus] = useState(true); // Whether chapter is accepting requests
  const [selectedRequest, setSelectedRequest] = useState(null); // For modal

  // Toggle chapter status (receiving requests)
  const handleChapterStatusToggle = () => {
    setChapterStatus(!chapterStatus);
    // Make API call to update the chapter's document in the db
  };

  // Toggle delivery status
  const handleDeliveryToggle = (id) => {
    setRequests(requests.map(req =>
      req.id === id ? { ...req, delivered: !req.delivered } : req
    ));
    // Make API call to update the delivery status in the db
  };

  // Open modal for request details
  const handleRequestClick = (request) => {
    setSelectedRequest(request);
  };

  // Close the modal
  const handleCloseModal = () => {
    setSelectedRequest(null);
  };

  return (
    <ScreenGrid>
      {/* Chapter Welcome Message */}
      <Grid item>
        <Typography variant="h2">Welcome California!</Typography>
      </Grid>

      {/* Toggle for Chapter Status */}
      <Grid item container width="60vw" justifyContent="flex-end">
        <Typography>Accepting Requests: </Typography>
        <Switch
          checked={chapterStatus}
          onChange={handleChapterStatusToggle}
          color="primary"
        />
      </Grid>

      {/* Birthday Request Table */}
      <Grid item>
        <div style={{ height: '60vh', width: '60vw' }}>
          <BirthdayRequestTable
            requests={requests}
            onRequestClick={handleRequestClick}
            onDeliveryToggle={handleDeliveryToggle}
          />
        </div>
      </Grid>

      {/* Request Details Modal */}
      {selectedRequest && (
        <Modal
          open={!!selectedRequest}
          onClose={handleCloseModal}
        >
          <div style={{ padding: '20px', backgroundColor: '#fff', margin: '20px auto', width: '50%' }}>
            <Typography variant="h4">Request Details</Typography>
            <Typography>Child Name: {selectedRequest.childName}</Typography>
            <Typography>Birthday: {selectedRequest.birthday}</Typography>
            <Typography>Agency: {selectedRequest.agency}</Typography>
            {/* Add more request information based on the Task 3 Birthday Box Request Form */}
            <Button onClick={handleCloseModal}>Close</Button>
          </div>
        </Modal>
      )}
    </ScreenGrid>
  );
}

export default ChapterDashboardPage;
