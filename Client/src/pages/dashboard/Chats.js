import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Divider,
  useTheme,
  Stack
} from '@mui/material';
import { IconButton } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass, Users } from 'phosphor-react';
import { ChatList } from '../../data';
// import 'simplebar-react/dist/simplebar.min.css';
import { Search, SearchIconWrapper, StyledInputBased } from '../../components/Search/Index';
import ChatElement from '../../components/ChatElement';
import Friends from '../../Sections/main/Friends';

const Chats = () => {
  const theme = useTheme()
  const [openDialog, setOpenDialog] = useState();

  const hanldeOpenDialog = () => {
    setOpenDialog(true)
  }

  const hanldeCloseDialog = () => {
    setOpenDialog(false)
  }
  return (
    <>
      <Box
        sx={{
          positon: 'relative',
         backgroundColor:
          theme.palette.mode === "light"
            ? "#F8FAFF"
            : theme.palette.background.paper,
          width: 320,
          boxShadow: '0 0 2px rbga(0,0,0,0.25)',
        }}
      >
        <Stack p={3} spacing={2}  sx={{ maxHeight: "100vh" }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Chats</Typography>
             <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton onClick={()=>{
                 hanldeOpenDialog()
              }}>
                <CircleDashed />
              </IconButton>
              <IconButton>
                <Users />
              </IconButton>
             </Stack>
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBased
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider sx={{ height: 2, width: '80%' }} />
          </Stack>
          <Stack
            sx={{ flexGrow: 1,overflow: 'hidden', height: '100%' }}>
            {/* <SimpleBarReact forceVisible="y" timeout={500} clickOnTrack={false}> */}
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: 'black' }}>
                  Pinned
                </Typography>
                {ChatList.filter((ele) => ele.pinned).map((item) => {
                  return <ChatElement key={item.id} {...item} />
                })}
              </Stack>
              <Stack direction="column">
                <Stack spacing={2.4}>
                  <Typography variant="subtitle2" sx={{ color: '#676767' }}>
                    All Chats
                  </Typography>
                  {ChatList.filter((ele) => !ele.pinned).map((item) => {
                    return <ChatElement key={item.id} {...item} />
                  })}
                </Stack>
              </Stack>
            {/* </SimpleBarReact>  */}
          </Stack>
        </Stack>
      </Box>

      {openDialog && <Friends open={openDialog} handleClose={hanldeCloseDialog}/>}
    </>
  );
};

export default Chats;
