import React from 'react';
import {
  Stack,
  Box,
  Typography,
  TextField,
  useTheme,
  styled,
  Badge,
  Avatar,
  IconButton,
  Divider,
  InputAdornment,
} from '@mui/material';
import { faker } from '@faker-js/faker';
import {
  Phone,
  VideoCamera,
  MagnifyingGlass,
  CaretDown,
  Smiley,
  LinkSimple,
  PaperPlaneTilt,
} from 'phosphor-react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.default}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
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

const StyledInput = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-input': {
    paddingTop: '12px!important',
    paddingBottom: '12px!important',
  },
}));

const Conversation = () => {
  const theme = useTheme();
  return (
    <Stack height="100vh" sx={{ width: '100%' }}>
      {/* Chat header */}
      <Box
        p={2}
        sx={{
          width: '100%',
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background.paper,
          boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ width: '100%', height: '100%' }}
        >
          <Stack direction="row" spacing={2}>
            <Box>
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                variant="dot"
              >
                <Avatar alt={faker.name.firstName()} src={faker.image.avatar()} />
              </StyledBadge>
            </Box>
            <Stack spacing={0.2}>
              <Typography variant="subtitle1">{faker.name.firstName()}</Typography>
              <Typography variant="caption">online</Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={3}>
            <IconButton>
              <VideoCamera />
            </IconButton>
            <IconButton>
              <Phone />
            </IconButton>
            <IconButton>
              <MagnifyingGlass />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <IconButton>
              <CaretDown />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* Chat message area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 2,
          overflowY: 'auto',
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Sample Chat Messages */}
        <Stack spacing={2}>
          <Box
            sx={{
              alignSelf: 'flex-start',
              padding: 1.5,
              backgroundColor: theme.palette.mode === 'light' ? '#f0f0f0' : '#333',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">Hello! How are you?</Typography>
          </Box>
          <Box
            sx={{
              alignSelf: 'flex-end',
              padding: 1.5,
              backgroundColor: theme.palette.primary.main,
              color: '#fff',
              borderRadius: 2,
            }}
          >
            <Typography variant="body2">I am good, thanks! How about you?</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Chat footer */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: 2,
          backgroundColor:
            theme.palette.mode === 'light'
              ? '#F8FAFF'
              : theme.palette.background.paper,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3} sx={{ flexGrow: 1 }}>
          <Stack spacing={1} sx={{ flexGrow: 1 }}>
            <StyledInput
              placeholder="Type a message..."
              fullWidth
              variant="filled"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{marginTop:"4px !important"}}>
                    <IconButton>
                      <LinkSimple />
                    </IconButton>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton>
                      <Smiley />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>
        <Box
          sx={{
            height: 48,
            width: 46,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 2,
            borderRadius:2
          }}
        >
          <IconButton>
            <PaperPlaneTilt color="#ffffff" />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default Conversation;
