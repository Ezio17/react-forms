import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText';

import './hocStyle.css';

const HocCountryDropdown = (Component) => function (props) {
  const { input, meta: { touched, error } } = props;

  return (
    <>
      <Component className='address' value={input.value} onChange={input.onChange} />
      <FormHelperText style={{ position: 'absolute' }} error>{touched && error}</FormHelperText>
    </>
  )
}

export default HocCountryDropdown