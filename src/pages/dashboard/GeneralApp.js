import React from 'react';
import Chats from './Chats';
import { Stack, Box, useTheme } from '@mui/material';
import Converstation from '../dashboard/Converstation/index';
import Contact from '../../components/Contact';
import { useSelector } from 'react-redux';
import SharedMessage from '../../components/SharedMessage';
import StarredMessage from '../../components/StarredMessage';

const GeneralApp = () => {
  const theme = useTheme();
  const { sidebar } = useSelector((state) => state.app);
  return (
    <>
      <Stack direction="row" sx={{ width: '100%' }}>
        <Chats />
        <Box
          sx={{
            height: '100%',
            width: sidebar.open ? 'calc(100vw - 720px)' : 'calc(100vw - 420px)',
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#f0f4fA'
                : theme.palette.background.default,
          }}
        >
          <Converstation />
        </Box>
        {sidebar.open && (() => {
          switch (sidebar.type) {
            case "CONTACT":
              return <Contact/>;
            case "SHARED":
              return <SharedMessage/>;
            case "STARRED":
              return <StarredMessage/>;
            default:
              break;
          }
        })()}
      </Stack>
    </>
  );
};

export default GeneralApp;
