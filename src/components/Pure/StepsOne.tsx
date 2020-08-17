import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import { IStepsButtons, IValuesSteps } from '../../interface/index'
import StepsButtons from './StepsButtons'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%'
  },
  input: {
    width: '100%',
    height: '30px',
    marginBottom: '30px',

    '& label': {
      fontSize: '12px'
    }
  },
  radioButton: {
    height: '22px',
    marginTop: '5px'
  },
  radioLabel: {
    marginTop: '17px',
  },
}));

interface IValues {
  values: IValuesSteps,
  errors: IValuesSteps,
  blur: {
    firstName: boolean
    lastName: boolean
    password: boolean
    repeatPassword: boolean
    gender: boolean
  }
}

const StepsOne: React.FC<IStepsButtons> = ({ prevSteps, nextSteps, steps, ...props }) => {
  const classes = useStyles();

  const [values, setValues] = useState<IValues>({
    values: {
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      gender: ''
    },
    errors: {
      firstName: '',
      lastName: '',
      password: '',
      repeatPassword: '',
      gender: ''
    },
    blur: {
      firstName: false,
      lastName: false,
      password: false,
      repeatPassword: false,
      gender: false
    }
  })

  useEffect(() => {
    let initialValues = localStorage.getItem('pureStepOne');

    if (initialValues === null) {
      return setValues({
        values: {
          firstName: '',
          lastName: '',
          password: '',
          repeatPassword: '',
          gender: ''
        },
        errors: {
          firstName: '',
          lastName: '',
          password: '',
          repeatPassword: '',
          gender: ''
        },
        blur: {
          firstName: false,
          lastName: false,
          password: false,
          repeatPassword: false,
          gender: false
        }
      })
    } else {
      return setValues(JSON.parse(initialValues));
    };
  }, [])

  const validationFile = (name: string, value: string): boolean => {
    let isError = false;

    switch (name) {
      case 'firstName': {
        let error = '';
        if (value.length === 0) {
          error = 'First Name is a required field'
          isError = true;
        } else if (value.length === 1) {
          error = 'First Name must be at least 2 characters'
          isError = true;
        }
        setValues(prevValues => (
          {
            ...prevValues,
            errors: {
              ...prevValues.errors,
              [name]: error
            }
          }
        ))
      }
        break;

      case 'lastName': {
        let error = '';
        if (value.length === 0) {
          error = 'Last Name is a required field'
          isError = true;
        } else if (value.length === 1) {
          error = 'Last Name must be at least 2 characters'
          isError = true;
        }
        setValues(prevValues => (
          {
            ...prevValues,
            errors: {
              ...prevValues.errors,
              [name]: error
            }
          }
        ))
      }
        break;

      case 'password': {
        let error = ''
        if (value.length === 0) {
          error = 'Password is a required field'
          isError = true;
        } else if (value.length < 6) {
          error = 'Password must be at least 6 characters'
          isError = true;
        }

        setValues(prevValues => (
          {
            ...prevValues,
            errors: {
              ...prevValues.errors,
              [name]: error
            }
          }
        ))
      }
        break;

      case 'repeatPassword': {
        let error = '';

        if (value.length === 0) {
          error = 'Password is a required'
          isError = true;
        } else if (value !== values.values.password) {
          error = 'Password mismatch'
          isError = true;
        }

        setValues(prevValues => (
          {
            ...prevValues,
            errors: {
              ...prevValues.errors,
              [name]: error
            }
          }
        ))
      }
        break;

      case 'gender': {
        let error = '';

        if (value.length === 0) {
          error = 'Gender is a required'
          isError = true;
        }

        setValues(prevValues => (
          {
            ...prevValues,
            errors: {
              ...prevValues.errors,
              [name]: error
            }
          }
        ))
      }
        break;

      default: {
        return isError;
      }
    }

    return isError;
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();
    let isError = false;

    let validationValuesArray = Object.entries(values.values);
    for (let item of validationValuesArray) {
      let valid = validationFile(...item);

      if (valid) {
        isError = true;
      }

    }

    setValues(prevVal => ({
      ...prevVal,
      blur: {
        firstName: true,
        lastName: true,
        password: true,
        repeatPassword: true,
        gender: true
      }
    }))

    if (!isError && nextSteps) {
      nextSteps();
      localStorage.setItem('pureStepOne', JSON.stringify(values));
    }
  }

  const handleOnChangeValues = (event: any): void => {
    event.persist();

    validationFile(event.target.name, event.target.value);

    setValues(prevValues => (
      {
        ...prevValues,
        values: {
          ...prevValues.values,
          [event.target.name]: event.target.value
        }
      }
    ));
  }

  const handleBlurValues = (event: any): void => {
    const value = event.target.value.trim();

    event.persist();

    setValues(prevValues => (
      {
        ...prevValues,
        blur: {
          ...prevValues.blur,
          [event.target.name]: true
        }
      }
    ))

    validationFile(event.target.name, value)
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        onChange={handleOnChangeValues}
        value={values.values.firstName}
        name='firstName'
        className={classes.input}
        label="First Name"
        onBlur={handleBlurValues}
        helperText={values.errors.firstName}
        error={!!(values.errors.firstName && values.blur.firstName)}
      />
      <TextField
        onChange={handleOnChangeValues}
        value={values.values.lastName}
        name='lastName'
        className={classes.input}
        label="Last Name"
        onBlur={handleBlurValues}
        helperText={values.errors.lastName}
        error={!!(values.errors.lastName && values.blur.lastName)}
      />
      <TextField
        onChange={handleOnChangeValues}
        value={values.values.password}
        name='password'
        className={classes.input}
        label="Password"
        type='password'
        onBlur={handleBlurValues}
        helperText={values.errors.password}
        error={!!(values.errors.password && values.blur.password)}
      />
      <TextField
        onChange={handleOnChangeValues}
        value={values.values.repeatPassword}
        name='repeatPassword'
        className={classes.input}
        label="Repeat Password"
        type='password'
        onBlur={handleBlurValues}
        helperText={values.errors.repeatPassword}
        error={!!(values.errors.repeatPassword && values.blur.repeatPassword)}
      />
      <FormLabel className={classes.radioLabel} component="legend">Gender</FormLabel>
      <RadioGroup onBlur={handleBlurValues} onChange={handleOnChangeValues} value={values.values.gender} name='gender' aria-label="gender">
        <FormControlLabel className={classes.radioButton} value="female" control={<Radio />} label="Female" />
        <FormControlLabel className={classes.radioButton} value="male" control={<Radio />} label="Male" />
        <FormControlLabel className={classes.radioButton} value="other" control={<Radio />} label="Other" />
      </RadioGroup>
      <FormHelperText style={{ position: 'absolute' }} error>{values.errors.gender && values.blur.gender && values.errors.gender}</FormHelperText>
      <StepsButtons nextSteps={nextSteps} prevSteps={prevSteps} steps={steps} />
    </form>
  )
}

export default StepsOne