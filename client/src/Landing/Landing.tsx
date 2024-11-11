import React, { useEffect, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import USAMap from 'react-usa-map';
import { Modal, Box, Grid, Typography } from '@mui/material';

type StateAbbreviation =
  | 'AL'
  | 'AK'
  | 'AZ'
  | 'AR'
  | 'CA'
  | 'CO'
  | 'CT'
  | 'DE'
  | 'FL'
  | 'GA'
  | 'HI'
  | 'ID'
  | 'IL'
  | 'IN'
  | 'IA'
  | 'KS'
  | 'KY'
  | 'LA'
  | 'ME'
  | 'MD'
  | 'MA'
  | 'MI'
  | 'MN'
  | 'MS'
  | 'MO'
  | 'MT'
  | 'NE'
  | 'NV'
  | 'NH'
  | 'NJ'
  | 'NM'
  | 'NY'
  | 'NC'
  | 'ND'
  | 'OH'
  | 'OK'
  | 'OR'
  | 'PA'
  | 'RI'
  | 'SC'
  | 'SD'
  | 'TN'
  | 'TX'
  | 'UT'
  | 'VT'
  | 'VA'
  | 'WA'
  | 'WV'
  | 'WI'
  | 'WY';

type StateConfig = {
  fill: string;
};

const STATES: Record<StateAbbreviation, StateConfig> = {
  AL: { fill: '#4EC2BA' },
  AK: { fill: '#FEEA53' },
  AZ: { fill: '#D4D2D1' },
  AR: { fill: '#F48F87' },
  CA: { fill: '#4EC2BA' },
  CO: { fill: '#FEEA53' },
  CT: { fill: '#D4D2D1' },
  DE: { fill: '#F48F87' },
  FL: { fill: '#4EC2BA' },
  GA: { fill: '#FEEA53' },
  HI: { fill: '#D4D2D1' },
  ID: { fill: '#F48F87' },
  IL: { fill: '#4EC2BA' },
  IN: { fill: '#FEEA53' },
  IA: { fill: '#D4D2D1' },
  KS: { fill: '#F48F87' },
  KY: { fill: '#4EC2BA' },
  LA: { fill: '#FEEA53' },
  ME: { fill: '#D4D2D1' },
  MD: { fill: '#F48F87' },
  MA: { fill: '#4EC2BA' },
  MI: { fill: '#FEEA53' },
  MN: { fill: '#D4D2D1' },
  MS: { fill: '#F48F87' },
  MO: { fill: '#4EC2BA' },
  MT: { fill: '#FEEA53' },
  NE: { fill: '#D4D2D1' },
  NV: { fill: '#F48F87' },
  NH: { fill: '#4EC2BA' },
  NJ: { fill: '#FEEA53' },
  NM: { fill: '#D4D2D1' },
  NY: { fill: '#F48F87' },
  NC: { fill: '#4EC2BA' },
  ND: { fill: '#FEEA53' },
  OH: { fill: '#D4D2D1' },
  OK: { fill: '#F48F87' },
  OR: { fill: '#4EC2BA' },
  PA: { fill: '#FEEA53' },
  RI: { fill: '#D4D2D1' },
  SC: { fill: '#F48F87' },
  SD: { fill: '#4EC2BA' },
  TN: { fill: '#FEEA53' },
  TX: { fill: '#D4D2D1' },
  UT: { fill: '#F48F87' },
  VT: { fill: '#4EC2BA' },
  VA: { fill: '#FEEA53' },
  WA: { fill: '#D4D2D1' },
  WV: { fill: '#F48F87' },
  WI: { fill: '#4EC2BA' },
  WY: { fill: '#FEEA53' },
};

function getStateKeys<T>(
  obj: Record<StateAbbreviation, T>,
): StateAbbreviation[] {
  return Object.keys(obj) as StateAbbreviation[];
}

export default function Landing() {
  const [showModal, setShowModal] = useState(false);
  const [stateData, setStateData] = useState(null);
  const [chosenState, setChosenState] = useState(null);

  const filteredStateData =
    stateData && chosenState
      ? stateData.filter((chapter) => chapter.location === chosenState)
      : [];

  console.log(filteredStateData);
  useEffect(() => {
    async function fetchChapters() {
      try {
        const res = await fetch('http://localhost:4000/api/chapters');
        const data = await res.json();
        setStateData(data);
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
        fill: STATES[state].fill,
        clickHandler: async () => {
          setChosenState(state);
          setShowModal(true);
        },
      };
    });

    return statesConfig;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Chapter Login Button */}
      <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
        <button
          style={{
            backgroundColor: '#ec4899',
            color: 'white',
            paddingLeft: '1.5rem',
            paddingRight: '1.5rem',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: '500',
          }}
        >
          CHAPTER LOGIN
        </button>
      </div>

      {/* Logo and Welcome Section */}
      <div style={{ paddingLeft: '40px' }}>
        <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}
          >
            <span style={{ color: '#2dd4bf', fontWeight: '500' }}>Box</span>
            <span style={{ color: '#9ca3af' }}>of</span>
            <span style={{ color: '#f472b6', fontWeight: '500' }}>
              Balloons
            </span>
          </div>
          <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '0.75rem',
            }}
          >
            Welcome!
          </h1>
          <p
            style={{
              color: '#14b8a6',
              fontWeight: '500',
              marginBottom: '1rem',
            }}
          >
            Click on your state below to connect with a local chapter in your
            area!
          </p>
          <p style={{ color: '#4b5563', marginBottom: '0.5rem' }}>
            Email your Chapter Leader directly to:
          </p>
          <ul
            style={{
              color: '#4b5563',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
            }}
          >
            <li>Request a birthday box for a family in need</li>
            <li>Sign up as a volunteer</li>
            <li>Donate to your local chapter</li>
            <li>Sign up for our Build-A-Box program</li>
            <li>
              Connect with your local chapter leader to learn more ways you can
              support our cause
            </li>
          </ul>
        </div>
      </div>

      {/* Map Section */}
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
            onClose={() => setShowModal(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography>{chosenState}</Typography>
              {filteredStateData.length !== 0 ? (
                <ul>
                  {filteredStateData.map((chapter) => (
                    <ul>{chapter.city}</ul>
                  ))}
                </ul>
              ) : (
                <Typography>No chapters for {chosenState}</Typography>
              )}
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}
