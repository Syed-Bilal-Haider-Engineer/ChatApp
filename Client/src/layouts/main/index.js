import { Container, Stack } from "@mui/material";
import { Cat } from "phosphor-react";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const MainLayout = () => {
  const {isLoggedIn} = useSelector((state) => state.auth)
  // if(isLoggedIn){
  //   return <Navigate to="/app"/>
  // }
  return (
    <>
    <Container sx={{mt:5}} maxWidth="sm">
       <Stack spacing={5}>
        <Stack sx={{width:'100%'}} direction="column" alignItems="center">
        <Cat size={100} color="green" />
        </Stack>
       </Stack>
      <Outlet />
            
    </Container>
    </>
  );
};

export default MainLayout;
