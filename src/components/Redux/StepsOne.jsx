import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';

import { setTest } from '../../store/actions/test'
import InputFile from './InputFile'
import RadioButton from './RadioButton'
import StepsButton from './StepsButton'

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%'
  },
  radioLabel: {
    marginTop: '17px',
  },
}));

const validate = values => {
  const errors = {}

  if (!values.firstName) {
    errors.firstName = 'First Name is a required field'
  } else if (values.firstName.length === 1) {
    errors.firstName = 'First Name must be at least 2 characters'
  }

  if (!values.lastName) {
    errors.lastName = 'Last Name is a required field'
  } else if (values.lastName.length === 1) {
    errors.lastName = 'First Name must be at least 2 characters'
  }

  if (!values.password) {
    errors.password = 'Password is a required field'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = 'Password confirm is required'
  } else if (values.repeatPassword !== values.password) {
    errors.repeatPassword = 'Password mismatch'
  }

  if (!values.gender) {
    errors.gender = 'Gender is a required field'
  }

  return errors
}

const StepsOne = ({ steps, nextSteps, prevSteps, handleSubmit, pristine, invalid, ...props }) => {
  const classes = useStyles();

  const RadioButtonValues = ['female', 'male', 'other']

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Field name='firstName' component={InputFile} type='text' label='First Name' />
      <Field name='lastName' component={InputFile} label='Last Name' type='text' />
      <Field name='password' component={InputFile} label='Password' type='password' />
      <Field name='repeatPassword' component={InputFile} label='Repeat Password' type='password' />
      <FormLabel className={classes.radioLabel} component="legend">Gender</FormLabel>
      <Field name="gender" component={RadioButton} values={RadioButtonValues}></Field>
      <StepsButton prevSteps={prevSteps} steps={steps} />
    </form>
  )
}

let StepsOneForm = reduxForm({
  form: 'stepOne',
  validate,
})(StepsOne)

const mapStateToProps = state => ({
  test: state.test.test,
})

const mapDispatchToProps = dispatch => ({
  setTest: () => dispatch(setTest())
})

export default connect(mapStateToProps, mapDispatchToProps)(StepsOneForm)