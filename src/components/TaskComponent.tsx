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
import { useDispatch, useSelector } from 'react-redux';
import { RootState, projectDetails, saveProjectDetails } from '../store/reducer';

interface TaskComponentProps {
  projectId: string;
}

const TaskComponent: React.FC<TaskComponentProps> = ({projectId}) => {

  const uniqueId = () => Math.random().toString(36).substring(7)
  const dispatch = useDispatch()

  const projectLocalDetails = useSelector((state: RootState) => state.projectDetails)

  const [fields, setFields] = useState<projectDetails[]>(projectLocalDetails)

  const addTaskField = (projectId: string) => {
    const newField = { id: uniqueId, value: '' };
    // const updatedFields = [...fields, newField];
    const existingProjectTask = projectLocalDetails.find(field => field.projectId === projectId)

    console.log('sss', existingProjectTask, projectId)
    
    // setFields([...projectLocalDetails.filter(field => field.projectId !== projectId), ...updatedFields]);
    // setFields(projectLocalDetails[existingProjectTask].task.push(newField));
    // dispatch(saveProjectFields(updatedFields));
  }

  const handleFieldChange = (index: number, projectId: string, value: string) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, value: value } : field
    );
    setFields(updatedFields);
    dispatch(saveProjectDetails([...projectLocalDetails.filter(field => field.projectId !== projectId), ...updatedFields]));
  }

  const handleProjectHeadingChange = (value: string, projectId: string) => {
    
  }

  const deleteField = (index: number, projectId: string) => {
    if (index !== 0) {
      const updatedFields = [...fields];
      updatedFields.splice(index, 1);
      setFields(updatedFields);
      dispatch(saveProjectDetails(updatedFields));
    }
  }
  
  return (
    <>
      {fields.map((field, index) => (
        <Paper key={field.projectId} elevation={2} sx={{p: 2, mb: 1, maxWidth: '100%' }} >
          <TextField
            label="Project Heading"
            variant="outlined"
            value={field.projectHeading}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleProjectHeadingChange(e.target.value, projectId)}
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
            onClick={() => addTaskField(projectId)}
            >
            Task
          </Button>
          {field.task.map((task, index) => (
          <Grid container spacing={2} key={task.id} sx={{ m: 0.5 }}>
            <Grid item xs={10}>
              <TextField
                label="Project Task"
                variant="outlined"
                value={task.value}
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
                  onClick={() => deleteField(index, projectId)}
                >
                  <DeleteOutline color="error" />
                </IconButton>
              )}
            </Grid>
          </Grid>
        ))}
        </Paper>
      ))}
    </>
  )
}

export default TaskComponent;
