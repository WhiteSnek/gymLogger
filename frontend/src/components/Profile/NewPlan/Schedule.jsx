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

const Schedule = ({ addMuscle, addExercise, addSet, dayIndex, day, addDay }) => {
  const initialMuscles = [
    "Chest",
    "Back",
    "Biceps",
    "Triceps",
    "Shoulders",
    "Legs",
    "Abs",
  ];

  const [muscleGroups, setMuscleGroups] = useState([
    { value: "", options: initialMuscles, exercises: [], sets: [] },
  ]);

  const addMuscleGroup = () => {
    if (muscleGroups.length < 3) {
      setMuscleGroups([
        ...muscleGroups,
        { value: "", options: initialMuscles, exercises: [], sets: [] },
      ]);
    }
  };

  const handleMuscleGroupChange = (index, newValue) => {
    const updatedMuscleGroups = muscleGroups.map((muscleGroup, i) =>
      i === index ? { ...muscleGroup, value: newValue, exercises: [], sets: [] } : muscleGroup
    );
    setMuscleGroups(updatedMuscleGroups);
  };

  const handleExercisesChange = (index, exercises) => {
    const updatedMuscleGroups = muscleGroups.map((muscleGroup, i) =>
      i === index ? { ...muscleGroup, exercises } : muscleGroup
    );
    setMuscleGroups(updatedMuscleGroups);
  };

  const handleSetsChange = (index, sets) => {
    const updatedMuscleGroups = muscleGroups.map((muscleGroup, i) =>
      i === index ? { ...muscleGroup, sets } : muscleGroup
    );
    setMuscleGroups(updatedMuscleGroups);
  };

  const handleAddSchedule = () => {
    addDay(day);
    muscleGroups.forEach((muscleGroup, muscleIndex) => {
      if (muscleGroup.value) {
        addMuscle(dayIndex, muscleGroup.value);
        muscleGroup.exercises.forEach((exercise, exerciseIndex) => {
          addExercise(dayIndex, muscleIndex, exercise);
          muscleGroup.sets.forEach((set) => {
            addSet(dayIndex, muscleIndex, exerciseIndex, set);
          });
        });
      }
    });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ p: 4, borderRadius: 2, color: "white", position: "relative" }}>
        <Stack spacing={4} direction={"row"} sx={{ display: "flex", alignItems: "center" }}>
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
        {muscleGroups.map((muscleGroup, index) => (
          muscleGroup.value !== "" && (
            <Exercises
              key={index}
              setMuscleExercises={(exercises) => handleExercisesChange(index, exercises)}
              setExerciseSets={(sets) => handleSetsChange(index, sets)}
              selectedMuscles={[muscleGroup.value]}
            />
          )
        ))}
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
            onClick={handleAddSchedule}
          >
            Add Schedule
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Schedule;
