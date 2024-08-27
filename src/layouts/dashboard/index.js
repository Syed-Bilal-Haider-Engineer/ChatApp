import { Avatar, Box, Divider, IconButton, Stack, Switch } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import React from "react";
import { Outlet } from "react-router-dom";
import logo from '../../assets/Images/logo.ico'
import { Nav_Buttons } from "../../data";
import { Gear } from "phosphor-react";
import { faker } from "@faker-js/faker";
import useSettings from "../../hooks/useSettings";


const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 40,
  height: 20,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(22px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 16,
    height: 16,
    borderRadius: 8,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));


const DashboardLayout = () => {
  const [selected, setSelected] = React.useState(0);
  const theme = useTheme()
  const { onToggleMode } = useSettings()
  return (
    <>
      <Box sx={{display:'flex'}}>
      <Box sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 0 2px rgba(0,0,0,0.25)', height: "100vh", width: 100
      }}>
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: '100%' }}
          spacing={3}>
          <Stack alignItems="center" spacing={4}>
            <Box sx={{
              backgroundColor: theme.palette.primary.main,
              height: 64,
              width: 64,
              borderRadius: 1.5,
              mt: 2
            }}>
              <img src={logo} alt="chatApp logo" />
            </Box>
            <Stack sx={{ width: 'max-content' }} direction="column" alignItems="center" spacing={3}>
              {Nav_Buttons.map((element) =>
                element.index === selected ?
                  <Box key={element.index} sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}> <IconButton sx={{
                    width: 'max-content',
                    color: '#fff'
                  }} key={element.index}>
                      {element.icon}
                    </IconButton>
                  </Box> :
                  <IconButton
                    onClick={() => { setSelected(element.index) }}
                    sx={{
                      width: 'max-content',
                      color: theme.palette.mode === 'light' ? '#000' : theme.palette.text
                    }} key={element.index}>
                    {element.icon}
                  </IconButton>
              )}
              <Divider sx={{ height: 2, width: '70%' }} />
              {selected === 3 ? (
                <Box sx={{
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1.5,

                }}>
                  <IconButton sx={{
                    width: 'max-content',
                    color: '#fff'
                  }}>
                    <Gear />
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => { setSelected(3) }}
                  sx={{
                    width: 'max-content',
                    color: theme.palette.mode === 'light' ? '#000' : theme.palette.text
                  }}>
                  <Gear />
                </IconButton>
              )}
            </Stack>
          </Stack>
          <Stack spacing={2} alignItems="center">
            <AntSwitch onClick={() => {
              onToggleMode()
            }} defaultChecked />
            <Avatar src={faker.image.avatar()} style={{ marginBottom: '10px' }}>
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      </Box>
    </>
  );
};

export default DashboardLayout;
