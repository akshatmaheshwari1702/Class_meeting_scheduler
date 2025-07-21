import React from 'react';

const Header = () => (
  <header style={{
    background: '#2d3748',
    color: '#fff',
    padding: '1rem 2rem',
    textAlign: 'center',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  }}>
    <h1 style={{ margin: 0, fontSize: '2rem', letterSpacing: '1px' }}>
      Meeting Scheduler
    </h1>
  </header>
);

export default Header;