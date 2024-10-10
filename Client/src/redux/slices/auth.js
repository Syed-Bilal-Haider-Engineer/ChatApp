import axios from "axios"
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: "",
    isLoading: false,
    user: null,
    user_id: null,
    email: "",
    error: false,
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
      logIn(state, action) {
        state.isLoggedIn = action.payload.isLoggedIn;
        state.token = action.payload.token;
      },
      signOut(state, action) {
        state.isLoggedIn = false;
        state.token = "";
      },
    },
  });
  
  // Reducer
export default slice.reducer;
  
export function LoginUser(formValues){
  return async(dispatch,getState)=>{
    await axios.post(
        "/auth/login",
        {
            ...formValues
        },
        {
            headers:{
                "Content-Type":"application/json"
            }
        }
    ).then((response)=>{
      dispatch(slice.actions.logIn({
        isLoggedIn: true,
        token: response.data.token
      }))
    }).catch((error)=>{
      console.log("error==>",error)
    })
  }
}