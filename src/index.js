import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './app/store';
import { SnackbarProvider } from 'notistack';
import theme from './serverRendering/theme';
import { ThemeProvider } from '@material-ui/core/styles';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme} >
    <Provider store={store}>
      <BrowserRouter>
      <SnackbarProvider anchorOrigin={{vertical:'top', horizontal:'right'}}>
      <App />
      
      </SnackbarProvider>

      </BrowserRouter>
    </Provider>
       </ThemeProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
