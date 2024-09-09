import {
  Box,
  IconButton,
  Stack,
  useTheme,
  Typography,
  Avatar,
  Divider,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  DialogContentText,
  Dialog
} from '@mui/material';
import React from 'react';
import { Bell, CaretRight, Phone, Prohibit, Star, Trash, VideoCamera, X } from 'phosphor-react';
import { useDispatch } from 'react-redux';
import { updateSidebarToggle, updateSidebarType } from '../redux/slices/app';
import { faker } from '@faker-js/faker';
import AntSwitch from '../components/AntSwitch';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="up" ref={ref} {...props} />
));

const DialogComponent = ({ open, handleClose, title, description, onConfirm }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    keepMounted
    onClose={handleClose}
    aria-describedby="alert-dialog-slide-description"
  >
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button onClick={onConfirm}>Yes</Button>
    </DialogActions>
  </Dialog>
);

const Contact = () => {
  const [openBlock, setOpenBlock] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();

  const handleOpenDialog = (setter) => setter(true);
  const handleCloseDialog = (setter) => setter(false);

  return (
    <Box sx={{ width: 324, height: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0,0,0,0.25)',
            width: '100%',
            backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: '100%', p: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Contact Info</Typography>
            <IconButton onClick={() => dispatch(updateSidebarToggle())}>
              <X />
            </IconButton>
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
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.fullName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant='article' fontWeight={600}>
                {faker.name.fullName()}
              </Typography>
              <Typography variant='body2' fontWeight={600}>
                "+923466929789"
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-evenly">
            <Stack spacing={1} alignItems="center">
              <IconButton>
                <Phone />
              </IconButton>
              <Typography variant="overline">Voice</Typography>
            </Stack>
            <Stack spacing={1} alignItems="center">
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Camera</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant='article'>About</Typography>
            <Typography variant='body2'>Imagination is the only limit</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant='article'>Media, Links & Docs</Typography>
            <Button onClick={() => dispatch(updateSidebarType('SHARED'))} endIcon={<CaretRight />}>
              401
            </Button>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            {[1, 2, 3].map((_, i) => (
              <Box key={i}>
                <img src={faker.image.food()} alt={`Food ${i}`} style={{ width: '100%' }} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Star size={21} />
              <Typography variant='subtitle2'>Starred message</Typography>
            </Stack>
            <IconButton onClick={() => dispatch(updateSidebarType('STARRED'))}>
              <CaretRight />
            </IconButton>
          </Stack>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Stack direction="row" alignItems="center" spacing={2}>
              <Bell size={21} />
              <Typography variant='subtitle2'>Mute Notification</Typography>
            </Stack>
            <AntSwitch />
          </Stack>
          <Divider />
          <Typography variant='subtitle'>
            1 group of common
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={faker.image.avatar()}
              alt={faker.name.fullName()}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant='subtitle2' fontWeight={600}>
                Coding Monk
              </Typography>
              <Typography variant='caption' fontWeight={600}>
                Owl, Parrot, Rabbit, you
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button onClick={() => handleOpenDialog(setOpenBlock)} fullWidth startIcon={<Prohibit />} variant='outlined'>
              Block
            </Button>
            <Button onClick={() => handleOpenDialog(setOpenDelete)} fullWidth startIcon={<Trash />} variant='outlined'>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (
        <DialogComponent
          open={openBlock}
          handleClose={() => handleCloseDialog(setOpenBlock)}
          title="Block the Contact"
          description="Do you want to block this contact?"
          onConfirm={() => handleCloseDialog(setOpenBlock)} 
        />
      )}
      {openDelete && (
        <DialogComponent
          open={openDelete}
          handleClose={() => handleCloseDialog(setOpenDelete)}
          title="Delete the Chat"
          description="Do you want to delete this chat?"
          onConfirm={() => handleCloseDialog(setOpenDelete)} 
        />
      )}
    </Box>
  );
};

export default Contact;
