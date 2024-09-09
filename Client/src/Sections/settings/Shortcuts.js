import React from 'react';
import {
    Stack,
    Typography,
    Button,
    DialogTitle,
    DialogContent,
    DialogActions,
    Slide,
    DialogContentText,
    Dialog,
    Grid
} from '@mui/material';

// Define keyboard shortcuts options
const listOptions = [
    { key: 0, title: 'Mark as unread', combination: ['CMD', 'SHIFT', 'U'] },
    { key: 1, title: 'Mute', combination: ['CMD', 'SHIFT', 'M'] },
    { key: 2, title: 'Archive Chat', combination: ['CMD', 'SHIFT', 'E'] },
    { key: 3, title: 'Delete chat', combination: ['CMD', 'SHIFT', 'D'] },
    { key: 4, title: 'Pin chat', combination: ['CMD', 'SHIFT', 'P'] },
    { key: 5, title: 'Search', combination: ['CMD', 'F'] },
    { key: 6, title: 'Search chat', combination: ['CMD', 'SHIFT', 'F'] },
    { key: 7, title: 'New chat', combination: ['CMD', 'N'] },
    { key: 8, title: 'Next chat', combination: ['CMD', 'TAB'] },
    { key: 9, title: 'Previous chat', combination: ['CMD', 'SHIFT', 'TAB'] },
    { key: 10, title: 'New Group', combination: ['CMD', 'SHIFT', 'n'] },
    { key: 11, title: 'Profile & About', combination: ['CMD', 'P'] },
    { key: 12, title: 'Increased Speed of voice message', combination: ['CMD', 'SHIFT', '+'] },
    { key: 13, title: 'Decreased Speed of voice message', combination: ['CMD', 'SHIFT', '-'] },
    { key: 14, title: 'Settings', combination: ['CMD', '.'] },
    { key: 15, title: 'Emoji channel', combination: ['CMD', 'E'] },
    { key: 16, title: 'Settings', combination: ['CMD', 'G'] },
    { key: 17, title: 'Sticker panel', combination: ['CMD', 'S'] }
];

// Transition component for slide effect
const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

// Shortcuts component
const Shortcuts = ({ open, handleToggleShortCut }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleToggleShortCut}
            aria-describedby="alert-dialog-slide-description"
            sx={{ p: 4 }}
            maxWidth="md"
        >
            <DialogTitle>Keyboard Shortcuts</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ mt: 4 }} id="alert-dialog-slide-description">
                    <Grid container spacing={3}>
                        {listOptions.map(({ key, title, combination }) => (
                            <Grid item container xs={12} sm={6} key={key}>
                                <Stack
                                    sx={{ width: '100%' }}
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={3}
                                    direction="row"
                                >
                                    <Typography variant='caption' component={"p"} sx={{ fontSize: 14 }}>
                                        {title}
                                    </Typography>
                                    <Stack spacing={2} direction="row">
                                        {combination.map((ele, index) => (
                                            <Button key={index} disabled variant='contained' sx={{ color: '#212121' }}>
                                                {ele}
                                            </Button>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleToggleShortCut}>Ok</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Shortcuts;
