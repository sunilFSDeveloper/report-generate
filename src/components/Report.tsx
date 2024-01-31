import React from 'react';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import HeaderComponent from './HeaderComponent';
import TaskParentComponent from './TaskParentComponent';
import TimeDetailsComponent from './TimeDetailsComponent';
import FinalReportComponent from './FinalReportComponent';

const Report: React.FC = () => {

  return (
    <Container
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '100%'
        }}
    >
      <Card sx={{ margin: 2 }}>
        <Paper elevation={2} sx={{ m: 2, mb: 0 }}>
          <HeaderComponent />
        </Paper>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item sm={12} lg={5}>
              <TaskParentComponent />
            </Grid>
            <Grid item sm={12} lg={4}>
              <Paper  sx={{ p: 2 }}>
                <TimeDetailsComponent />
              </Paper>
            </Grid>
            <Grid item sm={12} lg={3}>
              <Paper sx={{ p: 2 }}>
                <FinalReportComponent />
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Report;
