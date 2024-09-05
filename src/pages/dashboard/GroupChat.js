import { Box, Stack, useTheme, Typography, Link, Divider, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { Search, SearchIconWrapper, StyledInputBased } from '../../components/Search/Index';
// import { SimpleBarStyle } from './Scrollbar';
import { ChatList } from '../../data';
import ChatElement from '../../components/ChatElement';
import CreateGroup from '../../Sections/main/CreateGroup';

const GroupChat = () => {
    const theme = useTheme();
   const [openNewGroup, setNewGroup] = useState(false)
    return (
        <>
        <Stack direction="row" sx={{ width: '100%' }}>
            <Box
                sx={{
                    height: '100vh',
                    backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
                    width: 320,
                    boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Stack p={3} spacing={2} sx={{ flexShrink: 0 }}>
                    <Typography variant="h4">Groups</Typography>
                    <Stack sx={{ width: '100%' }}>
                        <Search>
                            <SearchIconWrapper>
                                <MagnifyingGlass color="#709CE6" />
                            </SearchIconWrapper>
                            <StyledInputBased
                                style={{ height: "80px !important" }}
                                placeholder="Search..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search>
                    </Stack>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    px={3}
                    sx={{ flexShrink: 0 }}
                >
                    <Typography
                        variant="subtitle2"
                        sx={{
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'none',
                            },
                        }}
                        component={Link}
                    >
                        Create New Group
                    </Typography>
                    <IconButton onClick={()=>{
                        setNewGroup((prevGroup) => !prevGroup)
                    }}>
                        <Plus />
                    </IconButton>
                </Stack>
                <Divider />
                <Stack
                    spacing={2}
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        mt: 2,
                        height: '0', // Ensure it takes up remaining space
                    }}
                >
                    {/* <SimpleBarStyle> */}
                    <Stack direction="column" spacing={2} px={2}>
                        <Typography variant='subtitle2' sx={{ color: 'black' }}>
                            Pinned
                        </Typography>
                        {ChatList.filter((ele) => ele.pinned).map((item) => (
                            <ChatElement key={item.id} {...item} />
                        ))}
                         <Typography variant='subtitle2' sx={{ color: '#676767' }}>
                            All Groups
                        </Typography>
                        {ChatList.filter((ele) => !ele.pinned).map((item) => (
                            <ChatElement key={item.id} {...item} />
                        ))}
                    </Stack>
                    {/* </SimpleBarStyle> */}
                </Stack>
            </Box>
        </Stack>
        <CreateGroup openNewGroup={openNewGroup}/>
        </>
    );
}

export default GroupChat;
