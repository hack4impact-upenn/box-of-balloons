import React from 'react';

export default function LandingHeader() {
  return (
    <div style={{ padding: '25px 0px 25px 40px' }}>
      <img src="/logo.png" alt="logo" width="200px" />
      <div
        style={{
          fontSize: '35px',
          fontWeight: 500,
        }}
      >
        Welcome!
      </div>
      <div
        style={{
          fontSize: '20px',
          color: '#14b8a6',
          fontWeight: '500',
        }}
      >
        Click on your state below to connect with a local chapter in your area!
      </div>
    </div>
  );
}
