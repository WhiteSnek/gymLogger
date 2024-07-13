import {
  Stack,
  Box,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
  Button,
} from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Exercises from "./Exercises";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const Schedule = () => {
  const initialMuscles = [
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Shoulders",
    "Legs",
    "Abs",
    "",
  ];
  const [muscleGroups, setMuscleGroups] = useState([
    { value: "", options: initialMuscles },
  ]);

  const addMuscleGroup = () => {
    if (muscleGroups.length < 3) {
      setMuscleGroups([
        ...muscleGroups,
        { value: "", options: initialMuscles },
      ]);
    }
  };

  const handleMuscleGroupChange = (index, newValue) => {
    const updatedMuscleGroups = muscleGroups.map((muscleGroup, i) =>
      i === index ? { ...muscleGroup, value: newValue } : muscleGroup
    );
    setMuscleGroups(updatedMuscleGroups);
  };

  const selectedMuscles = muscleGroups.map((muscleGroup) => muscleGroup.value);
  console.log(selectedMuscles);
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 4, borderRadius: 2, color: "white", position: "relative" }}>
        <Stack
          spacing={4}
          direction={"row"}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <Typography align="center" sx={{ fontSize: "1rem" }}>
            Select Muscle Groups
          </Typography>
          {muscleGroups.map((muscleGroup, index) => (
            <Stack direction="row" spacing={2} key={index} alignItems="center">
              <Autocomplete
                disablePortal
                id={`combo-box-demo-${index}`}
                options={muscleGroup.options}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={{ color: "white" }}
                    label={`Muscle Group ${index + 1}`}
                  />
                )}
                value={muscleGroup.value}
                onChange={(e, newValue) =>
                  handleMuscleGroupChange(index, newValue)
                }
              />
            </Stack>
          ))}
          {muscleGroups.length < 3 && (
            <Stack direction="row" justifyContent="center">
              <IconButton color="default" onClick={addMuscleGroup}>
                <AddCircleOutline fontSize="large" />
              </IconButton>
            </Stack>
          )}
        </Stack>
        {selectedMuscles[0] !== "" && (
          <Exercises selectedMuscles={selectedMuscles} />
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: 16,
            right: 16,
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              "&:hover": { backgroundColor: "lightgray" },
            }}
          >
            Add Schedule
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Schedule;
