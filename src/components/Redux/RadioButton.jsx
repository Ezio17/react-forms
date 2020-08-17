import React from 'react'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  radioButton: {
    height: '22px',
    marginTop: '5px'
  },
}));

const RadioButton = ({ input, values, meta: { touched, error }, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <RadioGroup {...input} {...rest}>
        {values.map(value => (
          <FormControlLabel className={classes.radioButton} key={value} value={value} control={<Radio />} label={value.charAt(0).toUpperCase() + value.slice(1)} />
        ))}
      </RadioGroup>
      <FormHelperText style={{ position: 'absolute' }} error>{touched && error}</FormHelperText>
    </>
  )
}

export default RadioButton