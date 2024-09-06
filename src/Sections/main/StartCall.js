import {
    Dialog, DialogContent,
    DialogContentText, DialogTitle, Slide, Stack, Typography,
} from '@mui/material';
import React from 'react';
import { ChatList } from '../../data';
import CallElement from '../../components/CallElement';
import Search from '../../components/Search/Search';
import StyledInputBased from '../../components/Search/InputBase';
import { MagnifyingGlass } from 'phosphor-react';
import SearchIconWrapper from '../../components/Search/IconSectionWrapper';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const StartCall = ({ openNewCall, handleClose, onConfirm }) => {
    return (<Dialog
        fullWidth
        maxWidth="xs"
        sx={{ height: "70vh", margin:'auto' }}
        open={openNewCall}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle sx={{ mb: 2 }}>
            <Typography
                variant='subtitle2'
                component="p"
            >
                Start a Call
            </Typography>
        </DialogTitle>
        <DialogContent>
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
            <DialogContentText id="alert-dialog-slide-description">
                <Stack direction="column" spacing={2} px={2}>
                    {ChatList.map((item) => (
                        <CallElement key={item.id} startCall={true} {...item} />
                    ))}
                </Stack>
            </DialogContentText>
        </DialogContent>
    </Dialog>
    )
}

export default StartCall;
