import {
  AddCircleOutlined,
  CalculateOutlined,
  ContentCopy,
  DeleteOutline,
  RestoreOutlined,
} from '@mui/icons-material';
import {
  Alert,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import React, { ReactElement, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveLocalTime } from '../store/reducer';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import ReactDOM from 'react-dom';

interface TimeRow {
  startTime: Dayjs | null;
  endTime: Dayjs | null;
  manualTime: Dayjs | null;
}

const TimeDetailsComponent: React.FC = () => {

  const [timeRows, setTimeRows] = useState<TimeRow[]>([])
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [lunchStartTime, setLunchStartTime] = useState<Dayjs | null>(null)
  const [lunchEndTime, setLunchEndTime] = useState<Dayjs | null>(null)
  const [lunchManualTime, setLunchManualTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)
  const [totalReportingTime, setTotalReportingTime] = useState<ReactElement | undefined>()

  const dispatch = useDispatch()

  const handleAddRow = () => {
    setTimeRows([...timeRows, { startTime: dayjs('2022-04-17T00:00'), endTime: dayjs('2022-04-17T00:00'), manualTime: dayjs('2022-04-17T00:00') }]);
  };

  const handleRemoveRow = (index: number) => {
    const updatedRows = [...timeRows];
    updatedRows.splice(index, 1);
    setTimeRows(updatedRows);
  };

  const handleChange = (index: number, field: keyof TimeRow, value: Dayjs | null) => {
    const updatedRows = [...timeRows];
    if (value !== null) {
      updatedRows[index][field] = value;
      setTimeRows(updatedRows);
    }
  }

  const calculateTime = () => {
    let totalBreakTime = 0;
    let totalLunchTime = 0;

    if (timeRows.length > 0) {
      timeRows.forEach((timeRow) => {
        const startBreakTime = timeRow.startTime;
        const endBreakTime = timeRow.endTime;
        if (startBreakTime && endBreakTime) {
          const differenceInMinutes = endBreakTime.diff(startBreakTime, 'minute');
          totalBreakTime += differenceInMinutes;
        }
      });
    }

    if (lunchStartTime && lunchEndTime) {
      const differenceInMinutes = lunchEndTime.diff(lunchStartTime, 'minute');
      totalLunchTime = differenceInMinutes;
    }

    let totalFullTime = 0;
    if (startTime && endTime) {
      const differenceInMinutes = endTime.diff(startTime, 'minute');
      totalFullTime = differenceInMinutes;
    }

    let finalTime = totalFullTime;
    if (totalLunchTime > 0) {
      finalTime -= totalLunchTime;
    }
    finalTime -= totalBreakTime;

    const formatTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours < 10 ? '0' + hours : hours}:${remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes}`;
    };

    setTotalReportingTime(
      <>
        <Typography variant="body2">Day Start Time: {startTime?.format('hh:mm A')}</Typography>
        <Typography variant="body2">Lunch Time: {formatTime(totalLunchTime)}</Typography>
        <Typography variant="body2">Break Time: {formatTime(totalBreakTime)}</Typography>
        <Typography variant="body2">Day End Time: {endTime?.format('hh:mm A')}</Typography>
        <Typography variant="body2">Today's Hour On Desk: {formatTime(finalTime)}</Typography>
        <Typography variant="body2">Today's Total Hours: {formatTime(totalFullTime)}</Typography>
      </>
    );

    dispatch(saveLocalTime({
      startTime: startTime,
      totalLunchTime: totalLunchTime,
      totalBreakTime: totalBreakTime,
      endTime: endTime,
      totalFullTime: totalFullTime,
      finalTime: finalTime
    }));
  }

  const resetReportTime = () => {
    setStartTime(null)
    setLunchStartTime(null)
    setLunchEndTime(null)
    setLunchManualTime(null)
    setEndTime(null)
  }

  const [loading, setLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)

  const [htmlContent, setHtmlContent] = useState('');
  const timeRef = useRef(null);

  const handleCopy = () => {
    setLoading(true);
    const cardNode = ReactDOM.findDOMNode(timeRef.current);
  
    if (cardNode instanceof HTMLElement) {
      const content = cardNode.innerHTML;
      const formattedText = content.replace(/<\/(p|div|h6)\s*>/gi, '\n');
      const textContent = formattedText.replace(/<[^>]+>/g, '');
  
      setHtmlContent(textContent);
      navigator.clipboard.writeText(textContent)
        .then(() => {
          setTimeout(() => {
            setLoading(false);
            setOpenMessage(true);
          }, 600);
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error copying text:', error);
        });
    }
  }

  const handleClose = () => {
    setOpenMessage(false);
  }

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{display: 'flex', justifyContent: 'space-between'}}>
        Timing
      </Typography>
      <Grid container spacing={3}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item xs={12}>
          <TimeField
            label="Start Time"
            value={startTime}
            onChange={(newValue) => {
              setStartTime(newValue);
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '15px',
                padding: '10px',
                fontSize: '12px'
              },
            }}
            slots={{
              textField: textFieldProps => <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...textFieldProps}
              />
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TimeField
            label="Lunch Start Time"
            value={lunchStartTime}
            onChange={(newValue) => {
              setLunchStartTime(newValue);
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '15px',
                padding: '10px',
                fontSize: '12px'
              },
            }}
            slots={{
              textField: textFieldProps => <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...textFieldProps}
              />
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TimeField
            label="Lunch End Time"
            value={lunchEndTime}
            onChange={(newValue) => {
              setLunchEndTime(newValue);
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '15px',
                padding: '10px',
                fontSize: '12px'
              },
            }}
            slots={{
              textField: textFieldProps => <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...textFieldProps}
              />
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          {/* <TimeField
            label="Lunch Manual Time"
            value={lunchManualTime}
            onChange={(newValue) => {
              setLunchManualTime(newValue);
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '30px',
                padding: '10px',
              },
            }}
            slots={{
              textField: textFieldProps => <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...textFieldProps}
              />
            }}
          /> */}
        </Grid>
        <Button
          variant="contained"
          startIcon={<AddCircleOutlined />}
          size='small'
          sx={{ ml: 3, mt: 2 }}
          onClick={handleAddRow}
          >
          Break
        </Button>
        {timeRows.map((row, index) => (
        <Grid container spacing={2} key={index} sx={{ m: 1 }}>
          <Grid item xs={12} sm={4}>
            <TimeField
              label="Start Time"
              value={row.startTime}
              onChange={(newValue) => {
                handleChange(index, 'startTime', newValue);
              }}
              sx={{
                '& input': {
                  width: '100%',
                  height: '15px',
                  padding: '10px',
                  fontSize: '12px'
                },
              }}
              slots={{
                textField: textFieldProps => <TextField
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...textFieldProps}
                />
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TimeField
              label="End Time"
              value={row.endTime}
              onChange={(newValue) => {
                handleChange(index, 'endTime', newValue);
              }}
              sx={{
                '& input': {
                  width: '100%',
                  height: '15px',
                  padding: '10px',
                  fontSize: '12px'
                },
              }}
              slots={{
                textField: textFieldProps => <TextField
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...textFieldProps}
                />
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={3}>
            {/* <TimeField
              label="Manual Time"
              value={row.manualTime}
              onChange={(newValue) => {
                handleChange(index, 'manualTime', newValue);
              }}
              sx={{
                '& input': {
                  width: '100%',
                  height: '30px',
                  padding: '10px',
                },
              }}
              slots={{
                textField: textFieldProps => <TextField
                  fullWidth
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  {...textFieldProps}
                />
              }}
            /> */}
          </Grid>
          <Grid item xs={12} sm={1}>
            <IconButton onClick={() => handleRemoveRow(index)}>
              <DeleteOutline color='error' />
            </IconButton>
          </Grid>
        </Grid>
      ))}
        <Grid item xs={12}>
          <TimeField
            label="End Time"
            value={endTime}
            onChange={(newValue) => {
              setEndTime(newValue);
            }}
            sx={{
              '& input': {
                width: '100%',
                height: '15px',
                padding: '10px',
                fontSize: '12px'
              },
            }}
            slots={{
              textField: textFieldProps => <TextField
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...textFieldProps}
              />
            }}
          />
        </Grid>
      </LocalizationProvider>
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
            variant="contained"
            color='success'
            size='small'
            startIcon={<CalculateOutlined />}
            onClick={calculateTime}
          >
            Calculate
          </Button>
        </Grid>
        <Grid item sm={12} md={4}>
          <Button
            variant="contained"
            color='warning'
            size='small'
            disabled={loading}
            onClick={handleCopy}
            startIcon={loading ? <CircularProgress size={20} /> : <ContentCopy />}
          >
            Copy Time
          </Button>
        </Grid>
        <Grid item sm={12} md={4}>
          <Button
              variant="contained"
              color='error'
              size='small'
              startIcon={<RestoreOutlined />}
              onClick={resetReportTime}
            >
            Reset Time
          </Button>
        </Grid>
        <Grid item md={12} sx={{ p: 1, mt: 1 }} ref={timeRef}>
          {totalReportingTime}
        </Grid>
      </Grid>
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success">
          Time copied successfully!
        </Alert>
      </Snackbar>
    </>
  )
}

export default TimeDetailsComponent;