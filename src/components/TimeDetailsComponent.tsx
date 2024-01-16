import {
  CalculateOutlined,
  ContentCopy,
} from '@mui/icons-material';
import {
  Button,
  Typography
} from '@mui/material';
import React from 'react';

const TimeDetailsComponent: React.FC = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{display: 'flex', justifyContent: 'space-between'}}>
        Timing
        <Button variant="outlined" color='success' size='small' sx={{ml:'auto'}} startIcon={<CalculateOutlined />}>Calculate</Button>
        <Button variant="outlined" size='small' sx={{ml:1}} startIcon={<ContentCopy />}>Copy Time</Button>
      </Typography>
      <Typography variant="subtitle2" >
        Day Start Time: 12:13 AM
      </Typography>
      <Typography variant="subtitle2" >
        Lunch Time: 18 Minutes
      </Typography>
      <Typography variant="subtitle2" >
        Break: NO BREAK
      </Typography>
      <Typography variant="subtitle2" >
        Day End Time: 09:36 PM
      </Typography>
      <Typography variant="subtitle2" >
        Today's Hour On Desk: 09:05
      </Typography>
      <Typography variant="subtitle2" >
        Today's Total Hours: 09:23
      </Typography>
    </>
  )
}

export default TimeDetailsComponent;