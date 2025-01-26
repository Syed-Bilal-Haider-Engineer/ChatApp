import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, socket } from "../../socket";
import { showSnackbar } from "../../redux/slices/app";

const DashboardLayout = () => {
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector((state) => state.auth);
  const user_id = window.localStorage.getItem('user_id');

  useEffect(() => {
     if(isLoggedIn){
      window.reload = function() {
         if(!window.location.hash){
          window.location = window.location + "#loaded";
          window.location.onload()
         }
      }

      window.reload();
      if(!socket){
        connectSocket(user_id);
      }

      socket.on("new_friend_request",(data) => {
        dispatch(showSnackbar({ severity:'success', message:data.message}))
      })
      socket.on("request_accepted",(data) => {
        dispatch(showSnackbar({ severity:'success', message:data.message}))
      })
      socket.on("request_sent",(data) => {
        dispatch(showSnackbar({ severity:'success', message:data.message}))
      })
     }
       return () => {
        socket.off("new_friend_request");
        socket.off("request_accepted");
        socket.off("request_sent");
       }
  }, [socket,isLoggedIn])
  
  // if(!isLoggedIn){
  //   return <Navigate to="/auth/login"/>
  // }

  return (
    <>
      <Box sx={{display:'flex'}}>
      <Siderbar/>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
