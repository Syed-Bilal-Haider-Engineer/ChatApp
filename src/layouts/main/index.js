import { Container, Stack } from "@mui/material";
import { Cat } from "phosphor-react";
import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
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
