import React, { useState } from 'react';
import { IconContext } from 'react-icons';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Schedule from './Schedule';


const Day = ({ day }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: 'white'}} />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{backgroundColor: "#212120", color: "white", paddingX: 4,paddingY: 2}}
        >
          <Typography sx={{fontSize: '1.125rem', fontWeight: 800}}>{day}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{backgroundColor: '#3d3d3b'}}>
          <Schedule />
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
  return (
    <div className='flex gap-4 flex-col'>
      {days.map((day, idx) => (
        <Day key={idx} day={day} />
      ))}
      <div className='flex justify-end pb-10'>
      <button className="w-1/4 bg-red-700 px-4 py-2 text-lg mt-4 text-white shadow-xl btn-5">Create Plan</button>
      </div>
    </div>
  );
};

export default NewPlan;
