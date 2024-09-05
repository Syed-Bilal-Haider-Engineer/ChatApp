import { Avatar, Box, Stack, Typography, Badge,useTheme, styled } from "@mui/material"

const ChatElement = ({ img, name, msg, time, unread, online }) => {
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

  export default ChatElement
  