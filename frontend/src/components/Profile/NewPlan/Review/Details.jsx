import React from "react";
import { Typography, Box, List, ListItem, Stack, TextField, Divider } from "@mui/material";

const Details = ({ detail }) => {
  if (!detail) {
    return <Typography>No details available</Typography>;
  }

  return (
    <Box sx={{ p: 2 }}>
      {detail.muscles?.map((muscle, muscleIndex) => (
        <Box key={muscleIndex} sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {muscle.name}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <List>
            {muscle.exercises.map((exercise, exerciseIndex) => (
              <ListItem key={exerciseIndex} sx={{ borderRadius: 1, mb: 1 }}>
                <Stack sx={{ width: '100%' }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {exercise.name.toUpperCase()}
                  </Typography>
                  <Stack spacing={2} direction="row" sx={{ mt: 1 }}>
                    {exercise.sets.map((set, setIndex) => (
                      <Stack key={setIndex} spacing={1} sx={{ flex: 1 }} direction="row">
                        <TextField
                          disabled
                          variant="outlined"
                          label="Reps"
                          defaultValue={set.reps}
                          InputProps={{ style: { textAlign: 'center' } }} // Center text
                        />
                        <TextField
                          disabled
                          variant="outlined"
                          label="Weight"
                          defaultValue={set.weight}
                          InputProps={{ style: { textAlign: 'center' } }} // Center text
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Box>
      ))}
    </Box>
  );
};

export default Details;
