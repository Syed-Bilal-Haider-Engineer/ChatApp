import {Avatar, Box, Divider, IconButton, Menu, MenuItem, Stack, useTheme} from '@mui/material';
import {Cat, Gear} from 'phosphor-react';
import React from 'react';
import useSettings from '../../hooks/useSettings';
import {faker} from '@faker-js/faker';
import {Nav_Buttons, Profile_Menu} from '../../data';
import AntSwitch from '../../components/AntSwitch';
import { useNavigate } from 'react-router-dom';
import { LogoutUser } from '../../redux/slices/auth';
import { useDispatch } from 'react-redux';

const Siderbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [selected, setSelected] = React.useState(0);
  const theme = useTheme();
  const {onToggleMode} = useSettings();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event,link) => {
    setAnchorEl(event.currentTarget);
    if(link){
      navigate(link)
      handleClose()
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 2px rgba(0,0,0,0.25)',
        height: '100vh',
        width: 100,
      }}
    >
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        sx={{height: '100%'}}
        spacing={3}
      >
        <Stack alignItems="center" spacing={4}>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
              mt: 2,
            }}
          >
            <Cat size={64} color="white" />
          </Box>
          <Stack
            sx={{width: 'max-content'}}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons?.map((element) =>
              element.index === selected ? (
                <Box
                  key={element.index}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                >
                  {' '}
                  <IconButton
                    sx={{
                      width: 'max-content',
                      color: '#fff',
                    }}
                    key={element.index}
                  >
                    {element.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    setSelected(element.index);
                    navigate(element.link)
                  }}
                  sx={{
                    width: 'max-content',
                    color:
                      theme.palette.mode === 'light'
                        ? '#000'
                        : theme.palette.text,
                  }}
                  key={element.index}
                >
                  {element.icon}
                </IconButton>
              )
            )}
            <Divider sx={{height: 2, width: '70%'}} />
            {selected === 3 ? (
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,
                }}
              >
                <IconButton
                  sx={{
                    width: 'max-content',
                    color: '#fff',
                  }}
                >
                  <Gear />
                </IconButton>
              </Box>
            ) : (
              <IconButton
                onClick={() => {
                  setSelected(3);
                  navigate('/setting')
                }}
                sx={{
                  width: 'max-content',
                  color:
                    theme.palette.mode === 'light'
                      ? '#000'
                      : theme.palette.text,
                }}
              >
                <Gear />
              </IconButton>
            )}
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center">
          <AntSwitch
            onClick={() => {
              onToggleMode();
            }}
            defaultChecked
          />
          <Avatar
            id="basic-button"
            src={faker.image.avatar()}
            style={{marginBottom: '10px', cursor:"pointer"}}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          />
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            anchorOrigin ={{
              vertical:'bottom',
              horizontal:'left'
            }}
            transformOrigin={{
                vertical:"bottom",
                horizontal:"left"
            }}
          >
            <Stack spacing={2} px={1}>
              {Profile_Menu.map((ele,i) => {
                return (
                  <MenuItem onClick={(e)=> {
                    handleClick(e,ele.link)
                  }} key={ele.id}>
                    <Stack
                     onClick={() => {
                      if(i===2){
                        dispatch(LogoutUser())
                      } else if(i===1){
                        navigate('/setting')
                      }else if(i===0){
                        navigate('/Profile')
                      }
                     }}
                      sx={{width: '100%'}}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <span>{ele.title}</span>
                      <span> {ele.icon}</span>
                    </Stack>
                  </MenuItem>
                );
              })}
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Siderbar;
