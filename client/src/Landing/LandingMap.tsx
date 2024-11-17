import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import USAMap from 'react-usa-map';
import { Modal, Box, Grid, Typography, Button } from '@mui/material';
import { Chapter, StateAbbreviation } from '../util/types/map';
import {
  CHAPTER_DATA,
  StateAbbreviationToState,
  STATES,
} from '../util/constants/map';

export default function LandingMap() {
  const [stateData, setStateData] = useState<Chapter[] | null>(null);
  const [chosenState, setChosenState] = useState<StateAbbreviation | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [chosenChapter, setChosenChapter] = useState<number | null>(null);
  const [availableStates, setAvailableStates] = useState<
    Set<StateAbbreviation>
  >(new Set());

  function getStateKeys<T>(
    obj: Record<StateAbbreviation, T>,
  ): StateAbbreviation[] {
    return Object.keys(obj) as StateAbbreviation[];
  }

  const filteredStateData =
    stateData && chosenState
      ? stateData.filter((chapter) => chapter.state === chosenState)
      : [];

  useEffect(() => {
    async function fetchChapters() {
      try {
        const res = await fetch('http://localhost:4000/api/chapters');
        const data = await res.json();
        setStateData(CHAPTER_DATA); // replace with fetched data
        setAvailableStates(
          new Set(CHAPTER_DATA.map((chapter) => chapter.state)),
        );
      } catch (error) {
        console.log('error');
      }
    }
    fetchChapters();
  }, []);

  const statesCustomConfig = () => {
    const statesConfig: Record<string, any> = {};

    getStateKeys(STATES).forEach((state) => {
      statesConfig[state] = {
        fill: availableStates.has(state) ? '#4EC2BA' : '#D3D3D3',
        clickHandler: availableStates.has(state)
          ? async () => {
              setChosenState(state);
              setShowModal(true);
            }
          : undefined,
      };
    });

    return statesConfig;
  };

  function displayForm(chapterId: number) {
    setChosenChapter(chapterId);
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <Grid item xs={3}>
        <USAMap customize={statesCustomConfig()} />
        <Modal
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setChosenChapter(null);
            setChosenState(null);
          }}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 500,
              maxHeight: '80vh',
              bgcolor: 'background.paper',
              borderRadius: '20px',
              boxShadow: 24,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingY: '30px',
            }}
          >
            <Box sx={{ width: 200, mx: 'auto' }}>
              <Typography
                variant="h5"
                component="h2"
                sx={{ textAlign: 'center' }}
              >
                {filteredStateData
                  ? `${StateAbbreviationToState[chosenState!]}`
                  : `No Chapters in ${chosenState}`}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {filteredStateData && filteredStateData.length > 0 ? (
                  <>
                    {' '}
                    <Typography sx={{ color: '#0EA497', textAlign: 'center' }}>
                      Local Chapters
                    </Typography>
                    <ul style={{ width: '100%', padding: 0 }}>
                      {filteredStateData.map((chapter) => (
                        <Box
                          key={chapter.id}
                          sx={{
                            width: '100%',
                            mb: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            position: 'relative',
                          }}
                        >
                          <Button
                            variant="contained"
                            sx={{
                              backgroundColor: '#F2F2F2',
                              color: 'black',
                              width: '100%',
                              borderRadius: '20px',
                            }}
                            onClick={() => displayForm(chapter.id)}
                          >
                            {chapter.city}
                          </Button>
                          {chosenChapter && chosenChapter === chapter.id && (
                            <Box
                              sx={{
                                position: 'absolute',
                                left: '100%',
                                top: 0,
                                whiteSpace: 'nowrap',
                                marginLeft: '5px',
                              }}
                            >
                              {chapter.isAcceptingRequests ? (
                                <Button
                                  variant="contained"
                                  sx={{
                                    backgroundColor: '#FF3F7F',
                                    width: '100px',
                                    borderRadius: '20px',
                                  }}
                                  onClick={() =>
                                    console.log(
                                      `redirecting to ${chapter.city}'s form`,
                                    )
                                  }
                                >
                                  VIEW FORM
                                </Button>
                              ) : (
                                <Typography
                                  sx={{
                                    textAlign: 'center',
                                    fontSize: '9px',
                                    width: '120px',
                                    wordWrap: 'break-word',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'normal',
                                  }}
                                >
                                  Sorry, we are not accepting requests. Please
                                  try again next month!
                                </Typography>
                              )}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Typography textAlign="center">
                    Currently no active chapters in this state. Check back soon!
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Modal>
      </Grid>
    </Grid>
  );
}
