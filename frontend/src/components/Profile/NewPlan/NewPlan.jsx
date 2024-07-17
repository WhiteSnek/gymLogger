import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Typography, Modal, Box } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Schedule from "./Schedule";
import Review from "./Review/Review";
import axios from "axios";

const Day = ({ day, setDetails }) => {

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
            setDetails={setDetails}
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
  const [name,setName] = useState('');
  console.log(details)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addPlan = async () => {
   try {
     const response = await axios.post('/users/plan',{planName:name,planData:details},{withCredentials:true});
     console.log(response)
   } catch (error) {
    console.log(error)
   } finally {
    handleClose();
   }
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'white',
    maxHeight: '80%',
  overflowY: 'auto',
  };
  
  return (
    <div className="flex gap-4 flex-col p-4">
      {days.map((day, idx) => (
        <Day
          key={idx}
          day={day}
          setDetails={setDetails}
        />
      ))}
      <div className="flex justify-end pb-10">
        <button onClick={handleOpen} className="w-1/4 bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5">
          Create Plan
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Review Plan
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Review days={days} details={details} setName={setName} addPlan={addPlan}/>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default NewPlan;
