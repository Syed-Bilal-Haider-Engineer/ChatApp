import React from 'react';
import { Box, Stack } from '@mui/material';
import Header from './Header';
import Chat from './Messages';
import Footer from './Footer';

const Conversation = () => {
  return (
    <Stack height="100vh" maxHeight="100vh" sx={{ width: 'auto' }}>
      {/* Chat header */}
         <Header/>
      {/* Chat message area */}
      <Box sx={{width:'100%', flexGrow:1, height:'100%', overflowY:'scroll'}}>
         <Chat menu={true}/>
      </Box>
      {/* Chat footer */}
      <Footer/>
    </Stack>
  );
};

export default Conversation;
