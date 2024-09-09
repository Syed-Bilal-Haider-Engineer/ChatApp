import {
    Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Slide, Typography,
    useTheme,
} from '@mui/material';
import React from 'react';
import CreateNewGroup from '../auth/CreateNewGroup';

const Transition = React.forwardRef((props, ref) => (
    <Slide direction="up" ref={ref} {...props} />
));

const CreateGroup = ({ openNewGroup, handleClose, onConfirm }) => {
    const theme = useTheme()

    return (<Dialog
        fullWidth
        maxWidth="xs"
        open={openNewGroup}
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
                Create a New Group
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                <CreateNewGroup onConfirm={onConfirm} />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
                onClick={onConfirm}
                color="inherit"
                size="large"
                type="submit"
                variant="contained"
                sx={{
                    bgcolor: 'text.secondary',
                    color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    '&:hover': {
                        bgcolor: 'text.primary',
                        color: theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
                    },
                }}
            >
                Create
            </Button>
        </DialogActions>
    </Dialog>
    )
}

export default CreateGroup;
