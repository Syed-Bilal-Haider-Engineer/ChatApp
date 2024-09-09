import { Avatar, Box, IconButton, Stack, Typography, useTheme } from "@mui/material"
import { ArrowUpLeft, ArrowUpRight, Phone, VideoCamera } from "phosphor-react";
import { StyledBadge } from "./settings/StyledBadge";
import { faker } from "@faker-js/faker";

const CallElement = ({ id, name, img, time, unread, online, missed, incoming, startCall }) => {

    const theme = useTheme()
    return (
        <>
            <Box sx={{
                width: '100%',
                borderRadius: 1,
                marginRight: 2,
                mt: 4,
                backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
            }}
                p={2}>
                <Stack direction="row" alignItems="center"
                    justifyContent="space-between" spacing={2}
                >
                    <Stack direction="row" spacing={2}>
                        {online ? <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar alt="Remy Sharp" src={faker.image.avatar()} />
                        </StyledBadge> :
                            <Avatar alt="Remy Sharp" src={img} />
                        }
                        <Stack spacing={0.3}>
                            <Typography variant="subtitle1">{
                                faker.name.firstName()
                            }</Typography>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                {incoming ? <ArrowUpLeft color={missed ? 'red' : 'green'} /> :
                                    <ArrowUpRight size={18} color={missed ? 'red' : 'green'} />}
                                <Typography variant="caption"> Yesterday {time}</Typography>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton>
                            <Phone size={32} color="green" />
                        </IconButton>
                        {startCall && <IconButton>
                            <VideoCamera color="green" />
                        </IconButton>}
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

export default CallElement
