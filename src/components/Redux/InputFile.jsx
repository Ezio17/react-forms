import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  input: {
    width: '100%',
    height: '30px',
    marginBottom: '30px',

    '& label': {
      fontSize: '12px'
    }
  },
}));

const InputFile = ({
  input,
  meta: { touched, error },
  ...custom
}) => {
  const classes = useStyles();

  return (
    <TextField
      helperText={touched && error}
      error={!!touched && !!error}
      className={classes.input}
      {...input}
      {...custom}
    />
  )
}

export default InputFile