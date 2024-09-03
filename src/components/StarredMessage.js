import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { CaretRight } from 'phosphor-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSidebarType } from '../redux/slices/app';
import Chat from '../pages/dashboard/Converstation/Messages';

function StarredMessage() {
    const theme = useTheme();
    const dispatch = useDispatch();

    return (
        <Box sx={{ width: 324, height: '100vh' }}>
            <Stack sx={{ height: '100%' }}>
                <Box
                    sx={{
                        boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
                        width: '100%',
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? '#F8FAFF'
                                : theme.palette.background,
                    }}
                >
                    <Stack
                        sx={{ height: '100%', p: 2 }}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={3}
                    >
                        <IconButton
                            onClick={() => dispatch(updateSidebarType("CONTACT"))}
                        >
                            <CaretRight />
                        </IconButton>
                        <Typography variant="subtitle2">Shared Message</Typography>
                    </Stack>
                </Box>
                {/* Body */}
                <Stack
                    sx={{
                        height: '100%',
                        position: 'relative',
                        flexGrow: 1,
                        overflowY: 'scroll',
                    }}
                    p={3}
                    spacing={3}
                >
                 <Chat/>  
                </Stack>
            </Stack>
        </Box>
    );
}

export default StarredMessage;
