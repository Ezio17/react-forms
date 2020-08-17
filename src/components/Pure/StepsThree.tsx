import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import StepsButtons from './StepsButtons'
import { IStepsButtons } from '../../interface/index'

const useStyle = makeStyles(theme => ({
  avatar: {
    width: '100%',
    marginBottom: '15px'
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
}))

interface IImg {
  img: string
  handleSetImg: (img: any) => void
}

interface IStepsThree extends IImg, IStepsButtons { }

const StepsThree: React.FC<IStepsThree> = ({ steps, prevSteps, nextSteps, img, handleSetImg }) => {
  const classes = useStyle()

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    nextSteps && nextSteps();
  }

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <img className={classes.avatar} alt='avatar' src={img ? URL.createObjectURL(img) : require('../../assests/img/person.png')} />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={(e) => {
            if (e.currentTarget.files !== null) {
              handleSetImg(e.currentTarget.files && e.currentTarget.files[0])
            }
          }}
        />
        <Fab
          color="secondary"
          size="small"
          component="span"
          aria-label="add"
          variant="extended"
        >
          <AddIcon /> Upload photo
              </Fab>
      </label>
      <StepsButtons prevSteps={prevSteps} nextSteps={nextSteps} steps={steps} />
    </form>
  )
}

export default StepsThree