import { AddCircleOutlined } from '@mui/icons-material';
import { DeleteOutline } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  Paper,
  TextField
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveProjects, projects, RootState, deleteProjects } from '../store/reducer';

const TaskParentComponent: React.FC = () => {

  const uniqueId = Math.random().toString(36).substring(7);
  const dispatch = useDispatch()

  const stateProjects = useSelector((state: RootState) => state.projects)

  const [projects, setProjects] = useState<projects[]>(stateProjects)

  const addProject = () => {  
    const newProject = {
      projectId: uniqueId,
      projectHeading: 'Project Heading',
      task: [{
        id: uniqueId,
        value: ''
      }],
    }
    setProjects([...projects, newProject]);
  
    dispatch(saveProjects([...projects, newProject]))
  }

  const deleteProject = (projectId: string) => {
    const updatedFields = projects.filter(project => project.projectId !== projectId);
    setProjects(updatedFields);
    dispatch(deleteProjects(projectId))
  }

  const addTaskField = (projectId: string) => {
    const newField = { id: uniqueId, value: '' };
    const existingProjectIndex = stateProjects.findIndex(project => project.projectId === projectId);

    const updatedProject = JSON.parse(JSON.stringify(projects[existingProjectIndex]));

    updatedProject.task.push(newField);

    const updatedFields = [...projects];
    updatedFields[existingProjectIndex] = updatedProject;

    setProjects(updatedFields);
    dispatch(saveProjects(updatedFields))
  }

  const handleFieldChange = (taskId: string, projectId: string, value: string) => {
    const existingProjectIndex = stateProjects.findIndex(project => project.projectId === projectId);
    const updatedProjectFields = [...projects];

    updatedProjectFields[existingProjectIndex] = {
      ...updatedProjectFields[existingProjectIndex],
      task: updatedProjectFields[existingProjectIndex].task.map(field =>
        field.id === taskId ? { ...field, value: value } : field
      )
    }

    setProjects(updatedProjectFields);
    dispatch(saveProjects(updatedProjectFields))
  }

  const handleProjectHeadingChange = (value: string, projectId: string) => {
    const existingProjectIndex = stateProjects.findIndex(project => project.projectId === projectId);
    const updatedProjectFields = [...projects];

    updatedProjectFields[existingProjectIndex] = {
      ...updatedProjectFields[existingProjectIndex],
      projectHeading: value
    }

    setProjects(updatedProjectFields);
    dispatch(saveProjects(updatedProjectFields))
  }

  const deleteField = (taskId: string, projectId: string) => {
    const existingProjectIndex = stateProjects.findIndex(project => project.projectId === projectId);
    const updatedProjectFields = [...projects];

    updatedProjectFields[existingProjectIndex] = {
      ...updatedProjectFields[existingProjectIndex],
      task: updatedProjectFields[existingProjectIndex].task.filter(field =>
        field.id !== taskId
      )
    }
    setProjects(updatedProjectFields)
    dispatch(saveProjects(updatedProjectFields))
  }
  
  return (
    <>
      {projects.map((field, index) => (
        <Grid container spacing={2} key={field.projectId}>
          <Grid item xs={11}>
            <div>
              <Paper key={field.projectId} elevation={2} sx={{p: 2, mb: 1, maxWidth: '100%' }} >
                <TextField
                  label="Project Heading"
                  variant="outlined"
                  value={field.projectHeading}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleProjectHeadingChange(e.target.value, field.projectId)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ 
                    width: 350,
                    '& .MuiInputBase-input': {
                      width: '100%',
                      height: '15px',
                      padding: '10px',
                      fontSize: '14px'
                    },
                  }}
                />
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlined />}
                  size='small'
                  sx={{ ml: 3 }}
                  onClick={() => addTaskField(field.projectId)}
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
                          width: '100%',
                          height: '15px',
                          padding: '10px',
                          fontSize: '13px'
                        },
                      }}
                      onChange={(e) => handleFieldChange(task.id, field.projectId, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    {index !== 0 && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => deleteField(task.id, field.projectId)}
                      >
                        <DeleteOutline color="error" />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              ))}
              </Paper>
            </div>
          </Grid>
          <Grid item xs={1}>
            {index !== 0 && (
              <IconButton
                edge="start"
                aria-label="delete"
                onClick={() => deleteProject(field.projectId)}
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
