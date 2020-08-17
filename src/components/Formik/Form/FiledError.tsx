import React from 'react'
import { FieldAttributes, useField } from 'formik';
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

type TFieldError = {
  label: string,
  type?: string,
} & FieldAttributes<{}>

const FiledError: React.FC<TFieldError> = ({ label, type = 'text', ...props }) => {
  const classes = useStyles(props);

  const [field, meta] = useField(props);

  const error = meta.error && meta.touched && meta.error

  return (
    <TextField
      label={label}
      type={type}
      error={!!error}
      helperText={error}
      className={classes.input}
      {...field}
    />
  )
}

export default FiledError