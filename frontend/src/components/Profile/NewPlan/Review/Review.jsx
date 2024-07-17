import React, { useState } from "react";
import { Tab, Tabs, Box, Button, Divider, Typography, Modal, TextField, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; // Import the Close icon
import Details from "./Details"; // Adjust the import path as necessary

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: 'white'
};

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const Review = ({ days, details, setName, addPlan }) => {
  const [value, setValue] = useState(0);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          {days.map((day, idx) => (
            <Tab label={day} key={idx} />
          ))}
        </Tabs>
      </Box>
      {details.map((detail, index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          <Details detail={detail} />
        </CustomTabPanel>
      ))}
      <Divider>
        <Typography variant="h6">Everything correct?</Typography>
      </Divider>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'end', marginTop: 2 }}>
        <Button variant="contained" color="success" onClick={handleOpen}>Yes</Button>
        <Button variant="contained" color="error">No</Button>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ alignSelf: 'flex-end' }}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography id="child-modal-title" variant="h6" component="h2" gutterBottom>
            Name your plan
          </Typography>
          <TextField id="outlined-basic" label="Plan Name" variant="outlined" fullWidth onChange={(e)=>setName(e.target.value)} />
          <Box sx={{ marginTop: 2, display: "flex", justifyContent: "space-between", width: '100%' }}>
            <button onClick={addPlan} className="w-full bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5">
              Create Plan
            </button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default Review;
