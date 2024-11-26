import React, { useState } from 'react';
import USAMap from 'react-usa-map';


interface ChapterInfo {
  city: string;
  email: string;
  accepting: boolean;
}

interface StateConfig {
  fill: string;
  clickHandler?: (event: MouseEvent) => void;
}

interface CustomizeConfig {
  [key: string]: {
    fill: string;
    clickHandler: () => void;
  };
}



// Updated chapter data based on the provided spreadsheet
const UPDATED_CHAPTER_DATA: Record<string, ChapterInfo[]> = {
  IL: [{
    city: 'Aurora',
    email: 'boxofballoons.aurora@gmail.com',
    accepting: true
  }],
  ID: [{
    city: 'Boise',
    email: 'boxofballoonsboise@gmail.com',
    accepting: true
  }],
  MD: [{
    city: 'Boonsboro',
    email: 'boxofballoonsmd@gmail.com',
    accepting: true
  }],
  OK: [{
    city: 'Oklahoma City',
    email: 'boxofballoons.oklahomacityok@gmail.com',
    accepting: true
  }],
  GA: [{
    city: 'Cumming',
    email: 'boxofballoons.cummingga@gmail.com',
    accepting: true
  }],
  WI: [
    {
      city: 'De Forest',
      email: 'boxofballoons.deforestwi@gmail.com',
      accepting: true
    },
    {
      city: 'Madison',
      email: 'boxofballoons.madisonwi@gmail.com',
      accepting: true
    },
    {
      city: 'Monroe',
      email: 'boxofballoons.monroe@gmail.com',
      accepting: true
    },
    {
      city: 'Janesville',
      email: 'boxofballoons.janesvillewi@gmail.com',
      accepting: true
    },
    {
      city: 'Sun Prairie',
      email: 'boxofballoonssp@gmail.com',
      accepting: true
    },
    {
      city: 'Columbia County',
      email: 'boxofballoons.portagewi@gmail.com',
      accepting: true
    }
  ],
  CO: [{
    city: 'Denver',
    email: 'boxofballoons.denvermetro@gmail.com',
    accepting: true
  }],
  ND: [{
    city: 'Fargo',
    email: 'boxofballons.fargond@gmail.com',
    accepting: true
  }],
  MI: [{
    city: 'Grand Rapids',
    email: 'Boxofballoons.grandrapidsmi@gmail.com',
    accepting: true
  }],
  IA: [{
    city: 'Iowa City and Cedar Rapids',
    email: 'boxofballoons.iowacityia@gmail.com',
    accepting: true
  }],
  KY: [{
    city: 'Lexington',
    email: 'boxofballoons.lexingtonky@gmail.com',
    accepting: true
  }],
  AL: [{
    city: 'Mobile',
    email: 'boxofballoons.mobileal@gmail.com',
    accepting: true
  }],
  LA: [{
    city: 'New Orleans',
    email: 'boxofballoons.greaterneworleans@gmail.com',
    accepting: true
  }],
  AR: [{
    city: 'Northwest Bentonville',
    email: 'boxofballoons.northwestar@gmail.com',
    accepting: true
  }],
  PA: [{
    city: 'Philadelphia',
    email: 'boxofballoons.philadelphiapa@gmail.com',
    accepting: true
  }],
  AZ: [{
    city: 'Phoenix',
    email: 'boxofballoons.phoenixaz@gmail.com',
    accepting: true
  }],
  NY: [{
    city: 'Syracuse',
    email: 'boxofballoons.syracuseny@gmail.com',
    accepting: true
  }],
  NV: [{
    city: 'Reno',
    email: 'boxofballoons.renonv@gmail.com',
    accepting: true
  }]
};

const STATES_CONFIG: Record<string, { fill: string }> = {
  AL: { fill: UPDATED_CHAPTER_DATA['AL'] ? '#14b8a6' : '#D4D2D1' },
  AK: { fill: '#D4D2D1' },
  AZ: { fill: UPDATED_CHAPTER_DATA['AZ'] ? '#fde047' : '#D4D2D1' },
  AR: { fill: UPDATED_CHAPTER_DATA['AR'] ? '#f87171' : '#D4D2D1' },
  CA: { fill: '#D4D2D1' },
  CO: { fill: UPDATED_CHAPTER_DATA['CO'] ? '#fde047' : '#D4D2D1' },
  CT: { fill: '#D4D2D1' },
  DE: { fill: '#D4D2D1' },
  FL: { fill: '#D4D2D1' },
  GA: { fill: UPDATED_CHAPTER_DATA['GA'] ? '#14b8a6' : '#D4D2D1' },
  HI: { fill: '#D4D2D1' },
  ID: { fill: UPDATED_CHAPTER_DATA['ID'] ? '#14b8a6' : '#D4D2D1' },
  IL: { fill: UPDATED_CHAPTER_DATA['IL'] ? '#f87171' : '#D4D2D1' },
  IN: { fill: '#D4D2D1' },
  IA: { fill: UPDATED_CHAPTER_DATA['IA'] ? '#14b8a6' : '#D4D2D1' },
  KS: { fill: '#D4D2D1' },
  KY: { fill: UPDATED_CHAPTER_DATA['KY'] ? '#f87171' : '#D4D2D1' },
  LA: { fill: UPDATED_CHAPTER_DATA['LA'] ? '#fde047' : '#D4D2D1' },
  ME: { fill: '#D4D2D1' },
  MD: { fill: UPDATED_CHAPTER_DATA['MD'] ? '#f87171' : '#D4D2D1' },
  MA: { fill: '#D4D2D1' },
  MI: { fill: UPDATED_CHAPTER_DATA['MI'] ? '#14b8a6' : '#D4D2D1' },
  MN: { fill: '#D4D2D1' },
  MS: { fill: '#D4D2D1' },
  MO: { fill: '#D4D2D1' },
  MT: { fill: '#D4D2D1' },
  NE: { fill: '#D4D2D1' },
  NV: { fill: UPDATED_CHAPTER_DATA['NV'] ? '#14b8a6' : '#D4D2D1' },
  NH: { fill: '#D4D2D1' },
  NJ: { fill: '#D4D2D1' },
  NM: { fill: '#D4D2D1' },
  NY: { fill: UPDATED_CHAPTER_DATA['NY'] ? '#14b8a6' : '#D4D2D1' },
  NC: { fill: '#D4D2D1' },
  ND: { fill: UPDATED_CHAPTER_DATA['ND'] ? '#14b8a6' : '#D4D2D1' },
  OH: { fill: '#D4D2D1' },
  OK: { fill: UPDATED_CHAPTER_DATA['OK'] ? '#f87171' : '#D4D2D1' },
  OR: { fill: '#D4D2D1' },
  PA: { fill: UPDATED_CHAPTER_DATA['PA'] ? '#14b8a6' : '#D4D2D1' },
  RI: { fill: '#D4D2D1' },
  SC: { fill: '#D4D2D1' },
  SD: { fill: '#D4D2D1' },
  TN: { fill: '#D4D2D1' },
  TX: { fill: '#D4D2D1' },
  UT: { fill: '#D4D2D1' },
  VT: { fill: '#D4D2D1' },
  VA: { fill: '#D4D2D1' },
  WA: { fill: '#D4D2D1' },
  WV: { fill: '#D4D2D1' },
  WI: { fill: UPDATED_CHAPTER_DATA['WI'] ? '#fde047' : '#D4D2D1' },
  WY: { fill: '#D4D2D1' }
};

export default function Landing() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [chosenState, setChosenState] = useState<string | null>(null);
  const [hoveredChapter, setHoveredChapter] = useState<string | null>(null);

  const statesCustomConfig = (): CustomizeConfig => {
    const statesConfig: CustomizeConfig = {};
    
    Object.keys(STATES_CONFIG).forEach(state => {
      statesConfig[state] = {
        fill: STATES_CONFIG[state].fill,
        clickHandler: () => {
          setChosenState(state);
          setShowModal(true);
        }
      };
    });
    
    return statesConfig;
  };

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      padding: '2rem 3rem'
    }}>
      {/* Chapter Login Button */}
      <div style={{
        position: 'absolute',
        top: '1.5rem',
        right: '2rem'
      }}>
        <button style={{
          backgroundColor: '#ec4899',
          color: 'white',
          padding: '0.5rem 1.5rem',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: '500',
          border: 'none',
          cursor: 'pointer',
          textTransform: 'uppercase'
        }}>
          Chapter Login
        </button>
      </div>

      {/* Logo and Welcome Section */}
      <div style={{ marginBottom: '3rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '2rem'
        }}>
          <span style={{ color: '#14b8a6', fontWeight: '500', fontSize: '1.5rem' }}>Box</span>
          <span style={{ color: '#9ca3af', fontSize: '1.5rem' }}>of</span>
          <span style={{ color: '#ec4899', fontWeight: '500', fontSize: '1.5rem' }}>Balloons</span>
        </div>
        
        <h1
            style={{
              fontSize: '1.875rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '0.75rem'
            }}
          >
            Welcome!
          </h1>
          <p
            style={{
              color: '#14b8a6',
              fontWeight: '500',
              marginBottom: '1rem'
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
              gap: '0.25rem'
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

      {/* Map Container */}
      <div style={{
      width: '75%', // Reduced width to match image
      maxWidth: '1000px',
      margin: '2rem auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <USAMap 
        customize={statesCustomConfig()}
        width="100%"
        height="100%"
        defaultFill="#D4D2D1"
      />
    </div>

      {/* State Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            maxWidth: '42rem',
            width: '100%',
            maxHeight: '80vh',
            overflowY: 'auto',
            position: 'relative',
            padding: '1.5rem'
          }}>
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '1rem',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                fontSize: '1.25rem',
                color: '#6b7280'
              }}
            >
              ✕
            </button>
            
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem'
            }}>
              {chosenState && UPDATED_CHAPTER_DATA[chosenState] 
                ? `Box of Balloons Chapters in ${chosenState}` 
                : `No Chapters in ${chosenState}`}
            </h2>

            {chosenState && UPDATED_CHAPTER_DATA[chosenState] ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {UPDATED_CHAPTER_DATA[chosenState].map((chapter) => (
                  <div
                    key={chapter.city}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '1rem',
                      position: 'relative',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={() => setHoveredChapter(chapter.city)}
                    onMouseLeave={() => setHoveredChapter(null)}
                  >
                    <h3 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      color: '#0d9488'
                    }}>
                      {chapter.city}
                    </h3>
                    <p style={{
                      color: '#4b5563',
                      marginTop: '0.25rem'
                    }}>
                      {chapter.email}
                    </p>
                    
                    {hoveredChapter === chapter.city && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '0.5rem'
                      }}>
                        {chapter.accepting ? (
                          <button style={{
                            backgroundColor: '#ec4899',
                            color: 'white',
                            padding: '0.5rem 1.5rem',
                            borderRadius: '9999px',
                            border: 'none',
                            cursor: 'pointer'
                          }}>
                            View Request Form
                          </button>
                        ) : (
                          <p style={{
                            color: '#4b5563',
                            textAlign: 'center',
                            padding: '0 1rem'
                          }}>
                            Sorry, we are not receiving requests. Please try again next month!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{
                color: '#4b5563',
                textAlign: 'center',
                padding: '2rem 0'
              }}>
                Currently no active chapters in this state. Check back soon!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}