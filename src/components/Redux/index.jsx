import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Steps from '../Steps/Steps'
import StepsOne from './StepsOne'
import StepsTwo from './StepsTwo'
import StepsThree from './StepsThree'
import StepsFour from '../Formik/Form/StepsFour'

const useStyle = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  card: {
    width: '350px',
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    alignItems: 'center',
    fontSize: '16px',
    marginTop: '30px',
    marginBottom: '30px'
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.secondary.main,
    fontWeight: 'bold'
  },
}))

const Redux = () => {
  const [steps, setSteps] = useState(1);
  const [values, setValues] = useState({
    one: {
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      gender: '',
    },
    two: {
      email: '',
      mobile: '',
      country: '',
      city: ''
    },
    three: {
      img: ''
    }
  })

  const classes = useStyle();

  const prevSteps = () => setSteps((prevState) => prevState - 1);

  const nextSteps = () => setSteps((prevState) => prevState + 1);

  const submitStepOne = values => {
    nextSteps()
    setValues(prevState => ({
      ...prevState,
      one: values
    }))
  }

  const submitStepTwo = values => {
    nextSteps()
    setValues(prevState => ({
      ...prevState,
      two: values
    }))
  }

  const submitStepThree = values => {
    nextSteps()
    setValues(prevState => ({
      ...prevState,
      three: values
    }))
  }

  const submitStepFour = () => {
    setValues({
      one: {
        firstName: '',
        lastName: '',
        password: '',
        repeatPassword: '',
        gender: '',
      },
      two: {
        email: '',
        mobile: '',
        country: '',
        city: ''
      },
      three: {
        img: ''
      }
    });
    setSteps(1);
  }

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Typography className={classes.title} variant="h5">Redux Form</Typography>
        <Steps steps={steps} />
        {steps === 1 && (
          <StepsOne initialValues={values.one} onSubmit={submitStepOne} values={values} steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
        {steps === 2 && (
          <StepsTwo initialValues={values.two} onSubmit={submitStepTwo} steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
        {steps === 3 && (
          <StepsThree initialValues={values.three} onSubmit={submitStepThree} steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
        {steps === 4 && (
          <StepsFour values={values} steps={steps} prevSteps={prevSteps} nextSteps={submitStepFour} />
        )}
      </Card>
    </div>
  )
}

export default Redux

