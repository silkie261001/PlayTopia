import React from 'react';
import Button from '@mui/material/Button';
import ExtensionIcon from '@mui/icons-material/Extension';

const Game2Button = () => {
  function handleClick() {
    window.location.href = 'http://localhost:3456/';
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
      <ExtensionIcon />
    </Button>
  );
};

export default Game2Button;
