import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core'
import { theme } from './theme';
import { store } from './redux';
import './index.css';
import App from './App';

ReactDOM.render(
  <Provider store={store()}>
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </React.StrictMode>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
