import {
  Stack,
  Box,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
  Button,
  Snackbar,
  Alert
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

const Schedule = ({ day, setDetails }) => {
  const [snackState, setSnackState] = useState({
    severity: "",
    message: "",
    open: false,
  });

  const openSnackbar = ({ severity, message }) => {
    setSnackState({ severity, message, open: true });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackState({ ...snackState, open: false });
  };

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
      setMuscleGroups([...muscleGroups, { value: "", options: initialMuscles, exercises: [], sets: [] }]);
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
    setDetails((prevDetails) => {
      const dayExists = prevDetails.some(entry => entry.day === day);
  
      // Check for empty or null values
      if (!day || day.trim() === "") {
        openSnackbar({ severity: "warning", message: "Day cannot be empty." });
        return prevDetails;
      }
  
      if (dayExists) {
        openSnackbar({ severity: "warning", message: `The day "${day}" already exists. Please choose a different day.` });
        return prevDetails;
      }
  
      // Validate muscleGroups
      if (!muscleGroups || muscleGroups.length === 0) {
        openSnackbar({ severity: "warning", message: "Muscle groups cannot be empty." });
        return prevDetails;
      }
  
      const newDayEntry = {
        day: day,
        muscles: muscleGroups.map((muscleGroup) => {
          const exercises = muscleGroup.exercises.map((exercise) => {
            // Validate exercise name
            if (!exercise.value || exercise.value.trim() === "") {
              openSnackbar({ severity: "warning", message: "Exercise name cannot be empty." });
              return null; // Skip empty exercise
            }
  
            const validSets = exercise.sets?.slice(1) || []; // Remove the first element
  
            return {
              name: exercise.value,
              sets: validSets.map((set) => {
                // Validate set values
                if (set.reps === null || set.reps === "") {
                  return null; // Skip invalid set
                }
  
                return {
                  reps: set.reps,
                  weight: set.weight,
                };
              }).filter(Boolean), // Remove null sets
            };
          }).filter(Boolean); // Remove null exercises
  
          // Return muscle group only if it has exercises
          return {
            name: muscleGroup.value,
            exercises: exercises.length > 0 ? exercises : null, // Exclude empty muscle groups
          };
        }).filter(Boolean), // Remove null muscle groups
      };
  
      // Only add the new day entry if it has valid muscles
      if (newDayEntry.muscles.length === 0) {
        openSnackbar({ severity: "warning", message: "At least one valid muscle group must be provided." });
        return prevDetails;
      }
  
      const updatedDetails = [...prevDetails, newDayEntry];
      openSnackbar({ severity: "success", message: "Plan added successfully!" });
      localStorage.setItem("workout", JSON.stringify(updatedDetails));
      return updatedDetails;
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
                  <TextField {...params} sx={{ color: "white" }} label={`Muscle Group ${index + 1}`} />
                )}
                value={muscleGroup.value}
                onChange={(e, newValue) => handleMuscleGroupChange(index, newValue)}
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
        <Box sx={{ position: "absolute", bottom: 16, right: 16 }}>
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
      <Snackbar open={snackState.open} autoHideDuration={6000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={closeSnackbar} severity={snackState.severity} variant="filled" sx={{ width: '100%' }}>
          {snackState.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Schedule;
