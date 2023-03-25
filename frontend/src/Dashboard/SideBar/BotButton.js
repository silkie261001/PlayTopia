import React from 'react';
import Button from '@mui/material/Button';
import SmartToyIcon from '@mui/icons-material/SmartToy';

const BotButton = () => {
  function handleClick() {
    window.location.href = 'http://localhost:5000/';
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
      <SmartToyIcon />
    </Button>
  );
};

export default BotButton;
// module.exports openChatBot;
