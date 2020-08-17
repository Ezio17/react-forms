import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { IStepsButtons } from '../../../interface/index'
import StepsButtons from '../../Steps/StepsButtons'

const useStyle = makeStyles(theme => ({
  avatar: {
    width: '150px',
    height: '150px',
    marginTop: '15px'
  },
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatarWrapper: {
    width: '100%',
    minHeight: '200px',
    background: theme.palette.primary.main,
    paddingLeft: '15px',
    paddingRight: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapperInfo: {
    minWidth: '150px',
    display: 'flex',
    justifyContent: 'center'
  },
  firstName: {
    marginRight: '6px',
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    fontSize: '22px'
  },
  lastName: {
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    fontSize: '22px'
  },
  infoWrapper: {

  },
  label: {
    color: theme.palette.grey[600],
  },
  answer: {
    fontSize: '18px',
    marginLeft: '10px',
    color: theme.palette.secondary.main
  },
  blockWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '30px'
  }
}))

interface IProps {
  values: {
    one: {
      firstName: string
      lastName: string
      password: string
      repeatPassword: string
      gender: string
    },
    two: {
      email: string
      mobile: string
      country: string
      city: string
    },
    three: {
      img: string
    }
  }
}

interface IStepsFour extends IStepsButtons, IProps { }

const StepsFour: React.FC<IStepsFour> = ({ values: { one, two, three }, steps, setValuesStep, nextSteps, prevSteps }) => {
  const { firstName, lastName, gender } = one;
  const { email, mobile, country, city } = two;
  const { img } = three
  const classes = useStyle();

  return (
    <div className={classes.wrapper}>
      <div className={classes.avatarWrapper}>
        <Avatar className={classes.avatar} alt='avatar' src={img ? URL.createObjectURL(img) : require('../../../assests/img/person.png')} />
        <div className={classes.wrapperInfo}>
          <p className={classes.firstName}>{firstName}</p>
          <p className={classes.lastName}>{lastName}</p>
        </div>
      </div>
      <div className={classes.infoWrapper}>
        <div className={classes.blockWrapper}>
          <p className={classes.label}>Genger:</p>
          <p className={classes.answer}>{gender}</p>
        </div>
        <div className={classes.blockWrapper}>
          <p className={classes.label}>Email:</p>
          <p className={classes.answer}>{email}</p>
        </div>
        <div className={classes.blockWrapper}>
          <p className={classes.label}>Moblie:</p>
          <p className={classes.answer}>{mobile}</p>
        </div>
        <div className={classes.blockWrapper}>
          <p className={classes.label}>Country:</p>
          <p className={classes.answer}>{country}</p>
        </div>
        <div className={classes.blockWrapper}>
          <p className={classes.label}>City:</p>
          <p className={classes.answer}>{city}</p>
        </div>
      </div>
      <StepsButtons prevSteps={prevSteps} nextSteps={nextSteps} steps={steps} />
    </div>
  )
}

export default StepsFour