import {
  Box,
  IconButton,
  Stack,
  useTheme,
  Typography,
  Avatar,
} from '@mui/material';
import React from 'react';
import {X} from 'phosphor-react';
import {useDispatch} from 'react-redux';
import {updateSidebarToggle} from '../redux/slices/app';
import {faker} from '@faker-js/faker';

const Contact = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Box sx={{width: 324, height: '100vh'}}>
      <Stack sx={{height: '100%'}}>
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
            width: '100%',
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#F8FAFF'
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{height: '100%', p: 2}}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton
              onClick={() => {
                dispatch(updateSidebarToggle());
              }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        {/* Body .... */}
        <Stack
          sx={{
            height: '100%',
            position: 'relative',
            flowGrow: 1,
            overflowY: 'scroll',
          }}
          p={3}
          spacing={3}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              name={faker.name.fullName()}
              sx={{height: 64, width: 64}}
            />
            <Stack spacing={0.5}>
             <Typography variant='article' fontWeight={600}>
             {faker.name.fullName()}
             </Typography>
             <Typography variant='body2' fontWeight={600}>
                "+923466929789"
             </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Contact;
