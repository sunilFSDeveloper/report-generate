import {
  AddCircleOutlined,
  RadioButtonChecked
} from '@mui/icons-material';
import {
  Button,
  List,
  ListItem,
  Paper,
  Typography
} from '@mui/material';
import React from 'react';

const BodyComponent: React.FC = () => {
  return (
    <>
      <Paper elevation={2} sx={{p: 2, mb: 1, pb: 0 }}>
        <Typography variant="h6">
          Project Heading 1
        </Typography>
        <List>
          <ListItem>
            <RadioButtonChecked sx={{fontSize: 8}}/>
            <Typography variant="subtitle1" sx={{ml: 2, fontSize: 14}}>
              Heading Task Details
            </Typography>
            <Button variant="outlined" startIcon={<AddCircleOutlined />} size='small' sx={{ml:'auto'}}>
              Task
            </Button>
          </ListItem>
        </List>
      </Paper>
      <Button variant="outlined" color='success' startIcon={<AddCircleOutlined />} size='small' sx={{ml:'auto'}}>
      Project
      </Button>
    </>
  )
}

export default BodyComponent;