import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';

import Formik from '../../components/Formik/Formik'
import Pure from '../../components/Pure/index'
import Redux from '../../components/Redux/index.jsx'

const useStyle = makeStyles(theme => ({
  bread: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '30px'
  },
  text: {
    cursor: 'pointer'
  }
}))

const Main: React.FC = () => {
  const classes = useStyle();

  const [activeCrumbs, setActiveCrumms] = useState('Pure React')

  const onChangeCrumbs = (name: string): void => setActiveCrumms(name);

  return (
    <main>
      <Breadcrumbs className={classes.bread} aria-label="breadcrumb">
        <Typography
          onClick={() => onChangeCrumbs('Pure React')}
          className={classes.text}
          color={activeCrumbs === 'Pure React' ? 'primary' : 'inherit'}
        >
          Pure React
      </Typography>
        <Typography
          onClick={() => onChangeCrumbs('Formik')}
          className={classes.text}
          color={activeCrumbs === 'Formik' ? 'primary' : 'inherit'}
        >
          Formik
      </Typography>
        <Typography
          onClick={() => onChangeCrumbs('Redux Form')}
          className={classes.text}
          color={activeCrumbs === 'Redux Form' ? 'primary' : 'inherit'}
        >
          Redux Form
        </Typography>
      </Breadcrumbs>
      {activeCrumbs === 'Pure React' && <Pure />}
      {activeCrumbs === 'Formik' && <Formik />}
      {activeCrumbs === 'Redux Form' && <Redux />}
    </main>
  )
}

export default Main