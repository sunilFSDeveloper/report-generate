import { CheckOutlined, Edit } from '@mui/icons-material';
import { Button, CardHeader, TextField } from '@mui/material';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, saveHeader } from '../store/reducer';

const HeaderComponent: React.FC = () => {

  const [editHeader, setEditHeader] = useState(false)
  const [salutationHeading, setSalutationHeading] = useState('')
  const [salutationSubtitle, setSalutationSubtitle] = useState('')
  const dispatch = useDispatch()
  const headerText = useSelector((state: RootState) => state.headerText)

  const handleSalutationHeadingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalutationHeading(e.target.value);
  }
  const handleSalutationSubtitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSalutationSubtitle(e.target.value);
  }

  const handleSaveHeader = () => {
    dispatch(saveHeader({'title': salutationHeading, 'subTitle': salutationSubtitle}))
    setEditHeader(false)
  }

  return (
    <CardHeader
      action={
        editHeader
        ?
        <Button
          variant="text"
          color='warning'
          startIcon={<CheckOutlined color='success' />}
          size='small'
          sx={{ml:'auto', mt: 1}}
          onClick={handleSaveHeader}
          />
          :
          <Button
          variant="text"
          color='warning'
          startIcon={<Edit />}
          size='small'
          sx={{ml:'auto', mt: 1}}
          onClick={() => setEditHeader(true)}
        />
      }
      title={
        editHeader ?
        <TextField
          label="Salutation Heading"
          variant="outlined"
          size="small"
          value={salutationHeading}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleSalutationHeadingChange}
        />
        : headerText.title
      }
      subheader={
        editHeader ?
        <TextField
          label="Salutation Sub-title"
          variant="outlined"
          size="small"
          margin="dense"
          fullWidth
          sx={{ width: 500 }}
          value={salutationSubtitle}
          onChange={handleSalutationSubtitleChange}

        />
        : headerText.subTitle
      }
      sx={{height: 'auto'}}
    />
  )
}

export default HeaderComponent;