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

interface ChapterInfo {
  city: string;
  leaders: string;
  email: string;
  bio: string;
}

const CHAPTER_DATA: Record<StateAbbreviation, ChapterInfo[]> = {
  ID: [
    {
      city: 'Boise',
      leaders: 'Erin Taylor',
      email: 'boxofballoonsboise@gmail.com',
      bio: 'Bio Coming Soon! This chapter is active!',
    },
  ],
  NV: [
    {
      city: 'Reno',
      leaders: 'Jolie Mortensen',
      email: 'boxofballoons.renonv@gmail.com',
      bio: 'Hi my name is Jolie Mortensen! I live in Reno, Nevada and am excited to be the Box of Balloon Chapter Leader for our area. I am married to my incredible husband, Soren. We have two adorable little girls and a fur baby. When I\'m not spending time with my family, I enjoy reading, seeing live music, traveling, and gathering with friends. I am so proud to be part of a team with such an important mission. I love to party plan and celebrate the people that I love. I believe everyone deserves to be celebrated! Here at Box of Balloons we want all children to know they are loved and special. Building BoB boxes brings our family so much joy and it\'s a wonderful way to give back to the community.',
    },
  ],
  AZ: [
    {
      city: 'Phoenix',
      leaders: 'Una Somerville & Kate Olsson',
      email: 'boxofballoons.phoenixaz@gmail.com',
      bio: 'The Phoenix Chapter is managed by mother and daughter volunteer team Una Somerville and Kate Olsson. With the support of a strong group of loyal volunteers, Kate and Una make sure about 50 boxes a month are delivered to deserving kiddos around the greater Phoenix area, including Tempe, Chandler, Mesa, Gilbert, Scottsdale and more. Making sure every child has a happy birthday is what it\'s all about!',
    },
  ],
  CO: [
    {
      city: 'Denver Metro',
      leaders: 'Lori Kearns',
      email: 'boxofballoons.denvermetro@gmail.com',
      bio: 'Hi! My name is Lori Kearns and I am a new chapter co-lead with Box of Balloons Denver. I started volunteering with Box of Balloons in the spring of 2021, both for me to be involved and also for my kids to give back, and was immediately so touched by what this organization, chapter leads and volunteers do for our communities. So when the opportunity came up in early 2022 to be a co-lead, I was instantly in.',
    },
  ],
  ND: [
    {
      city: 'Fargo',
      leaders: 'Chris Welsand & Chelsey',
      email: 'boxofballoons.fargond@gmail.com',
      bio: 'Hi! My name is Chris Welsand, and I serve as the Director/Co-Leader of Box of Balloons – Fargo. Since arriving in Fargo in 2012, I have been blessed to get involved with a variety of volunteer projects at my daughter\'s school, my church and in the community.',
    },
    {
      city: 'Minot',
      leaders: 'Sarah Fagerland',
      email: 'boxofballoons.minotnd@gmail.com',
      bio: 'Hello! My name is Sarah Fagerland and I live in Minot, ND with my 3 teenagers, Jacie, Ben and Fallon. I am a Licensed Insurance Producer and work for Horace Mann Insurance. When I discovered Box of Balloons, I immediately knew I wanted to bring it to our community.',
    },
  ],
  OK: [
    {
      city: 'Oklahoma City',
      leaders: 'Kristi Rhoades',
      email: 'boxofballoons.oklahomacityok@gmail.com',
      bio: 'Greetings OKC Box of Balloons Volunteers, My name is Kristi Rhoades. I am a lifelong resident of Oklahoma. My roots are planted here, and I am so excited to have this opportunity to give back to my community.',
    },
  ],
  IA: [
    {
      city: 'Iowa City',
      leaders: 'Heather Spangler',
      email: 'boxofballoons.iowacityia@gmail.com',
      bio: 'Hi, I\'m Heather Spangler and I\'ve led the Iowa City/Cedar Rapids chapter since 2019. I\'m a mother of two fun girls. I have always enjoyed helping people and a good party. Box of Balloons is a great combo of those things!',
    },
  ],
  AR: [
    {
      city: 'Northwest',
      leaders: 'Quincee',
      email: 'boxofballoons.northwestar@gmail.com',
      bio: 'My name is Quincee and I have the privilege of leading Box of Balloons NWA. I\'m an Arkansas native and love the NWA bubble! I grew up in Springdale, and I graduated from the University of Arkansas.',
    },
  ],
  WI: [
    {
      city: 'Columbia County',
      leaders: 'Kadie & Rachel Nachreiner',
      email: 'boxofballoons.portagewi@gmail.com',
      bio: 'Hello, my name is Kadie, and I am proud to call Portage home. I love being active in my community, and Box of Balloons is a perfect organization for making an impact.',
    },
    {
      city: 'DeForest',
      leaders: 'Kelsey Loughran',
      email: 'boxofballoons.deforestwi@gmail.com',
      bio: 'Hi my name is Kelsey Loughran! I grew up in De Forest, WI and am beyond thrilled to be the BOB Chapter Leader there. I currently am a third grade teacher in the area as well!',
    },
    {
      city: 'Madison',
      leaders: 'Cate Valenzuela, Karen Romadka, Jennifer Javornik, Eva, Autumn',
      email: 'boxofballoons.madisonWI@gmail.com',
      bio: 'Hi, I\'m Cate Valenzuela, one of the co-leaders of the Madison West chapter of Box of Balloons. I enjoy working as a technical writer, traveling, and doing craft projects with my daughter.',
    },
    {
      city: 'Sun Prairie',
      leaders: 'Kelly Davis',
      email: 'boxofballoonssp@gmail.com',
      bio: 'Hello, my name is Kelly! I live in Sun Prairie with my husband and two sons, Desmond and Tate. During the week, I am a marketing professional in the energy industry, supporting local not-for-profit utilities.',
    },
    {
      city: 'Janesville',
      leaders: 'Brittany Strickert & Jessica Hickerson',
      email: 'boxofballoons.janesvillewi@gmail.com',
      bio: 'Hello! I am Brittany, a co-leader for the Janesville Box of Balloons Chapter. I live in Janesville with my husband of 10 years and our 7 year old daughter. I work as a Data Analyst and enjoy baking, being outdoors, playing cards and games, and spending time with my family.',
    },
    {
      city: 'Monroe',
      leaders: 'Amanda Hirsch',
      email: 'boxofballoons.monroe@gmail.com',
      bio: 'Amanda Hirsch is leading Box of Balloons in the Monroe area. Amanda and her husband have been married for 10 years and have three children, ages 9, 5, and 2. She is a stay-at-home mom and enjoys all the craziness and fun her children bless her with.',
    },
  ],
  IL: [
    {
      city: 'Aurora',
      leaders: 'Laura Burgess',
      email: 'boxofballoons.aurora@gmail.com',
      bio: 'Hello, My name is Laura Burgess and I have been a stay at home mom for over 5 years. Prior to that I was a 1st grade teacher in the DFW area. I have always loved working with children and giving back.',
    },
  ],
  MI: [
    {
      city: 'Grand Rapids',
      leaders: 'Laura',
      email: 'boxofballoons.grandrapidsmi@gmail.com',
      bio: 'More info coming soon!',
    },
  ],
  KY: [
    {
      city: 'Lexington',
      leaders: 'Ellen Fairbanks & Liz Yates',
      email: 'boxofballoons.lexingtonky@gmail.com',
      bio: 'Hi, I\'m Ellen! I have been married for 12 years to my husband Phil and we have three children Max (8), Nicholas (6) and Emily (4). I heard about Box of Balloons on a local radio station. The mission to bring joy to children in our local community inspired me.',
    },
  ],
  AL: [
    {
      city: 'Mobile',
      leaders: 'Shilpa & Hill',
      email: 'boxofballoons.mobileal@gmail.com',
      bio: 'Hello! Shilpa here and I am a child of immigrants. In fact, I am actually an immigrant myself because I was born in India and moved to the United States in 1989 at the age of eight.',
    },
  ],
  GA: [
    {
      city: 'Cumming',
      leaders: 'Roxann Wruble',
      email: 'boxofballoons.cummingga@gmail.com',
      bio: 'Hi, My name is Roxann Wruble. I have lived in Johns Creek (formerly Alpharetta), GA, for 21 years with my husband, Tim. We are both originally from Indiana and still have family there.',
    },
  ],
  FL: [
    {
      city: 'Palm Beach County',
      leaders: 'Marci Dubler',
      email: 'boxofballoons.palmbeachctyfl@gmail.com',
      bio: 'Hi! I\'m Marci Dubler and I was born and raised in Wisconsin which is where I learned about Box of Balloons. I now live in North Palm Beach with my husband and son.',
    },
  ],
  PA: [
    {
      city: 'Philadelphia',
      leaders: 'Alyssa Heron',
      email: 'boxofballoons.philadelphiaPA@gmail.com',
      bio: 'My name is Alyssa Heron, and I am from Philadelphia, Pennsylvania. I am a financial planner and a Temple University alumni. My now husband, Jason, and I started a chapter in Philadelphia when we were in college together to bring fellow students together to spread joy in our community!',
    },
  ],
  NY: [
    {
      city: 'Syracuse',
      leaders: 'Jennifer',
      email: 'boxofballoons.syracuseny@gmail.com',
      bio: 'Hi Everyone! My name is Jennifer Crowell. I am born and raise in Syracuse, NY. I live with my husband, Travis, and our energetic dog, Lulu. I have worked in the non profit sector since 2005, in various positions serving adults with disabilities.',
    },
  ],
  MD: [
    {
      city: 'Boonsboro',
      leaders: 'Desi Rogers',
      email: 'boxofballoonsMD@gmail.com',
      bio: 'I am Desi Rogers and I am so excited to bring Box of Balloons to my community. I live in Boonsboro Maryland with my husband, 2 children, a schnauzer and a greyhound.',
    },
    {
      city: 'Carroll County',
      leaders: 'Kelly Dynis',
      email: 'boxofballoonsccmd@gmail.com',
      bio: 'More information to come. Check back soon!',
    },
  ],
  AK: [],
  CA: [],
  CT: [],
  DE: [],
  HI: [],
  IN: [],
  KS: [],
  LA: [],
  ME: [],
  MA: [],
  MN: [],
  MS: [],
  MO: [],
  MT: [],
  NE: [],
  NH: [],
  NJ: [],
  NM: [],
  NC: [],
  OH: [],
  OR: [],
  RI: [],
  SC: [],
  SD: [],
  TN: [],
  TX: [],
  UT: [],
  VT: [],
  VA: [],
  WA: [],
  WV: [],
  WY: [],
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
                width: 600,
                maxHeight: '80vh',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                overflowY: 'auto',
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom>
                {chosenState && CHAPTER_DATA[chosenState] 
                ? `Box of Balloons Chapters in ${chosenState}` 
                : `No Chapters in ${chosenState}`}
              </Typography>
              
              {chosenState && CHAPTER_DATA[chosenState] ? (
                CHAPTER_DATA[chosenState].map((chapter, index) => (
                  <Box 
                    key={`${chosenState}-${chapter.city}`} 
                    sx={{ mb: 4 }}
                  >
                    <Typography variant="h6" color="primary" gutterBottom>
                      {chapter.city}
                    </Typography>
                   <Typography 
                     variant="subtitle1" 
                     color="text.secondary" 
                      gutterBottom
                    >
                      Chapter Leader(s): {chapter.leaders}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Email: {chapter.email}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      {chapter.bio}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography>
                  Currently no active chapters in this state. Check back soon!
                </Typography>
              )}
            </Box>
          </Modal>
        </Grid>
      </Grid>
    </div>
  );
}
