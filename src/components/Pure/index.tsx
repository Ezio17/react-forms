import React, { useState, useEffect } from 'react'
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

const Pure: React.FC = () => {
  const classes = useStyle()

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
  });
  const [img, setImg] = useState('');

  const prevSteps = (): void => setSteps(prevSteps => prevSteps - 1);

  const nextSteps = (): void => {
    if (steps === 4) {
      localStorage.clear();
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

  const handleSetImg = (img: any): void => setImg(img);

  useEffect(() => {
    if (steps === 4) {
      let oneStepsValues = localStorage.getItem('pureStepOne');
      let twoStepsValues = localStorage.getItem('pureStepTwo');

      if (oneStepsValues !== null && twoStepsValues !== null) {
        let stepOneObjectData = JSON.parse(oneStepsValues);
        let stpeTwoObjectData = JSON.parse(twoStepsValues);
        setValues({
          one: stepOneObjectData.values,
          two: stpeTwoObjectData.values,
          three: {
            img
          }
        })
      }
    }
  }, [steps])

  console.log(values)

  return (
    <div className={classes.wrapper}>
      <Card className={classes.card}>
        <Typography className={classes.title} variant="h5">Pure React</Typography>
        <Steps steps={steps} />
        {steps === 1 && (
          <StepsOne steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
        {steps === 2 && (
          <StepsTwo steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
        {steps === 3 && (
          <StepsThree img={img} handleSetImg={handleSetImg} steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
        {steps === 4 && (
          <StepsFour values={values} steps={steps} prevSteps={prevSteps} nextSteps={nextSteps} />
        )}
      </Card>
    </div>
  )
}

export default Pure