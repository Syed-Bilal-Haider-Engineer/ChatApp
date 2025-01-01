// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import Snackbar from '@mui/material/Snackbar';
import {Alert} from '@mui/material';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {closeSnackBar} from './redux/slices/app';

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.app);
  const vertical = 'bottom',
    horizontal = 'center';
  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <Router />
        </ThemeSettings>
      </ThemeProvider>
      {state.snackbar?.message && state.snackbar?.open ? (
        <>
          {' '}
          <Snackbar
            anchorOrigin={{vertical, horizontal}}
            open={state.snackbar?.open}
            onClose={() => {
              dispatch(closeSnackBar());
            }}
            message="Login successfully !"
            autoHideDuration={4000}
            key={vertical + horizontal}
          >
            <Alert
              onClose={() => {
                dispatch(closeSnackBar());
              }}
              severity={state.snackbar?.severity}
              variant="filled"
              sx={{width: '100%'}}
            >
              {state.snackbar?.message}
            </Alert>
          </Snackbar>
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default App;
