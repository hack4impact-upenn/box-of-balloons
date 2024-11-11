import React, { useState } from 'react';
import { 
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  List,
  ListItem,
  Paper
} from '@mui/material';

const CloseIcon: React.FC = () => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2"
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

interface StateCategory {
  color: string;
  hoverColor: string;
  states: string[];
}

interface StateCategories {
  [key: string]: StateCategory;
}

interface Chapter {
  city: string;
  id: string;
}

interface StateData {
  name: string;
  acceptingRequests: boolean;
  chapters: Chapter[];
}

interface StateChapters {
  [key: string]: StateData;
}

const stateCategories: StateCategories = {
  turquoise: {
    color: '#7ACCC8',
    hoverColor: '#5FB9B5',
    states: ['CA', 'ID', 'CO', 'ND', 'IA', 'MI', 'PA', 'GA', 'TX']
  },
  yellow: {
    color: '#FFE17B',
    hoverColor: '#EBD068',
    states: ['AZ', 'NE', 'WI', 'LA', 'NJ', 'HI']
  },
  salmon: {
    color: '#F7BDB1',
    hoverColor: '#E4AAA0',
    states: ['WA', 'NV', 'WY', 'MN', 'IL', 'KY', 'AL']
  },
  inactive: {
    color: '#D3D3D3',
    hoverColor: '#C0C0C0',
    states: ['OR', 'MT', 'UT', 'SD', 'KS', 'MO', 'TN', 'NC', 'SC', 'VA', 'WV', 'OH', 'IN', 'MS', 'AR', 'OK', 'NM', 'ME', 'NH', 'VT', 'MA', 'RI', 'CT', 'NY', 'DE', 'MD', 'FL', 'AK']
  }
};

const stateChapters: StateChapters = {
  WI: {
    name: 'Wisconsin',
    acceptingRequests: true,
    chapters: [
      { city: 'Columbia County', id: 'wi-1' },
      { city: 'DeForest', id: 'wi-2' },
      { city: 'Madison', id: 'wi-3' },
      { city: 'Sun Prairie', id: 'wi-4' },
      { city: 'Poynette', id: 'wi-5' }
    ]
  },
};

const LandingPage: React.FC = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<Chapter | null>(null);

  const mapHandler = (event: any) => {
    const stateData = stateChapters[event.target.dataset.name];
    if (stateData) {
      setSelectedState(stateData);
    }
  };

  const statesCustomConfig = () => {
    const config: { [key: string]: { fill: string } } = {};
    
    Object.entries(stateCategories).forEach(([category, data]) => {
      data.states.forEach(state => {
        config[state] = {
          fill: data.color
        };
      });
    });
    
    return config;
  };

  const handleRequestClick = (chapter: Chapter): void => {
    console.log('Navigate to request form for:', chapter);
  };

  const handleClose = (): void => {
    setSelectedState(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.paper', p: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Welcome!
        </Typography>
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#EC4899',
            '&:hover': {
              bgcolor: '#DB2777'
            }
          }}
          onClick={() => console.log('Navigate to login')}
        >
          Chapter Login
        </Button>
      </Box>

      {/* Instructions */}
      <Box sx={{ mb: 4, color: 'text.secondary' }}>
        <Typography>Click on your state below to connect with a local chapter in your area!</Typography>
        <List sx={{ ml: 2 }}>
          <ListItem sx={{ display: 'list-item' }}>Find your local birthday hero directly in your area</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Sign up to be a volunteer</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Donate to your local chapter</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Sign up for our Milestone program</ListItem>
          <ListItem sx={{ display: 'list-item' }}>Contact your local chapter leader to learn more ways you can support our cause</ListItem>
        </List>
      </Box>

      {/* US Map */}
      <Box sx={{ width: '100%', maxWidth: '4xl', mx: 'auto' }}>
       
      </Box>

      {/* State Chapters Modal */}
      <Dialog 
        open={selectedState !== null} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedState && (
          <>
            <DialogTitle sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              {selectedState.name}
              <IconButton
                size="small"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Local Chapters
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {selectedState.chapters.map((chapter) => (
                  <Paper
                    key={chapter.id}
                    elevation={1}
                    sx={{
                      p: 2,
                      position: 'relative',
                      '&:hover': { bgcolor: 'action.hover' },
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredChapter(chapter)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  >
                    <Typography>{chapter.city}</Typography>
                    {hoveredChapter === chapter && (
                      <Box sx={{
                        position: 'absolute',
                        right: 16,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}>
                        {selectedState.acceptingRequests ? (
                          <Button
                            size="small"
                            variant="contained"
                            sx={{ 
                              bgcolor: '#EC4899',
                              '&:hover': {
                                bgcolor: '#DB2777'
                              }
                            }}
                            onClick={() => handleRequestClick(chapter)}
                          >
                            Request Form
                          </Button>
                        ) : (
                          <Typography color="error" variant="body2">
                            Sorry, we are not receiving requests. Please try again next month!
                          </Typography>
                        )}
                      </Box>
                    )}
                  </Paper>
                ))}
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default LandingPage;