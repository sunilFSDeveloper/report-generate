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

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  }

  const timeToDateTime = (time: string) => {
    return new Date(`2022-01-01T${time}`)
  }

  const calculateTime = () => {
    const startTimeDate = timeToDateTime(startTime)
    const endTimeDate = timeToDateTime(endTime)
    const lunchStartTimeDate = timeToDateTime(lunchStartTime)
    const lunchEndTimeDate = timeToDateTime(lunchEndTime)
    let totalBreackTime = 0
    if (timeRows.length > 0) {
      timeRows.forEach((timeRow) => {
        const startBreakTimeDate = timeToDateTime(timeRow.startTime)
        const endBreakTimeDate = timeToDateTime(timeRow.endTime)
        const breakTimeString = endBreakTimeDate.getTime() - startBreakTimeDate.getTime()
        totalBreackTime = totalBreackTime + (timeRow.manualTime ? Number(timeRow.manualTime) * 60 * 1000 : breakTimeString)
      })
    }

    const lunchTime = lunchEndTimeDate.getTime() - lunchStartTimeDate.getTime()
    const totalFullTime = (endTimeDate.getTime() - startTimeDate.getTime()) - totalBreackTime
    const totalTimeWithoutBreak = (endTimeDate.getTime() - startTimeDate.getTime()) - totalBreackTime

    const totalLunchTime = lunchManualTime ? Number(lunchManualTime) * 60 * 1000 : lunchTime
    const finalTime =totalLunchTime ? totalTimeWithoutBreak - totalLunchTime : totalTimeWithoutBreak

    setTotalReportingTime(
      <>
        <Typography variant="body1">Day Start Time: {startTime}</Typography>
        <Typography variant="body1">Lunch Time: {formatTime(totalLunchTime)}</Typography>
        <Typography variant="body1">Break: {formatTime(totalBreackTime)}</Typography>
        <Typography variant="body1">Day End Time: {endTime}</Typography>
        <Typography variant="body1">Today's Hour On Desk: {formatTime(totalFullTime)}</Typography>
        <Typography variant="body1">Today's Total Hours: {formatTime(finalTime)}</Typography>
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