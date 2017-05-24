import React from 'react';

const noEventStyle = {
  width: '336px',
  height: 'auto',
  padding: '34px 0 43px',
  textAlign: 'center',
  verticalAlign: 'middle',
  fontSize: '15px',
  fontFamily: 'Avenir',
  fontWeight: 'medium',
  color: '#585858'
};

const NoEvents = () => (<div style={noEventStyle}>No events found for artist.</div>);

export default NoEvents;
