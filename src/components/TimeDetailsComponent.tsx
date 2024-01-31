import {
  AddCircleOutlined,
  CalculateOutlined,
  ContentCopy,
  DeleteOutline,
  RestoreOutlined,
} from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import React, { ReactElement, useState } from 'react';

interface TimeRow {
  startTime: string;
  endTime: string;
  manualTime: string;
}

const TimeDetailsComponent: React.FC = () => {

  const [timeRows, setTimeRows] = useState<TimeRow[]>([])
  const [startTime, setStartTime] = useState('')
  const [lunchStartTime, setLunchStartTime] = useState('')
  const [lunchEndTime, setLunchEndTime] = useState('')
  const [lunchManualTime, setLunchManualTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [totalReportingTime, setTotalReportingTime] = useState<ReactElement | undefined>()

  const handleAddRow = () => {
    setTimeRows([...timeRows, { startTime: '', endTime: '', manualTime: '' }]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = [...timeRows];
    updatedRows.splice(index, 1);
    setTimeRows(updatedRows);
  };

  const handleChange = (index: number, field: keyof TimeRow, value: string) => {
    const updatedRows = [...timeRows];
    updatedRows[index][field] = value;
    setTimeRows(updatedRows);
  }

  const calculateTime = () => {
    const startTimeDate = new Date(`2022-01-01T${startTime}`)
    const endTimeDate = new Date(`2022-01-01T${endTime}`)
    const lunchStartTimeDate = new Date(`2022-01-01T${lunchStartTime}`)
    const lunchEndTimeDate = new Date(`2022-01-01T${lunchEndTime}`)

    const lunchTime = lunchEndTimeDate.getTime() - lunchStartTimeDate.getTime()
    const totalFullTime = endTimeDate.getTime() - startTimeDate.getTime()

    const totalLunchTime = lunchManualTime ? Number(lunchManualTime) * 60 * 1000 : lunchTime
    const finalTime = totalLunchTime ? totalFullTime - totalLunchTime : totalFullTime

    const hours = Math.floor(finalTime / (1000 * 60 * 60))
    const minutes = Math.floor((finalTime % (1000 * 60 * 60)) / (1000 * 60))

    console.log(finalTime, `${hours} hours ${minutes} minutes`)
    setTotalReportingTime(
      <>
        <Typography variant="body1">Day Start Time: 12:12 AM</Typography>
        <Typography variant="body1">Lunch Time: 20 Minutes</Typography>
        <Typography variant="body1">Break: 10 Minutes</Typography>
        <Typography variant="body1">Day End Time: 09:21 PM</Typography>
        <Typography variant="body1">Today's Hour On Desk: 08:39</Typography>
        <Typography variant="body1">Today's Total Hours: 09:09</Typography>
      </>
    )
  }

  const resetReportTime = () => {
    setStartTime('')
    setLunchStartTime('')
    setLunchEndTime('')
    setLunchManualTime('')
    setEndTime('')
  }

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{display: 'flex', justifyContent: 'space-between'}}>
        Timing
      </Typography>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <TextField
            type='time'
            label="Start Time"
            variant="outlined"
            fullWidth
            value={startTime}
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              '& input': {
                height: '30px',
                padding: '10px',
              },
            }}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="time"
            label="Lunch Start Time"
            variant="outlined"
            fullWidth
            value={lunchStartTime}
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              '& input': {
                height: '30px',
                padding: '10px',
              },
            }}
            onChange={(e) => setLunchStartTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="time"
            label="Lunch End Time"
            variant="outlined"
            fullWidth
            value={lunchEndTime}
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '30px',
                padding: '10px',
              },
            }}
            onChange={(e) => setLunchEndTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            type="text"
            label="Lunch Manual Time"
            variant="outlined"
            fullWidth
            value={lunchManualTime}
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '30px',
                padding: '10px',
              },
            }}
            onChange={(e) => setLunchManualTime(e.target.value)}
          />
        </Grid>
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlined />}
          size='medium'
          sx={{ ml: 3, mt: 1 }}
          onClick={handleAddRow}
          >
          Break
        </Button>
        {timeRows.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ m: 1 }}>
          <Grid item xs={12} sm={4}>
            <TextField
              type="time"
              label="Start Time"
              variant="outlined"
              value={row.startTime}
              onChange={(e) => handleChange(index, 'startTime', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              sx={{
                '& input': {
                  width: '100%',
                  height: '30px',
                  padding: '10px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="time"
              label="End Time"
              variant="outlined"
              value={row.endTime}
              onChange={(e) => handleChange(index, 'endTime', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              sx={{
                '& input': {
                  width: '100%',
                  height: '30px',
                  padding: '10px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="text"
              label="Manual Time"
              variant="outlined"
              value={row.manualTime}
              onChange={(e) => handleChange(index, 'manualTime', e.target.value)}
              fullWidth
              InputLabelProps={{
                shrink: true
              }}
              sx={{
                '& input': {
                  width: '100%',
                  height: '30px',
                  padding: '10px',
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton onClick={() => handleRemoveRow(index)}>
              <DeleteOutline color='error' />
            </IconButton>
          </Grid>
        </Grid>
      ))}
        <Grid item xs={12}>
          <TextField
            type='time'
            label="End Time"
            variant="outlined"
            fullWidth
            value={endTime}
            InputLabelProps={{
              shrink: true
            }}
            sx={{
              '& input': {
                height: '30px',
                padding: '10px',
              },
            }}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        spacing={3}
        sx={{ my: 1 }}
      >
        <Grid item sm={12} md={4}>
          <Button
            variant="outlined"
            color='success'
            size='medium'
            startIcon={<CalculateOutlined />}
            onClick={calculateTime}
          >
            Calculate
          </Button>
        </Grid>
        <Grid item sm={12} md={4}>
          <Button
            variant="outlined"
            color='warning'
            size='medium'
            startIcon={<ContentCopy />}
          >
            Copy
          </Button>
        </Grid>
        <Grid item sm={12} md={4}>
          <Button
              variant="outlined"
              color='error'
              size='medium'
              startIcon={<RestoreOutlined />}
              onClick={resetReportTime}
            >
            Reset
          </Button>
        </Grid>
        <Grid item md={12} sx={{ p: 3, mt: 3 }}>
          {totalReportingTime}
        </Grid>
      </Grid>
    </>
  )
}

export default TimeDetailsComponent;