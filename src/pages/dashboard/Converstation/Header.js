import React from 'react'
import { faker } from '@faker-js/faker';
import {
  Phone,
  VideoCamera,
  MagnifyingGlass,
  CaretDown
} from 'phosphor-react';
import { Avatar, Box, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { StyledBadge } from '../../../components/settings/StyledBadge';
const Header = () => {
  const theme = useTheme();
  return (
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
  )
}

export default Header