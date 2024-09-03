import {useTheme} from '@mui/material/styles'; // Correct import for Material-UI
import {
  Box,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { DotsThreeVertical, DownloadSimple, Image} from 'phosphor-react';
import {Message_options} from '../../../data';

const DocMsg = (ele) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={ele.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: ele.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Image size={48} />
            <Typography variant="caption">Abstract.png</Typography>
            <IconButton>
              <DownloadSimple />
            </IconButton>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color: ele.incoming ? theme.palette.text : '#fff',
            }}
          >
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      <MsgOptions />
    </Stack>
  );
};

const LinkMsg = (ele) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={ele.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: ele.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack p={2}>
          <Stack
            spacing={3}
            alignItems="left"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <img
              src={ele.img}
              alt={ele.message}
              style={{
                maxHeight: 210,
                borderRadius: '10px',
              }}
            />
            <Stack spacing={2}>
              <Typography variant="subtitle2">Creating chat app</Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  color: theme.palette.primary.main,
                }}
                component={Link}
                to="www.youtube.come"
              >
                www.youtube.come
              </Typography>
              <Typography
                variant="body2"
                color={ele.incoming ? theme.palette.text : '#fff'}
              >
                {ele.message}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <MsgOptions />
    </Stack>
  );
};
const TextMsg = (ele) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={ele.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: ele.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Typography
          variant="body2"
          color={ele.incoming ? theme.palette.text.primary : '#fff'}
        >
          {ele.message}
        </Typography>
      </Box>
      <MsgOptions />
    </Stack>
  );
};

const MsgOptions = (ele) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <DotsThreeVertical
        size={20}
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{cursor:"pointer"}}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Stack spacing={2} px={1}>
          {Message_options.map((ele) => {
            return <MenuItem onClick={handleClick}>{ele.title}</MenuItem>;
          })}
        </Stack>
      </Menu>
    </>
  );
};
const Timeline = (ele) => {
  const theme = useTheme();
  return (
    <Stack
      width="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Divider sx={{width: '46%'}} />
      <Typography sx={{color: theme.palette.text.primary}} variant="caption">
        {ele.text}
      </Typography>
      <Divider sx={{width: '46%'}} />
      <MsgOptions />
    </Stack>
  );
};

const MediaMsg = (ele) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={ele.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: ele.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack spacing={1}>
          <img
            src={ele.img}
            alt={ele.message}
            style={{
              maxHeight: 210,
              borderRadius: '10px',
            }}
          />
          <Typography
            variant="body2"
            color={ele.incoming ? theme.palette.text.primary : '#fff'}
          >
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      <MsgOptions />
    </Stack>
  );
};

const ReplyMsg = (ele) => {
  const theme = useTheme();
  return (
    <Stack direction="row" justifyContent={ele.incoming ? 'start' : 'end'}>
      <Box
        p={1.5}
        sx={{
          backgroundColor: ele.incoming
            ? theme.palette.background.default
            : theme.palette.primary.main,
          borderRadius: 1.5,
          width: 'max-content',
        }}
      >
        <Stack spacing={2}>
          <Stack
            p={2}
            direction="column"
            spacing={3}
            alignItems="center"
            sx={{
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
            }}
          >
            <Typography variant="body2" color={theme.palette.text}>
              {ele.message}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            color={ele.incoming ? theme.palette.text.primary : '#fff'}
          >
            {ele.message}
          </Typography>
        </Stack>
      </Box>
      <MsgOptions />
    </Stack>
  );
};
export {Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg};
