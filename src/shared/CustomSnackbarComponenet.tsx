import { Alert, Snackbar } from '@mui/material';

interface SnackbarComponenetProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const CustomSnackbarComponenet: React.FC<SnackbarComponenetProps> = ({ message, open, onClose }) => {

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert onClose={onClose} severity="success">
        Report copied successfully!
      </Alert>
    </Snackbar>
  );
};

// function Alert(props: AlertProps) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export default CustomSnackbarComponenet;
