import React from 'react'
import { Formik, Form } from 'formik'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { IStepsButtons } from '../../../interface/index'
import StepsButtons from '../../Steps/StepsButtons'

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

interface IStepsThree extends IProps, IStepsButtons { }

const StepsTree: React.FC<IStepsThree> = ({ steps, values: { three }, setValuesStep, nextSteps, prevSteps }) => {
  const classes = useStyle();

  return (
    <Formik
      initialValues={three}
      onSubmit={(values) => {
        if (nextSteps && setValuesStep) {
          setValuesStep('three', values)
          nextSteps()
        }
      }}
    >
      {({ setFieldValue, values }) => {
        return (
          <Form className={classes.form}>
            <img className={classes.avatar} alt='avatar' src={values.img ? URL.createObjectURL(values.img) : require('../../../assests/img/person.png')} />
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={(e) => {
                  setFieldValue("img", e.currentTarget.files && e.currentTarget.files[0])
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
          </Form>
        )
      }}
    </Formik>
  )
}

export default StepsTree 