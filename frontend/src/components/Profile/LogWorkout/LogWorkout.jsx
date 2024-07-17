import React from "react";
import { Box, Button, Typography } from "@mui/material";

const LogWorkout = ({ changeTab }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
        textAlign: "center",
        color: "white",
      }}
    >
      <Typography variant="h6">You don't have any active plans yet</Typography>
      <Button
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "white",
          color: "black",
          "&:hover": { backgroundColor: "lightgray" },
        }}
        onClick={() => changeTab("new plan")}
      >
        Create a plan
      </Button>
    </Box>
  );
};

export default LogWorkout;
