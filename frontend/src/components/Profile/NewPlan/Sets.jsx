import React from 'react';
import { Box, Typography, TextField,Stack,Divider } from '@mui/material';

const Sets = ({ setIndex }) => {
  return (
    <Stack>
      <Typography variant="body1">Set {setIndex + 1}</Typography>
      <Stack alignItems='center' direction='row' gap={2} sx={{scale:'90%'}} >
      <TextField
        label="Reps"
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: 'white', borderRadius: '4px',  }}
      />
      <TextField
        label="Weight (kgs)"
        variant="outlined"
        fullWidth
        sx={{ backgroundColor: 'white', borderRadius: '4px' }}
      />
      </Stack>
    </Stack>
  );
};

export default Sets;
