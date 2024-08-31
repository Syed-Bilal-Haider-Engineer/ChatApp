import { Box, IconButton, InputAdornment, Stack, useTheme } from '@mui/material'
import { LinkSimple, PaperPlaneTilt, Smiley } from 'phosphor-react'
import React from 'react'
import { StyledInput } from '../../../components/settings/StyledInput';

const Footer = () => {
  const theme = useTheme();
  return (
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
  )
}

export default Footer