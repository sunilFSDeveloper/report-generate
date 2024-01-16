import React from 'react';
import {
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
} from '@mui/material';
import HeaderComponent from './HeaderComponent';
import BodyComponent from './BodyComponent';
import TimeDetailsComponent from './TimeDetailsComponent';
import FinalReportComponent from './FinalReportComponent';

const Report: React.FC = () => {

  return (
    <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Card sx={{ margin: 2}}>
        <Paper elevation={2} sx={{m: 2, mb: 0}}>
          <HeaderComponent />
        </Paper>
        <CardContent>
          <Grid container spacing={2} paddingX={2}>
            <Grid item xs={7}>
              <BodyComponent />
            </Grid>
            <Grid item xs={5}>
              <Paper elevation={2} sx={{p: 2, mb: 1}}>
                <TimeDetailsComponent />
              </Paper>
              <Paper elevation={2} sx={{p: 2, mb: 1}}>
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
