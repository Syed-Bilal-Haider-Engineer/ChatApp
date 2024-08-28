import React from "react";
import Chats from "./Chats";
import { Stack, Box, useTheme } from '@mui/material';
import Converstation from "../../components/Converstation";

const GeneralApp = () => {
  const theme = useTheme();
  
  return (
    <>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Chats />
        <Box sx={{ 
            height: '100%', 
            width: "calc(100vw - 420px)",
            backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
          }}>
          <Converstation />
        </Box>
      </Stack>
    </>
  );
};

export default GeneralApp;
