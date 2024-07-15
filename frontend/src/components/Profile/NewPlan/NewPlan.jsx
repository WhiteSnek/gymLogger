import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Schedule from "./Schedule";

const Day = ({ day, dayIndex, addMuscle, addExercise, addSet, addDay }) => {

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            backgroundColor: "#212120",
            color: "white",
            paddingX: 4,
            paddingY: 2,
          }}
        >
          <Typography sx={{ fontSize: "1.125rem", fontWeight: 800 }}>
            {day}
          </Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: "#3d3d3b" }}>
          <Schedule
            day={day}
            dayIndex={dayIndex}
            addMuscle={addMuscle}
            addExercise={addExercise}
            addSet={addSet}
            addDay={addDay}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

const NewPlan = () => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  const [details, setDetails] = useState([]);

  // Function to add a new day
  const addDay = (newDay) => {
    const newEntry = {
      day: newDay,
      muscles: [],
    };
    setDetails([...details, newEntry]);
  };
  console.log(details)
  localStorage.setItem("workout",details)
  // Function to add a muscle
  const addMuscle = (dayIndex, muscleName) => {
    const updatedDetails = [...details];
    updatedDetails[dayIndex].muscles.push({ name: muscleName, exercises: [] });
    setDetails(updatedDetails);
  };

  // Function to add an exercise to a specific muscle
  const addExercise = (dayIndex, muscleIndex, exercise) => {
    const updatedDetails = [...details];
    updatedDetails[dayIndex].muscles[muscleIndex].exercises.push({
      exercise
    });
    setDetails(updatedDetails);
  };

  // Function to add a set to a specific exercise
  const addSet = (dayIndex, muscleIndex, exerciseIndex, set) => {
    const updatedDetails = [...details];
    updatedDetails[dayIndex].muscles[muscleIndex].exercises[exerciseIndex].sets.push({
      set
    });
    setDetails(updatedDetails);
  };

  return (
    <div className="flex gap-4 flex-col">
      {days.map((day, idx) => (
        <Day
          key={idx}
          day={day}
          dayIndex={idx} // Pass the index of the day
          addMuscle={addMuscle}
          addExercise={addExercise}
          addSet={addSet}
          addDay={addDay}
        />
      ))}
      <div className="flex justify-end pb-10">
        <button className="w-1/4 bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5">
          Create Plan
        </button>
      </div>
    </div>
  );
};

export default NewPlan;
