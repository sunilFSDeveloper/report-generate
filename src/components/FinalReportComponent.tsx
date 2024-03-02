import {
  ContentCopy,
} from '@mui/icons-material';
import {
  Alert,
  Button,
  CardContent,
  CardHeader,
  CircularProgress,
  Snackbar,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
  
const FinalReportComponent: React.FC = () => {

  const headerText = useSelector((state: RootState) => state.headerText)
  const projects = useSelector((state: RootState) => state.projects)
  const localTime = useSelector((state: RootState) => state.localTime)

  const state = useSelector((state: RootState) => state)

  const serializedState = JSON.stringify(state);

  const [loading, setLoading] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)

  const [htmlContent, setHtmlContent] = useState('');
  const cardRef = useRef(null);

  const handleCopy = () => {
    setLoading(true);
    const cardNode = ReactDOM.findDOMNode(cardRef.current);
  
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
          Cookies.set('dailyReport', serializedState);
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

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours < 10 ? '0' + hours : hours}:${remainingMinutes < 10 ? '0' + remainingMinutes : remainingMinutes}`;
  };

  return (
    <>
      <CardHeader
        title="Daily Report"
        action={
          <Button
            variant="contained"
            size='small'
            disabled={loading}
            onClick={handleCopy}
            startIcon={loading ? <CircularProgress size={20} /> : <ContentCopy />}
          >
            Copy Report
          </Button>
        }
      />
      <CardContent ref={cardRef}>
        <CardContent sx={{ p: 0 }} >
          <Typography variant="subtitle1">{headerText.title}</Typography>
          <Typography variant="body1">{headerText.subTitle}</Typography>
        </CardContent >
        {projects.map((project, index) => (
          <CardContent key={index} sx={{ p: 1 }}>
            <Typography variant="body1">
              <Typography variant="body1" sx={{ pl: 1 }}>{project.projectHeading}:</Typography>
              {project.task.map((task, index) => (
                <Typography variant="body2" sx={{ pl: 2 }}>{index + 1}. {task.value} </Typography>
              ))}
            </Typography>
          </CardContent>
        ))}
        <CardContent sx={{ p: 1 }}>
          <Typography variant="body2">Day Start Time: {localTime.startTime?.format('hh:mm A')}</Typography>
          <Typography variant="body2">Lunch Time: {formatTime(localTime.totalLunchTime)}</Typography>
          <Typography variant="body2">Break: {formatTime(localTime.totalBreakTime)}</Typography>
          <Typography variant="body2">Day End Time: {localTime.endTime?.format('hh:mm A')}</Typography>
          <Typography variant="body2">Today's Hour On Desk: {formatTime(localTime.finalTime)}</Typography>
          <Typography variant="body2">Today's Total Hours: {formatTime(localTime.totalFullTime)}</Typography>
        </CardContent>
      </CardContent>
      <Snackbar
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleClose} severity="success">
          Report copied successfully!
        </Alert>
      </Snackbar>
    </>
  )
}
  
  export default FinalReportComponent;