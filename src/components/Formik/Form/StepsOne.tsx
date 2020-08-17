import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormLabel from '@material-ui/core/FormLabel';
import { Formik, Form } from 'formik';
import * as yup from "yup";

import { IStepsButtons } from '../../../interface/index'
import StepsButtons from '../../Steps/StepsButtons'
import RadioButtons from './RadioButtons'
import FieldError from './FiledError'

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    height: '30px',
    marginBottom: '30px',

    '& label': {
      fontSize: '12px'
    }
  },
  radioLabel: {
    marginTop: '17px',
  },
  form: {
    width: '100%'
  }
}));

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is a required field')
    .min(2, 'First Name must be at least 2 characters')
    .trim(),
  lastName: yup
    .string()
    .required('Last Name is a required field')
    .min(2, 'Last Name must be at least 2 characters')
    .trim(),
  password: yup
    .string()
    .required('Password is a required field')
    .min(6, 'Password must be at least 6 characters')
    .max(20)
    .trim(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Password mismatch')
    .required('Password confirm is required')
    .trim(),
  gender: yup
    .string()
    .required('Gender is a required field')
})

interface IInitialValues {
  firstName: string
  lastName: string
  password: string
  repeatPassword: string
  gender: string
}

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

interface IStepsOne extends IStepsButtons, IProps { }

const StepsOne: React.FC<IStepsOne> = ({ steps, setValuesStep, nextSteps, prevSteps, values: { one } }) => {
  const classes = useStyles();

  const initialValues: IInitialValues = {
    firstName: '',
    lastName: '',
    password: '',
    repeatPassword: '',
    gender: '',
  }

  return (
    <Formik
      initialValues={one || initialValues}
      onSubmit={(values) => {
        if (nextSteps && setValuesStep) {
          setValuesStep('one', values)
          nextSteps()
        }
      }}
      validationSchema={validationSchema}
    >
      {({ errors, touched }) => {
        return (
          <Form className={classes.form}>
            <FieldError name='firstName' label='First Name' />
            <FieldError name='lastName' label='Last Name' />
            <FieldError name='password' label='Password' type='password' />
            <FieldError name='repeatPassword' label='Repeat Password' type='password' />
            <FormLabel className={classes.radioLabel} component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1">
              <RadioButtons type='radio' name='gender' value="female" label="Female" />
              <RadioButtons type='radio' name='gender' value="male" label="Male" />
              <RadioButtons type='radio' name='gender' value="other" label="Other" />
            </RadioGroup>
            <FormHelperText style={{ position: 'absolute' }} error>{errors.gender && touched.gender && errors.gender}</FormHelperText>
            <StepsButtons errors={errors} prevSteps={prevSteps} nextSteps={nextSteps} steps={steps} />
          </Form>
        )
      }}
    </Formik>
  )
}

export default StepsOne