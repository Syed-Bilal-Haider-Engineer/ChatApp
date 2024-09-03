import React from 'react';
import {
  Box,
  styled,
  Typography,
  InputBase,
  alpha,
  Button,
  Divider,
  useTheme,
  Badge,
  Avatar
} from '@mui/material';
import { Stack } from '@mui/material';
import { IconButton } from '@mui/material';
import { ArchiveBox, CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { ChatList } from '../../data';
import 'simplebar-react/dist/simplebar.min.css';
import SimpleBarReact from 'simplebar-react';
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '20%',
      height: '20%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const ChatElement = ({ img, name, msg, time, unread, online }) => {
  const theme = useTheme()
  return (
    <>
      <Box sx={{
        width: '100%',
        borderRadius: 1,
        marginRight: 2,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
      }}
        p={2}>
        <Stack direction="row" alignItems="center"
          justifyContent="space-between" spacing={2}>
          <Stack direction="row" spacing={2}>
            {online ? <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt="Remy Sharp" src={img} />
            </StyledBadge> : 
            <Avatar alt="Remy Sharp" src={img} />
            }
            <Stack spacing={0.3}>
              <Typography variant="subtitle1">{name}</Typography>
              <Typography variant="caption">{msg?.slice(0,5)}</Typography>
            </Stack>
          </Stack>
          <Stack spacing={2} alignItems="center">
            <Typography sx={{ fontSize: 16 }}>
              {time}
            </Typography>
            <Badge color="primary" badgeContent={unread}>
            </Badge>
          </Stack>
        </Stack>
      </Box>
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
  const theme = useTheme()
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
            <IconButton>
              <CircleDashed />
            </IconButton>
          </Stack>
          <Stack sx={{ width: '100%' }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBased
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              ></StyledInputBased>
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
            <SimpleBarReact forceVisible="y" timeout={500} clickOnTrack={false}>
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
            </SimpleBarReact> 
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default Chats;
