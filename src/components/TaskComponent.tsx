import { AddCircleOutlined } from '@mui/icons-material';
import { DeleteOutline } from '@mui/icons-material';
import {
  Button,
  IconButton,
  List,
  ListItem,
  Paper,
  TextField,
  Typography
} from '@mui/material';
import React, { ChangeEvent, useState } from 'react';

const TaskComponent: React.FC = () => {

  const [editProjectDetails, setEditProjectDetails] = useState(true)
  const [projectHeading, setProjectHeading] = useState('')

  const uniqueId = () => Math.random().toString(36).substring(7);

  const [fields, setFields] = useState<{ id: string; value: string }[]>([{id: uniqueId(), value: ''}])

  const addTaskField = () => {
    setFields([...fields, { id: uniqueId(), value: '' }])
  }

  const handleFieldChange = (index: number, value: string) => {
    const updatedFields = [...fields];
    updatedFields[index].value = value;
    setFields(updatedFields);
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
      <Paper elevation={2} sx={{p: 2, mb: 1, pb: 0 }}>
        { editProjectDetails ?
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
            :
            <Typography variant="h6">
              Project Heading
            </Typography>
        }
        <Button
          variant="outlined"
          startIcon={<AddCircleOutlined />}
          size='medium'
          sx={{ml: 2, mt: 1}}
          onClick={addTaskField}
          >
          Task
        </Button>
        <List dense>
          {fields.map((field, index) => (
            <ListItem
            secondaryAction={index !==0 &&
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteField(index)}
              >
                <DeleteOutline color='error' />
              </IconButton>
            } 
            >
                <div key={field.id}>
                  <TextField
                    label="Project Task"
                    variant="outlined"
                    value={field.value}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    sx={{
                      width: 500,
                      '& .MuiInputBase-input': {
                        height: '5px',
                      },
                    }}
                    onChange={(e) => handleFieldChange(index, e.target.value)}
                  />
                </div>
            </ListItem>
          ))}
        </List>
      </Paper>
    </>
  )
}

export default TaskComponent;
