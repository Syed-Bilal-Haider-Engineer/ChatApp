import {useTheme} from '@mui/material/styles'; // Correct import for Material-UI
import {Box, Divider, IconButton, Link, Stack, Typography} from '@mui/material';
import React from 'react';
import {DownloadSimple, Image} from 'phosphor-react';

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
    </Stack>
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
    </Stack>
  );
};
export {Timeline, TextMsg, MediaMsg, ReplyMsg, LinkMsg, DocMsg};
