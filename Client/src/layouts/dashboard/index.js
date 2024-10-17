import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const {isLoggedIn} = useSelector((state) => state.auth)
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
