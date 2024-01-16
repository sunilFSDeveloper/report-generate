import React, { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';

interface TimeInputProps {
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TimeInput: React.FC<TimeInputProps> = ({ label, value, onChange }) => {
  return (
    <TextField
      label={label}
      type="time"
      value={value}
      onChange={onChange}
      InputLabelProps={{
        shrink: true,
      }}
      inputProps={{
        step: 300, // 5 minutes interval
      }}
    />
  );
};

export default TimeInput;
