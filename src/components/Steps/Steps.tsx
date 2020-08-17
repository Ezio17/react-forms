import React from 'react'
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles((theme) => ({
  stepsWrapper: {
    display: 'flex',
    marginBottom: '10px'
  },
  stepsDone: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.secondary.light,
    boxSizing: 'border-box',
    color: 'white'
  },
  stepsActive: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.grey[300],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'white'
  },
  stepsFuture: {
    width: 30,
    height: 30,
    borderRadius: '50%',
    background: theme.palette.grey[500],
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    color: 'white'
  },
  futureLine: {
    borderTop: `2px solid ${theme.palette.grey[500]}`,
    width: '40px',
    marginTop: '14px'
  },
  doneLine: {
    borderTop: `2px solid ${theme.palette.secondary.light}`,
    width: '40px',
    marginTop: '14px'
  }
}))

interface ISteps {
  steps: number
}

const Steps: React.FC<ISteps> = ({ steps }) => {
  const classes = useStyle();

  return (
    <Box className={classes.stepsWrapper}>
      <Box className={steps === 1 ? classes.stepsActive : classes.stepsDone}>1</Box>
      <span className={steps === 1 ? classes.futureLine : classes.doneLine}></span>
      <Box className={steps === 2 ? classes.stepsActive : steps > 2 ? classes.stepsDone : classes.stepsFuture}>2</Box>
      <span className={steps > 2 ? classes.doneLine : classes.futureLine}></span>
      <Box className={steps === 3 ? classes.stepsActive : steps > 3 ? classes.stepsDone : classes.stepsFuture}>3</Box>
      <span className={steps > 3 ? classes.doneLine : classes.futureLine}></span>
      <Box className={steps === 4 ? classes.stepsActive : steps > 4 ? classes.stepsDone : classes.stepsFuture}>4</Box>
    </Box>
  )
}

export default Steps