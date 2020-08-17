import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';

import './hocStyle.css'

const HocCityDropdown = (Component) => function (props) {
  const { input, meta: { touched, error }, country } = props;
  
  return (
    <>
      <Component className='address' country={country} value={input.value} onChange={input.onChange} />
      <FormHelperText style={{ position: 'absolute' }} error>{touched && error}</FormHelperText>
    </>
  )
}

export default HocCityDropdown