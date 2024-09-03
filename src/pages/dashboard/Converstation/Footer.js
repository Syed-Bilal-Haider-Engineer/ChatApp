import {
  Box,
  Fab,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Camera,
  File,
  Image,
  LinkSimple,
  PaperPlaneTilt,
  Smiley,
  Sticker,
  User,
} from 'phosphor-react';
import {useState} from 'react';
import {StyledInput} from '../../../components/settings/StyledInput';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

const Actions = [
  {
    color: '#4da5fe',
    icon: <Image size={24} />,
    y: 102,
    title: 'Photo/Video',
  },
  {
    color: '#1b8cfe',
    icon: <Sticker size={24} />,
    y: 172,
    title: 'Stickers',
  },
  {
    color: '#0172e4',
    icon: <Camera size={24} />,
    y: 242,
    title: 'Image',
  },
  {
    color: '#0159b2',
    icon: <File size={24} />,
    y: 312,
    title: 'Document',
  },
  {
    color: '#013f7f',
    icon: <User size={24} />,
    y: 382,
    title: 'Contact',
  },
];

const ChatInput = ({setOpenPickerState}) => {
  const [actions, setActions] = useState(false);
  return (
    <Stack spacing={1} sx={{flexGrow: 1}}>
      <StyledInput
        placeholder="Type a message..."
        fullWidth
        variant="filled"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <Stack sx={{width: 'max-content'}}>
              <Stack
                sx={{
                  position: 'relative',
                  display: actions ? 'inline-block' : 'none',
                }}
              >
                {Actions.map((ele) => (
                  <Tooltip placement="right" title={ele.title} key={ele.y}>
                    <Fab
                      color="primary"
                      aria-label="add"
                      sx={{
                        position: 'absolute',
                        top: -ele.y,
                        backgroundColor: ele.color,
                      }}
                    >
                      {ele.icon}
                    </Fab>
                  </Tooltip>
                ))}
              </Stack>
              <InputAdornment
                position="start"
                sx={{marginTop: '4px !important'}}
              >
                <IconButton
                  onClick={() => {
                    setActions((prev) => !prev);
                  }}
                >
                  <LinkSimple />
                </IconButton>
              </InputAdornment>
            </Stack>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setOpenPickerState((prev) => !prev); // Toggles the smiley picker
                }}
              >
                <Smiley />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Stack>
  );
};

const Footer = () => {
  const theme = useTheme();
  const [openPicker, setOpenPickerState] = useState(false);
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: 2,
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F8FAFF'
            : theme.palette.background.paper,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={3} sx={{flexGrow: 1}}>
        {/* chat input sections */}
        <Stack sx={{width: '100%'}}>
          <Box
            sx={{
              display: openPicker ? 'inline' : 'none',
              zIndex: 10,
              position: 'fixed',
              bottom: 81,
              right: 100,
            }}
          >
            <Picker
              theme={theme.palette.mode}
              data={data}
              onEmojiSelect={console.log}
            />
          </Box>
          <ChatInput setOpenPickerState={setOpenPickerState} />
        </Stack>
        <Box
          sx={{
            height: 48,
            width: 46,
            backgroundColor: theme.palette.primary.main,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ml: 2,
            borderRadius: 2,
          }}
        >
          <IconButton>
            <PaperPlaneTilt color="#ffffff" />
          </IconButton>
        </Box>
      </Stack>
    </Box>
  );
};

export default Footer;
