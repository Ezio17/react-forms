import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import FormHelperText from '@material-ui/core/FormHelperText';

import FieldError from './FiledError'
import StepsButtons from '../../Steps/StepsButtons'
import { IStepsButtons } from '../../../interface/index'

const useStyles = makeStyles((theme) => ({
  address: {
    width: '100%',
    height: '25px',
    marginTop: '25px'
  }
}));

const phoneRegExp = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

const validationSchema = yup.object({
  email: yup
    .string()
    .required('Email is a required field')
    .email('Email must be a valid email'),
  mobile: yup
    .string()
    .required('Mobile is a required field')
    .matches(phoneRegExp, 'Phone number is not valid'),
  country: yup
    .string()
    .required('Country is a required field'),
  city: yup
    .string()
    .required('City is a required field')
});

interface IProps {
  values: {
    one: {
      firstName: string
      lastName: string
      password: string
      repeatPassword: string
      gender: string
    },
    two: {
      email: string
      mobile: string
      country: string
      city: string
    },
    three: {
      img: string
    }
  }
}

interface IStepsTwo extends IStepsButtons, IProps { }

const StepsTwo: React.FC<IStepsTwo> = ({ steps, values: { two }, setValuesStep, nextSteps, prevSteps, ...props }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={two}
      onSubmit={(values) => {
        if (nextSteps && setValuesStep) {
          setValuesStep('two', values)
          nextSteps()
        }
      }}
      validationSchema={validationSchema}
    >
      {({ values, setFieldValue, errors, touched }) => {
        const changeAddres = (value: string, name: string): void => {
          if (name === 'country' && value === '') {
            setFieldValue('city', '');
          }

          setFieldValue(name, value)
        }

        return (
          <Form>
            <FieldError name='email' type='email' label='Email' />
            <FieldError name='mobile' type='tel' label='Mobile' />
            <CountryDropdown
              onChange={(val) => changeAddres(val, 'country')}
              value={values.country}
              classes={classes.address}
            />
            <FormHelperText style={{ position: 'absolute' }} error>{errors.country && touched.country && errors.country}</FormHelperText>
            <RegionDropdown
              country={values.country}
              onChange={(val) => changeAddres(val, 'city')}
              value={values.city}
              classes={classes.address}
            />
            <FormHelperText style={{ position: 'absolute' }} error>{errors.city && touched.city && errors.city}</FormHelperText>
            <StepsButtons prevSteps={prevSteps} steps={steps} />
          </Form>
        )
      }}
    </Formik>
  )
}

export default StepsTwo
