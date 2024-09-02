import React from "react";
import Chats from "./Chats";
import { Stack, Box, useTheme } from '@mui/material';
import Converstation from "../dashboard/Converstation/index";
import Contact from "../../components/Contact";

const GeneralApp = () => {
  const theme = useTheme();
  
  return (
    <>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Chats />
        <Box sx={{ 
            height: '100%', 
            width: "calc(100vw - 720px)",
            backgroundColor: theme.palette.mode === 'light' ? '#f0f4fA' : theme.palette.background.default,
          }}>
          <Converstation />
        </Box>
        <Contact/>
      </Stack>
    </>
  );
};

export default GeneralApp;
