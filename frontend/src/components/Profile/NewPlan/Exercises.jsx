import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Autocomplete,
  IconButton,
  Button,
  Divider
} from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Sets from "./Sets";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    white: {
      main: "#ffffff"
    }
  },
});

const ParticularMuscleExercise = ({ muscle, muscleIndex, setMuscleExercises }) => {
  const [exercises, setExercises] = useState([]);
  const [exerciseGroups, setExerciseGroups] = useState([{ value: "", sets: [] }]);
  const [setDetails, setSetDetails] = useState({ reps: '', weight: '' });

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const muscleResponse = await axios.get(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscle.toLowerCase()}`,
          {
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
              "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
            },
            params: { limit: "1000" },
          }
        );

        if (muscleResponse.data.length > 0) {
          setExercises(muscleResponse.data.map((data) => data.name));
          return;
        }
      } catch (error) {
        console.error("Error fetching muscle exercises:", error);
      }

      try {
        const targetResponse = await axios.get(
          `https://exercisedb.p.rapidapi.com/exercises/target/${muscle.toLowerCase()}`,
          {
            headers: {
              "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
              "x-rapidapi-host": import.meta.env.VITE_RAPID_API_HOST,
            },
            params: { limit: "1000" },
          }
        );

        if (targetResponse.data.length > 0) {
          setExercises(targetResponse.data.map((data) => data.name));
          return;
        }
      } catch (error) {
        console.error("Error fetching target exercises:", error);
      }

      console.error("Both API calls failed to fetch exercises.");
      setExercises([]);
    };

    fetchExercises();
  }, [muscle]);

  const addExerciseGroup = () => {
    if (exerciseGroups.length < 10) {
      setExerciseGroups([...exerciseGroups, { value: "", sets: [] }]);
    }
  };

  const removeExerciseGroup = (index) => {
    setExerciseGroups(exerciseGroups.filter((_, i) => i !== index));
  };

  const handleExerciseGroupChange = (index, newValue) => {
    const updatedExerciseGroups = exerciseGroups.map((exerciseGroup, i) =>
      i === index ? { ...exerciseGroup, value: newValue } : exerciseGroup
    );
    setExerciseGroups(updatedExerciseGroups);
    setMuscleExercises(updatedExerciseGroups);
  };

  const addExerciseSet = (index) => {
    const updatedExerciseGroups = exerciseGroups.map((exerciseGroup, i) =>
      i === index ? { ...exerciseGroup, sets: [...exerciseGroup.sets, setDetails] } : exerciseGroup
    );
    setExerciseGroups(updatedExerciseGroups);
    setMuscleExercises(updatedExerciseGroups);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography sx={{ fontSize: "1.2rem", mb: 2 }}>{muscle}</Typography>
      {exerciseGroups.map((exerciseGroup, index) => (
        <Stack key={index} direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Autocomplete
            disablePortal
            id={`combo-box-exercise-${index}`}
            options={exercises}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label={`Exercises for ${muscle}`} />
            )}
            value={exerciseGroup.value}
            onChange={(e, newValue) => handleExerciseGroupChange(index, newValue)}
          />
          <IconButton color="secondary" onClick={() => removeExerciseGroup(index)}>
            <RemoveCircleOutline fontSize="large" />
          </IconButton>
          <Stack divider={<Divider orientation="vertical" flexItem />} direction="row" spacing={2}>
            {exerciseGroup.sets.map((_, setIndex) => (
              <Sets key={setIndex} setIndex={setIndex} muscleIndex={muscleIndex} setSetDetails={setSetDetails} setDetails={setDetails}/>
            ))}
          </Stack>
          <Stack>
            <Button onClick={() => addExerciseSet(index)}>Add Set</Button>
          </Stack>
        </Stack>
      ))}
      {exerciseGroups.length < 10 && (
        <Stack direction="row" alignItems="center">
          <Button color="white" onClick={addExerciseGroup} startIcon={<AddCircleOutline />}>
            Add Exercise
          </Button>
        </Stack>
      )}
    </Box>
  );
};

const Exercises = ({ selectedMuscles, setMuscleExercises }) => {
  const [adjustedMuscles, setAdjustedMuscles] = useState(selectedMuscles);

  useEffect(() => {
    const updatedMuscles = selectedMuscles.flatMap((muscle) => {
      if (muscle === "Legs") {
        return ["Upper Legs", "Lower Legs"];
      }
      return muscle;
    });
    setAdjustedMuscles(updatedMuscles);
  }, [selectedMuscles]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ mt: 4, pY: 4, borderRadius: 2, color: "white" }}>
        <Typography sx={{ fontSize: "1rem", mb: 4 }}>
          Select Exercises for Each Muscle Group
        </Typography>
        {adjustedMuscles.map((muscle, index) => (
          <ParticularMuscleExercise
            key={index}
            muscle={muscle}
            muscleIndex={index}
            setMuscleExercises={setMuscleExercises}
          />
        ))}
      </Box>
    </ThemeProvider>
  );
};

export default Exercises;
