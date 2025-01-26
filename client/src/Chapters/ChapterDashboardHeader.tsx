import { Box, Typography } from '@mui/material';
import React from 'react';
import Logo from './Logo';
import IChapter from '../util/types/chapter';

interface IChapterDashboardHeaderProps {
  chapter: IChapter;
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
