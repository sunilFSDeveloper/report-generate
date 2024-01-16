import {
  ContentCopy,
} from '@mui/icons-material';
import {
  Button,
  Typography
} from '@mui/material';
import React from 'react';
  
const FinalReportComponent: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom sx={{display: 'flex', justifyContent: 'space-between'}}>
        Daily Report
        <Button variant="outlined" size='small' sx={{ml:1}} startIcon={<ContentCopy />}>Copy Report</Button>
      </Typography>
      <Typography variant="body1">
        <Typography variant="subtitle2">Hello Sir, Good Evening!</Typography>
        <Typography variant="body1">Today I have worked on the following task:</Typography>
        <Typography variant="body1">
        <Typography variant="body1" sx={{ pl: 2 }}>
            Other:
        </Typography>
        <Typography variant="body1" sx={{ pl: 4 }}>
            1. Preparing for test
        </Typography>
        </Typography>
        <Typography variant="body1">
        <Typography variant="body1" sx={{ pl: 2 }}>
            TechFabric:
        </Typography>
        <Typography variant="body1" sx={{ pl: 4 }}>
            1. Communication and discussion
        </Typography>
        </Typography>
        <Typography variant="body1">
        <Typography variant="body1" sx={{ pl: 2 }}>
            NxLead:
        </Typography>
        <Typography variant="body1" sx={{ pl: 4 }}>
            1. Communication and discussion
        </Typography>
        </Typography>
        <Typography variant="body1">
        <Typography variant="body1" sx={{ pl: 2 }}>
            eEndorsements:
        </Typography>
        <Typography variant="body1" sx={{ pl: 4 }}>
            1. Communication and discussion
        </Typography>
        </Typography>
        <Typography variant="body1">Day Start Time: 12:12 AM</Typography>
        <Typography variant="body1">Lunch Time: 20 Minutes</Typography>
        <Typography variant="body1">Break: 10 Minutes</Typography>
        <Typography variant="body1">Day End Time: 09:21 PM</Typography>
        <Typography variant="body1">Today's Hour On Desk: 08:39</Typography>
        <Typography variant="body1">Today's Total Hours: 09:09</Typography>
      </Typography>
    </>
  )
}
  
  export default FinalReportComponent;