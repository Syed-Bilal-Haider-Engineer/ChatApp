import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  sidebar: {
    open: false,
    type: 'CONTACT',
  },
  snackbar: {
    open: null,
    severity: null,
    message: null,
  },
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar(state, actions) {
      state.sidebar.open = !state.sidebar.open;
    },
    updateType(state, actions) {
      state.sidebar.type = actions.payload.type;
    },
    openSnackBar(state, action) {
      console.log(action.payload,"payload");
      state.snackbar.open = true;
      state.snackbar.severity = action.payload.severity;
      state.snackbar.message = action.payload.message;
    },
    closeSnackBar(state) {
      console.log("This is getting executed");
      state.snackbar.open = false;
      state.snackbar.message = null;
    },
  },
});

export default slice.reducer;

export const updateSidebarToggle = () => {
  return async (dispatch,getState) => {
    dispatch(slice.actions.toggleSidebar());
  };
};

export const updateSidebarType = (type) => {
  return async (dispatch, getState) => {
    dispatch(
      slice.actions.updateType({
        type,
      })
    );
  };
};

export const closeSnackBar = () => async (dispatch, getState) => {
  dispatch(slice.actions.closeSnackBar());
};

export const showSnackbar =
  ({ severity, message }) =>
  async (dispatch, getState) => {
    console.log("show snackbar==>", severity, message);
    dispatch(
      slice.actions.openSnackBar({
        message,
        severity,
      })
    );

    // setTimeout(() => {
    //   dispatch(slice.actions.closeSnackBar());
    // }, 4000);
  };
