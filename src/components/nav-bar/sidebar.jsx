import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import { Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import NavItem from './nav-items';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { UserContext } from "@/context/User/UserContext";
import { useContext } from "react";
import { getLocalStorage } from '../../hooks/getLocalStorage';

export default function SideBar() {
  const navigate = useNavigate()
  const { Authenticated } = useBoundStore((state) => state, shallow);
  const localStorage = getLocalStorage('Parse/013/currentUser')
  const { LogoutFunc } = useContext(UserContext);
  const drawerWidth = 272;

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  function MenuButtons(props) {
    return (
      <Box
        onClick={props.clickOption}
        sx={{
          display: 'flex',
          gap: 1,
          width: '100%',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0)',
          },
        }}
      >
        <NavLink
          to={props.to}
          style={{
            width: '100%',
            textDecoration: 'none',
            textTransform: 'capitalize',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" color="text.primary" textAlign="center">
            {props.title}
          </Typography>
        </NavLink>
      </Box>
    );
  }

  return (
    <>
      <IconButton
        onClick={handleDrawerOpen}
        color="inherit"
        sx={{ padding: 0 }}
      >
        <MenuIcon
          sx={{
            color: 'icon.secondary',
          }}
        />
      </IconButton>
      <Drawer
        sx={{
          width: 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '272px',
            height: '90vh',
            backgroundColor: 'background.default',
            my: '60px',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Box
          sx={{
            height: '100%',
            border: 'none',
            backgroundColor: 'background.paper',
          }}
        >
          <Stack>
            <Stack spacing={1}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: '15px',
                }}
              >
                <Box width="100%">
                  <Typography
                    sx={{
                      fontFamily: 'Poppins',
                      textAlign: 'center',
                      color: 'text.secondary',
                      fontStyle: 'normal',
                      fontSize: '25px',
                      fontWeight: '800',
                    }}
                  >
                    <Typography
                      component="span"
                      sx={{
                        color: "#0062BC",
                        fontWeight: 600,
                        fontSize: 30,
                      }}
                    >
                      Welcome,
                    </Typography>{" "}
                    <br />
                    {localStorage?.type_user === "admin" ? "Administrator" : "Driver"}
                  </Typography>
                </Box>
              </Box>
            </Stack>

            <Stack
              spacing={1}
              sx={{
                display: {
                  xs: 'flex',
                  gap: '10px',
                  lg: 'none',
                  flexDirection: 'column',
                  width: ' calc(100% - 35px)',
                },
                alignItems: 'center',
              }}
            >
              <Box
                display={{ xs: 'flex', flexDirection: 'column', gap: '5px' }}
              >
                <NavItem to="/dashboard">Home</NavItem>
                <NavItem to="/dashboard/branch-office">Branch offices</NavItem>
                <NavItem to="/dashboard/route-systems">
                  Route System
                </NavItem>
                <NavItem to="/dashboard/vehicles">Vehicles</NavItem>
                <NavItem to="/dashboard/parcel-service">Parcel</NavItem>
                <NavItem to="/dashboard/inventory">Inventory</NavItem>

                <NavItem to="/dashboard/tracking">Tracking</NavItem>
                <NavItem to="/dashboard/gps">GPS</NavItem>
                <NavItem to="/dashboard/notifications">Notifications</NavItem>
                <Box sx={{ mt: '20px', ml: '6px' }}>

                  {Authenticated || localStorage ? (
                    <Button sx={{ color: 'text.secondary', fontWeight: 600 }} onClick={() => LogoutFunc()}>
                      Logout
                    </Button>
                  ) : (
                    <Button sx={{ color: 'text.secondary', fontWeight: 600 }} onClick={() => navigate('/')}>
                      LogIn
                    </Button>
                  )}
                </Box>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
