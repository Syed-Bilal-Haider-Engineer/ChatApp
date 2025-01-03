import {createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

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
  users: [],
  friends: [],
  friendRequest: []
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
    updateUsers(state,actions){
      state.users = actions.payload;
    },
    updateFriends(state,actions){
      state.friends = actions.payload;
    },
    updateFriendRequest(state,actions){
      state.friendRequest = actions.payload;
    }
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

    setTimeout(() => {
      dispatch(slice.actions.closeSnackBar());
    }, 4000);
  };

  export const fetchUsers = () => {
     return async(dispatch, getState) => {
         await axios("http://localhost:8000/get-users",{
           headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${getState().auth.token}`
           }
        }).then((response)=>{
            console.log(response,'response')
            dispatch(slice.actions.updateUsers({users: response.data.data}))
        }).catch((error) => {
            console.log(error);
        })
     }
  }

  
  export const fetchFriend = () => {
    return async(dispatch, getState) => {
        await axios("http://localhost:8000/get-friends",{
          headers:{
           "Content-Type":"application/json",
           Authorization: `Bearer ${getState().auth.token}`
          }
       }).then((response)=>{
           console.log(response,'response')
           dispatch(slice.actions.updateFriends({users: response.data.data}))
       }).catch((error) => {
           console.log(error);
       })
    }
 }

 
 export const fetchFriendRequest = () => {
  return async(dispatch, getState) => {
      await axios("http://localhost:8000/get-request",{
        headers:{
         "Content-Type":"application/json",
         Authorization: `Bearer ${getState().auth.token}`
        }
     }).then((response)=>{
         console.log(response,'response')
         dispatch(slice.actions.updateFriendRequest({users: response.data.data}))
     }).catch((error) => {
         console.log(error);
     })
  }
}