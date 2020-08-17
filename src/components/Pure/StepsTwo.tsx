import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import { IStepsButtons } from '../../interface/index'
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
  address: {
    width: '100%',
    height: '25px',
    marginTop: '25px'
  }
}));

interface IInitialValues {
  values: {
    email: string
    mobile: string
    country: string
    city: string
  },
  errors: {
    email: string
    mobile: string
    country: string
    city: string
  },
  blur: {
    email: boolean
    mobile: boolean
    country: boolean
    city: boolean
  }
}

const StepsTwo: React.FC<IStepsButtons> = ({ steps, prevSteps, nextSteps }) => {
  const classes = useStyles();

  const [values, setValues] = useState<IInitialValues>({
    values: {
      email: '',
      mobile: '',
      country: '',
      city: ''
    },
    errors: {
      email: '',
      mobile: '',
      country: '',
      city: ''
    },
    blur: {
      email: false,
      mobile: false,
      country: false,
      city: false,
    }
  })

  useEffect(() => {
    let initialValues = localStorage.getItem('pureStepTwo');

    if (initialValues === null) {
      return setValues({
        values: {
          email: '',
          mobile: '',
          country: '',
          city: ''
        },
        errors: {
          email: '',
          mobile: '',
          country: '',
          city: ''
        },
        blur: {
          email: false,
          mobile: false,
          country: false,
          city: false,
        }
      })
    } else {
      return setValues(JSON.parse(initialValues));
    };
  }, [])

  const validationValues = (name: string, value: string): boolean => {
    let isError = false;

    switch (name) {
      case 'email': {
        let error = '';
        if (value.length === 0) {
          isError = true;
          error = 'Email is a required field'
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          isError = true;
          error = 'Email must be a valid email'
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

      case 'mobile': {
        let error = ''

        if (value.length === 0) {
          isError = true;
          error = 'Phone number is a required field'
        } else if (!/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(value)) {
          isError = true;
          error = 'Phone number is not valid'
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

      case 'country': {
        let error = ''
        if (value.length === 0) {
          isError = true;
          error = 'Country is a required field';
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

      case 'city': {
        let error = ''
        if (value.length === 0) {
          isError = true;
          error = 'City is a required field';
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
    }

    return isError;
  }

  const handleOnChange = (e: any): void => {
    e.persist();

    setValues(prevValues => ({
      ...prevValues,
      values: {
        ...prevValues.values,
        [e.target.name]: e.target.value
      }
    }));

    validationValues(e.target.name, e.target.value.trim());
  }

  const handleOnChangeAddress = (name: string, value: string): void => {
    if (name === 'country' && value === '') {
      setValues(prevValues => ({
        ...prevValues,
        values: {
          ...prevValues.values,
          city: ''
        }
      }));
    }

    setValues(prevValues => ({
      ...prevValues,
      values: {
        ...prevValues.values,
        [name]: value
      }
    }));

    validationValues(name, value.trim());
  };

  const handleBlur = (e: any): void => {
    e.persist();

    setValues(prevValues => ({
      ...prevValues,
      blur: {
        ...prevValues.blur,
        [e.target.name]: true
      }
    }));

    validationValues(e.target.name, e.target.value.trim());
  }

  const handleBlurAddress = (name: string): void => {
    setValues(prevValues => ({
      ...prevValues,
      blur: {
        ...prevValues.blur,
        [name]: true
      }
    }));

    validationValues('country', values.values.country);
  }

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    let isValidation = false;

    let entriesValues = Object.entries(values.values);

    for (let value of entriesValues) {
      const valid = validationValues(...value);

      if (valid) {
        isValidation = true;
      }
    }

    setValues(prevVal => ({
      ...prevVal,
      blur: {
        email: true,
        mobile: true,
        country: true,
        city: true,
      }
    }))

    if (!isValidation && nextSteps) {
      nextSteps();
      localStorage.setItem('pureStepTwo', JSON.stringify(values));
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <TextField
        label="Email"
        type='email'
        name='email'
        value={values.values.email}
        onChange={handleOnChange}
        className={classes.input}
        onBlur={handleBlur}
        helperText={values.errors.email}
        error={!!(values.errors.email && values.blur.email)}
      />
      <TextField
        label="Phone Number"
        type="tel"
        name='mobile'
        value={values.values.mobile}
        onChange={handleOnChange}
        className={classes.input}
        onBlur={handleBlur}
        helperText={values.errors.mobile}
        error={!!(values.errors.mobile && values.blur.mobile)}
      />
      <CountryDropdown
        value={values.values.country}
        classes={classes.address}
        name='country'
        onChange={(val) => handleOnChangeAddress('country', val)}
        onBlur={() => handleBlurAddress('country')}
      />
      <FormHelperText style={{ position: 'absolute' }} error>{values.errors.country && values.blur.country && values.errors.country}</FormHelperText>
      <RegionDropdown
        country={values.values.country}
        onChange={(val) => handleOnChangeAddress('city', val)}
        value={values.values.city}
        classes={classes.address}
      />
      <FormHelperText style={{ position: 'absolute' }} error>{values.errors.city && values.blur.city && values.errors.city}</FormHelperText>
      <StepsButtons nextSteps={nextSteps} prevSteps={prevSteps} steps={steps} />
    </form>
  )
}

export default StepsTwo