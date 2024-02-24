import { AddCircleOutlined } from '@mui/icons-material';
import { DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField,
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveProjectFields } from '../store/reducer';

interface TaskComponentProps {
  projectId: string;
}

const TaskComponent: React.FC<TaskComponentProps> = ({projectId}) => {

  const [projectHeading, setProjectHeading] = useState('')

  const uniqueId = () => Math.random().toString(36).substring(7);
  const dispatch = useDispatch()

  const [fields, setFields] = useState<{ id: string; projectId: string; value: string }[]>([{id: uniqueId(), projectId: projectId, value: ''}])

  const addTaskField = () => {
    setFields([...fields, { id: uniqueId(), projectId: projectId, value: '' }])
    dispatch(saveProjectFields(fields))
  }

  const handleFieldChange = (index: number, projectId: string, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
    console.log('updatedFields', updatedFields)
  }

  const deleteField = (index: number) => {
    if (index !== 0) {
      const updatedFields = [...fields];
      updatedFields.splice(index, 1);
      setFields(updatedFields);
    }
  }
  
  return (
    <>
      <Paper elevation={2} sx={{p: 2, mb: 1, maxWidth: '100%' }} >
        <TextField
          label="Project Heading"
          variant="outlined"
          value={projectHeading}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setProjectHeading(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ 
            width: 350,
            '& .MuiInputBase-input': {
              height: '5px',
            },
          }}
        />
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlined />}
          size='medium'
          sx={{ ml: 3 }}
          onClick={addTaskField}
          >
          Task
        </Button>
        {fields.map((field, index) => (
        <Grid container spacing={2} key={field.id} sx={{ m: 0.5 }}>
          <Grid item xs={10}>
            <TextField
              label="Project Task"
              variant="outlined"
              value={field.value}
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                width: '100%',
                '& .MuiInputBase-input': {
                  height: '5px',
                },
              }}
              onChange={(e) => handleFieldChange(index, projectId, e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            {index !== 0 && (
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteField(index)}
              >
                <DeleteOutline color="error" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
      </Paper>
    </>
  )
}

export default TaskComponent;
