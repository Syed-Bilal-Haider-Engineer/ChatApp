import { Avatar, Box, Stack, Typography, Badge,useTheme } from "@mui/material"
import { StyledBadge } from "./settings/StyledBadge"

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

  export default ChatElement
  