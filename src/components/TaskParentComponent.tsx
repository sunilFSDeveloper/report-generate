import { AddCircleOutlined } from '@mui/icons-material';
import { DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton
} from '@mui/material';
import React, { useState } from 'react';
import TaskComponent from './TaskComponent';
import { useDispatch } from 'react-redux';
import { saveProjects } from '../store/reducer';

const TaskParentComponent: React.FC = () => {

  const uniqueId = () => Math.random().toString(36).substring(7);
  const dispatch = useDispatch()

  const [projects, setProjects] = useState<{ id: string; value: [] }[]>([{id: uniqueId(), value: []}])

  const addProject = () => {
    setProjects([...projects, { id: uniqueId(), value: [] }])
    dispatch(saveProjects(projects))
  }

  const deleteField = (index: number) => {
    if (index !== 0) {
      const updatedFields = [...projects];
      updatedFields.splice(index, 1);
      setProjects(updatedFields);
    }
  }
  
  return (
    <>
      {projects.map((field, index) => (
        <Grid container spacing={2} key={field.id}>
          <Grid item xs={11}>
            <div>
              <TaskComponent projectId={field.id} />
            </div>
          </Grid>
          <Grid item xs={1}>
            {index !== 0 && (
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={() => deleteField(index)}
              >
                <DeleteOutline color="error" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      ))}
      <Button
        variant="outlined"
        color='success'
        startIcon={<AddCircleOutlined />}
        size='small'
        sx={{ml:'auto'}}
        onClick={addProject}
      >
        Project
      </Button>
    </>
  )
}

export default TaskParentComponent;
