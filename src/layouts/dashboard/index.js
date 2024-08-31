import React from "react";
import { Outlet } from "react-router-dom";
import Siderbar from "./Siderbar";
import { Box } from "@mui/material";
const DashboardLayout = () => {
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
