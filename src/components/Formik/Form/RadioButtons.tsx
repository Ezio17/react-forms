import React from 'react'
import { useField, FieldAttributes } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  radioButton: {
    height: '22px',
    marginTop: '5px'
  },
}));

type RadioButtonType = {
  label: string
} & FieldAttributes<{}>

const RadioButtons: React.FC<RadioButtonType> = ({ label, ...props }) => {
  const classes = useStyles();

  const [field, meta, helpers] = useField(props);

  return <FormControlLabel className={classes.radioButton} {...field} label={label} control={<Radio />} />
}

export default RadioButtons