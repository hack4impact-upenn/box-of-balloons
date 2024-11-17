import React from 'react';

export default function LandingHeader() {
  return (
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
          <span style={{ color: '#f472b6', fontWeight: '500' }}>Balloons</span>
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
      </div>
    </div>
  );
}
