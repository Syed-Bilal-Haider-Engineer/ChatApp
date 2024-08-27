import React from 'react';
import {
  Box,
  styled,
  Typography,
  InputBase,
  alpha,
  Button,
  Divider,
} from '@mui/material';
import {Stack} from '@mui/material';
import {IconButton} from '@mui/material';
import {ArchiveBox, CircleDashed, MagnifyingGlass} from 'phosphor-react';

const ChatElement = ()=>{
 return (
  <>
  </>
 )
}
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 20,
  backgroundColor: alpha(theme.palette.background.paper, 1),
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'auto'
}));

const StyledInputBased = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: theme.spacing(1),
  width: '100%'
}));
const Chats = () => {
  return (
    <>
      <Box
        sx={{
          positon: 'relative',
          height: '100%',
          backgroundColor: '#F8FAFF',
          width: 320,
          boxShadow: '0 0 2px rbga(0,0,0,0.25)',
        }}
      >
        <Stack p={3} spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">Chats</Typography>
            <IconButton>
              <CircleDashed />
            </IconButton>
          </Stack>
          <Stack sx={{width:'100%'}}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBased
                placeholder="Search..."
                inputProps={{'aria-label': 'search'}}
              ></StyledInputBased>
            </Search>
          </Stack>
          <Stack spacing={2}>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider sx={{height: 2, width: '80%'}} />
          </Stack>
          <Stack direction="column">
          <ChatElement/>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Chats;
