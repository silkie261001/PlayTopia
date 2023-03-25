import React from 'react';
import { Box } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const OnlineIndicator = () => {
  return (
    <Box
      sx={{
        color: '##34E4EA',
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        right: '5px',
      }}
    >
      <FiberManualRecordIcon />
    </Box>
  );
};

export default OnlineIndicator;
