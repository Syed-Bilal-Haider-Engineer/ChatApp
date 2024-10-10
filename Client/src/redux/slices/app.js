import {createSlice} from '@reduxjs/toolkit';
import {dispatch} from '../store';

const initialState = {
  sidebar: {
    open: false,
    type: 'CONTACT',
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
