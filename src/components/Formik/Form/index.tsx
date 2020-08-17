import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import Steps from '../../Steps/Steps'
import StepsOne from './StepsOne'
import SetpsTwo from './StepsTwo'
import StepsThree from './StepsThree'
import StepsFour from './StepsFour'
import { IValuesSteps } from '../../../interface/index'

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

const FormikForm: React.FC = () => {
  const classes = useStyle();

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

  const setValuesStep = (name: string, values: IValuesSteps): void => {
    setValues((prevState => ({
      ...prevState,
      [name]: values
    })))
  }

  const setNextSteps = (): void => {
    if (steps === 4) {
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
      })
      return setSteps(1);
    }

    setSteps((prevState) => prevState + 1)
  };

  const setPrevSteps = (): void => setSteps((prevState) => prevState - 1);

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Typography className={classes.title} variant="h5">Formik</Typography>
        <Steps steps={steps} />
        {steps === 1 && (
          <StepsOne values={values} setValuesStep={setValuesStep} prevSteps={setPrevSteps} nextSteps={setNextSteps} steps={steps} />
        )}
        {steps === 2 && (
          <SetpsTwo values={values} setValuesStep={setValuesStep} prevSteps={setPrevSteps} nextSteps={setNextSteps} steps={steps} />
        )}
        {steps === 3 && (
          <StepsThree values={values} setValuesStep={setValuesStep} prevSteps={setPrevSteps} nextSteps={setNextSteps} steps={steps} />
        )}
        {steps === 4 && (
          <StepsFour values={values} prevSteps={setPrevSteps} nextSteps={setNextSteps} steps={steps} />
        )}
      </Card>
    </div>
  )
}

export default FormikForm