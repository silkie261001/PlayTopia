import React from 'react';
import Button from '@mui/material/Button';
import FunctionsIcon from '@mui/icons-material/Functions';

const Game1Button = () => {
  function handleClick() {
    window.location.href = 'http://localhost:3457/';
  }
  return (
    <Button
      style={{
        width: '48px',
        height: '48px',
        borderRadius: '16px',
        margin: 0,
        padding: 0,
        minWidth: 0,
        marginTop: '10px',
        color: 'white',
        backgroundColor: '#1985a1',
      }}
      onClick={handleClick}
    >
      <FunctionsIcon />
    </Button>
  );
};

export default Game1Button;
