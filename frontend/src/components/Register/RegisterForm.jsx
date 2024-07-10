import React,{useState} from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box,Typography,Button } from '@mui/material';

import { QontoConnector } from '../../utils/QontoConnector';
import QontoStepIcon from '../../utils/QontoConnector';

import { makeStyles } from '@mui/styles';
import FormPage1 from './FormPage1';
import FormPage2 from './FormPage2';
import FormPage3 from './FormPage3';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  stepLabel: {
    '& .MuiStepLabel-label': {
      color: 'white !important',
    },
    '& .MuiStepLabel-alternativeLabel': {
      color: 'white !important',
    },
    '& .MuiStepLabel-completed': {
      color: 'white !important',
    },
    '& .MuiStepLabel-active': {
      color: 'white !important',
    },
  },
  optionalText: {
    color: 'white',
  },
});


const steps = ['Basic Details', 'Additional Details', 'Avatar'];

export default function RegisterForm() {
    const [activeStep, setActiveStep] = useState(0);
    const [manualLogin,setManualLogin] = useState(false)
    const [details,setDetails] = useState({
        email: '',
        password: '',
        googleId: '',
        name: '',
        username: '',
        age: '',
        gender: '',
        weight: '',
        avatar: '',
        avatarUrl: '',
        googleImg: ''
    })

    const navigate = useNavigate()
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    console.log(details)
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const register = async () => {
    const formData = new FormData();
    formData.append('email', details.email);
    formData.append('password', details.password);
    formData.append('googleId', details.googleId);
    formData.append('name', details.name);
    formData.append('username', details.username);
    formData.append('age', details.age);
    formData.append('gender', details.gender);
    formData.append('weight', details.weight);
    formData.append('avatar', details.avatar);
    formData.append('googleImg', details.googleImg);
    console.log(formData)
    try {
        const response = await axios.post('/users/register',formData,{withCredentials:true});
        console.log(response)
        navigate('/')
    } catch (error) {
        console.log(error)
    }

  }

  const classes = useStyles();
  return (
    
    <div className='text-red-500 px-4'>
        <h1 className='text-4xl font-bold text-center mb-10'>Register to GymLogger</h1>
      <Stepper alternativeLabel activeStep={activeStep} connector={<QontoConnector />}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel StepIconComponent={QontoStepIcon} className={classes.stepLabel} {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && (<FormPage1 handleNext={handleNext} setManualLogin={setManualLogin} details={details} setDetails={setDetails} />)}
          {activeStep === 1 && (<FormPage2 handleNext={handleNext} manualLogin={manualLogin} details={details} setDetails={setDetails} />)}
          {activeStep === 2 && (<FormPage3 register={register} details={details} setDetails={setDetails} />)}
        </React.Fragment>
      )}
    </div>
  );
}
