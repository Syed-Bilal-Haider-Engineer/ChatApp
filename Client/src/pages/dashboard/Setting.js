import { useTheme } from '@emotion/react'
import { faker } from '@faker-js/faker'
import { Avatar, Box, Divider, IconButton, Stack, Typography } from '@mui/material'
import { Bell, CaretLeft, Image, Info, Key, Keyboard, Lock, Note, PencilCircle } from 'phosphor-react'
import React from 'react'
import Shortcuts from '../../Sections/settings/Shortcuts'

const Setting = () => {
    const [openShortsCut, setOpenShortsCut] = React.useState(false)
    const theme = useTheme()

    const handleToggleShortCut = () => {
        setOpenShortsCut((openShortsCut) => !openShortsCut)
    }

    const listOptions = [
        {
            key: 0,
            icon: <Bell size={20} />,
            title: "Notifications",
            onclick: () => { }
        },
        {
            key: 1,
            icon: <Lock size={20} />,
            title: "Privacy",
            onclick: () => { }
        },
        {
            key: 2,
            icon: <Key size={20} />,
            title: "Security",
            onclick: () => { }
        },
        {
            key: 3,
            icon: <PencilCircle size={20} />,
            title: "Theme",
            onclick: () => { }
        },
        {
            key: 4,
            icon: <Image size={20} />,
            title: "Chat Wallpaper",
            onclick: () => { }
        },
        {
            key: 5,
            icon: <Note size={20} />,
            title: "Request account info",
            onclick: () => { }
        },
        {
            key: 6,
            icon: <Keyboard size={20} />,
            title: "Keyword shortcuts",
            onclick: () => {
                console.log("Request")
                handleToggleShortCut()
            }
        },
        {
            key: 7,
            icon: <Info size={20} />,
            title: "Help",
            onclick: () => { }
        }
    ];
    return (<>
        <Stack direction="row" sx={{ width: '100%' }}>
            {/* LeftSide panal*/}
            <Box sx={{
                overflowY: 'scroll', height: '100vh', width: 320,
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
                boxShadow: "0px 0px 2px rbga(0, 0, 0, 0.25)"
            }}>
                <Stack p={4} spacing={4}>
                    {/* Header */}
                    <Stack direction="row" spacing={3} alignItems="center">
                        <IconButton>
                            <CaretLeft size={24} color='#4B4B4B' />
                        </IconButton>
                        <Typography variant="h6">Setting</Typography>
                    </Stack>
                    {/* Profile */}
                    <Stack direction="row" spacing={3} alignItems="center">
                        <Avatar sx={{ height: 56, width: 56 }} src={faker.image.avatar()} alt="Profile" />
                        <Stack spacing={0.5}>
                            <Typography variant="h6">{faker.name.fullName()}</Typography>
                            <Typography variant="body2">{faker.random.words()}</Typography>
                        </Stack>
                    </Stack>
                    {/* List options */}
                    <Stack spacing={4}>
                        {listOptions.map(({ key, title, icon, onclick }) => {
                            return (
                                <Stack key={key} spacing={2} sx={{ cursor: 'pointer' }} onClick={onclick}>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        {icon}
                                        <Typography variant="body2">{title}</Typography>
                                    </Stack>
                                    {key !== 7 && <Divider />}
                                </Stack>
                            )
                        })}
                    </Stack>
                </Stack>
            </Box>
            {/* Right side main content */}
        </Stack>
        {openShortsCut && <Shortcuts open={openShortsCut} handleToggleShortCut={handleToggleShortCut} />}
    </>
    )
}

export default Setting
