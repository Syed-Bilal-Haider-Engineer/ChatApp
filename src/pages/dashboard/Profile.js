import React from 'react';
import {Box, Typography, useTheme, Stack} from '@mui/material';
import {IconButton} from '@mui/material';
import {ArrowLeft} from 'phosphor-react';
import ProfileForm from '../../Sections/settings/ProfileForm';
// import 'simplebar-react/dist/simplebar.min.css';

const Profile = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          positon: 'relative',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background.paper,
          width: 320,
          boxShadow: '0 0 2px rbga(0,0,0,0.25)',
          height:'100vh'
        }}
      >
        <Stack p={3} spacing={2} sx={{maxHeight: '100vh'}}>
          <Stack direction="row" justifyContent="start" alignItems="center">
            <IconButton>
              <ArrowLeft />
            </IconButton>
            <Typography variant="h5" sx={{ml: 2}}>
              Profile
            </Typography>
          </Stack>
          <Stack sx={{flexGrow: 1, overflow: 'hidden', height: '100%'}}>
            {/* <SimpleBarReact forceVisible="y" timeout={500} clickOnTrack={false}> */}
            <Stack spacing={2.4} sx={{mt:2}}>
              <ProfileForm/>
            </Stack>
            {/* </SimpleBarReact>  */}
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Profile;
