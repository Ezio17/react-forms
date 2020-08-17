import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyle = makeStyles(theme => ({
  buttonWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px',

    '& > button': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      height: '30px'
    }
  }
}))

const StepsButton = ({ steps, prevSteps, nextSteps }) => {
  const classes = useStyle();

  return (
    <Box className={classes.buttonWrapper}>
      <Button disabled={steps === 1} onClick={prevSteps} variant="outlined" color="primary">
        Previous
      </Button>
      <Button component='button' type="submit" variant="outlined" color="primary">
        {steps === 4 ? 'Load' : 'Next'}
      </Button>
    </Box >
  )
}

export default StepsButton
