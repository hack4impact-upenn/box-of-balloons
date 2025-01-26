import { FormControlLabel, Switch, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import IChapter from '../util/types/chapter';
import { putData } from '../util/api';

interface IAcceptingRequestsToggleProps {
  chapter: IChapter;
}

function AcceptingRequestsToggle({ chapter }: IAcceptingRequestsToggleProps) {
  const [checked, setChecked] = React.useState(chapter.isAcceptingRequests);
  const [error, setError] = React.useState<string | null>(null);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    const response = await putData(`chapter/toggleRequests/${chapter.id}`, {});

    if (response.error) {
      setError(response.error);
    }
  };

  return (
    <Box>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} color="primary" />
        }
        label={
          checked
            ? 'Currently accepting requests'
            : 'Not curently accepting requests'
        }
      />
      {error && <Typography sx={{ color: 'red' }}>Error: {error}</Typography>}
    </Box>
  );
}

export default AcceptingRequestsToggle;
