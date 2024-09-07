import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import { Box } from "@mui/material";
const isAuthenticated = true
const DashboardLayout = () => {

  if(!isAuthenticated){
    return <Navigate to="/auth/login"/>
  }

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
