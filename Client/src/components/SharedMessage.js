import { Box, Grid, IconButton, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import { CaretRight } from 'phosphor-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateSidebarType } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import { Shared_docs, Shared_Link } from '../data';
import { DocMsg, LinkMsg } from '../pages/dashboard/Converstation/MessageType';

function SharedMessage() {
    const [value, setValue] = React.useState(2);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
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
                <Box sx={{ width: '100%' }}>
                    <Tabs sx={{ px: 2, pt: 2 }} value={value} onChange={handleChange} centered>
                        <Tab label="Media" />
                        <Tab label="Links" />
                        <Tab label="Docs" />
                    </Tabs>
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
                    spacing={value === 1 ? 1 : 3}
                >
                    {(() => {
                        switch (value) {
                            case 0:
                                return (
                                    <Grid container spacing={2}>
                                        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                                            <Grid item key={item} xs={4}>
                                                <img src='https://dummyimage.com/300x200/000/fff' alt={faker.name.firstName()} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                );
                            // Links
                            case 1:
                                return (
                                    Shared_Link.map((ele, index) => (
                                        <LinkMsg key={index} {...ele} />
                                    ))
                                )
                            // Docs
                            case 2:
                                return Shared_docs.map((ele, index) => (
                                    <DocMsg key={index} {...ele} />
                                ));
                            default:
                                return null;
                        }
                    })()}
                </Stack>
            </Stack>
        </Box>
    );
}

export default SharedMessage;
