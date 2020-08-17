import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import root from './store/reducer/root'

const store = createStore(root)

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7e57c2'
    },
    secondary: {
      main: '#f5480f',
      dark: '#c23c10',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
