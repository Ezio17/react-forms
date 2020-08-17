import React from 'react'
import { reduxForm, formValueSelector, change } from 'redux-form'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'

import StepsButton from './StepsButton'

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

const StepsThree = ({ steps, nextSteps, prevSteps, handleSubmit, img, changeFieldValue }) => {
  const classes = useStyle();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <img className={classes.avatar} alt='avatar' src={img ? URL.createObjectURL(img) : require('../../assests/img/person.png')} />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          type="file"
          name='img'
          onChange={e => {
            changeFieldValue('img', e.currentTarget.files && e.currentTarget.files[0])
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
      <StepsButton nextSteps={nextSteps} prevSteps={prevSteps} steps={steps} />
    </form>
  )
}

const StepsThreeForm = reduxForm({
  form: 'stepThree'
})(StepsThree)

const selector = formValueSelector('stepThree')

const mapStateToProps = state => {
  const img = selector(state, 'img')

  return {
    img
  }
}

export default connect(mapStateToProps, (dispatch => {
  return {
    changeFieldValue: function (field, value) {
      dispatch(change('stepThree', field, value))
    }
  }
}))(StepsThreeForm)