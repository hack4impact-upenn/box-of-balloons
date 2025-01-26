import React from 'react';
import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import IBirthdayRequest from '../util/types/birthdayRequest';
import { formatDate } from '../util/date';
import { camelCaseToTitleCase } from '../util/string';

const keysToIgnore = ['_id', 'id', 'chapterId', '__v'];
const datesToFormat = ['deadlineDate', 'childBirthday', 'requestedDate'];

interface IRequestDetailDialogProps {
  request: IBirthdayRequest | null;
  open: boolean;
  onClose: () => void;
}

function RequestDetailDialog({
  request,
  open,
  onClose,
}: IRequestDetailDialogProps) {
  const rawEntries = request ? Object.entries(request) : [];

  const entries = rawEntries.filter(
    ([key, value]) => !keysToIgnore.includes(key) && value,
  );

  return (
    <Dialog onClose={onClose} open={open}>
      <List sx={{ pt: 0 }}>
        {entries.map(([key, value]) => (
          <ListItem key={key}>
            <ListItemText
              primary={camelCaseToTitleCase(key)}
              secondary={
                datesToFormat.includes(key)
                  ? formatDate(value)
                  : value?.toString()
              }
            />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default RequestDetailDialog;
