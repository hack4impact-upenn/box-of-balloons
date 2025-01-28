import { Box, Typography } from '@mui/material';
import React from 'react';
import Logo from './Logo.tsx';
import IUser from '../util/types/user.ts';

interface IChapterDashboardHeaderProps {
  chapter: IUser;
}

function ChapterDashboardHeader({ chapter }: IChapterDashboardHeaderProps) {
  return (
    <Box sx={{ textAlign: 'left' }}>
      <Logo />
      <Typography variant="h4" fontWeight="bold" mb={1}>
        Welcome {chapter.city}, {chapter.state}!
      </Typography>
    </Box>
  );
}

export default ChapterDashboardHeader;
