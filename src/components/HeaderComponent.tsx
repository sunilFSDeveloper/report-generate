import { Edit } from '@mui/icons-material';
import { Button, CardHeader, TextField } from '@mui/material';
import React from 'react';

const HeaderComponent: React.FC = () => {
  return (
    <CardHeader
      action={
        <Button variant="text" color='warning' startIcon={<Edit />} size='small' sx={{ml:'auto', mt: 1}}></Button>
      }
      title="Good Evening Sir,"
      subheader="Today I've worked on following Projects"
      sx={{height: 30}}
    >
      <TextField
        type="text"
        value={'Today I`ve worked on following Projects'}
        InputLabelProps={{
        shrink: true,
        }}
        inputProps={{
        step: 300, // 5 minutes interval
        }}
      />
    </CardHeader>
  )
}

export default HeaderComponent;