import React, { useEffect } from 'react'
import { Field, reduxForm, formValueSelector, change } from 'redux-form'
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { connect } from 'react-redux'

import StepsButton from './StepsButton'
import InputFile from './InputFile'
import HocCountryDropdown from '../../hoc/HocCountryDropdown'
import HocCityDropdown from '../../hoc/HocCityDropdown'

const validate = values => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Email is a required field'
  } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
    errors.email = 'Email must be a valid email'
  }

  if (!values.mobile) {
    errors.mobile = 'Phone Number is a required field'
  } else if (!/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/.test(values.mobile)) {
    errors.mobile = 'Phone number is not valid'
  }

  if (!values.country) {
    errors.country = 'Country is a required field'
  }

  if (!values.city) {
    errors.city = 'City is a required field'
  }

  return errors
}

const countryComponent = HocCountryDropdown(CountryDropdown);
const cityComponent = HocCityDropdown(RegionDropdown);

const StepsTwo = ({ steps, nextSteps, prevSteps, handleSubmit, country, handleChange, value, onChange, errors, pristine, invalid, changeFieldValue, ...props }) => {
  useEffect(() => {
    if (country === '') {
      changeFieldValue('city', '');
    }
  }, [country, changeFieldValue])

  return (
    <form onSubmit={handleSubmit}>
      <Field name='email' component={InputFile} type='text' label='Email' />
      <Field name='mobile' component={InputFile} type='text' label='Phone Number' />
      <Field name='country' component={countryComponent} type='text' label='Country' />
      <Field name='city' country={country} component={cityComponent} type='text' label='City' />
      <StepsButton nextSteps={nextSteps} prevSteps={prevSteps} steps={steps} />
    </form>
  )
}

const ReduxFormSetpsTwo = reduxForm({
  form: 'stepTwo',
  validate
})(StepsTwo)

const selector = formValueSelector('stepTwo')

export default connect(state => {
  const country = selector(state, 'country')

  return {
    country
  }
},
  (dispatch => {
    return {
      changeFieldValue: function (field, value) {
        dispatch(change('stepTwo', field, value))
      }
    }
  })
)(ReduxFormSetpsTwo)

