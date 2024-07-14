import React from 'react';
import { Typography, TextField, Stack } from '@mui/material';

const Sets = ({ setIndex,setSetDetails,setDetails }) => {

  return (
    <Stack>
      <Typography variant="body1">Set {setIndex + 1}</Typography>
      <Stack alignItems="center" direction="row" gap={2} sx={{ scale: '90%' }}>
        <TextField
          label="Reps"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          onChange={(e) => setSetDetails({...setDetails, reps: Number(e.target.value)})}
        />
        <TextField
          label="Weight (kgs)"
          variant="outlined"
          fullWidth
          sx={{ backgroundColor: 'white', borderRadius: '4px' }}
          onChange={(e) => setSetDetails({...setDetails, weight: Number(e.target.value)})}
        />
      </Stack>
    </Stack>
  );
};

export default Sets;
