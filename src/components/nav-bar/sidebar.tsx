import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Box, IconButton, styled } from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { UserContext } from "@/context/User/UserContext";
import { useContext, useState } from "react";
import { getLocalStorage } from "@/hooks/getLocalStorage";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";

const StyledLink = styled(Link)({
  color: "#fff",
  fontWeight: 600,
  margin: "0 20px",
});

const routes = [
  {
    path: "/dashboard/branch-office",
    text: "Branch offices",
    active: true,
  },
  {
    path: "/dashboard/route-systems",
    text: "Route System",
    active: true,
  },
  {
    path: "/dashboard/vehicles",
    text: "Vehicles",
    active: true,
  },
  {
    path: "/dashboard/shipping",
    text: "Shipping",
    active: true,
  },
  {
    path: "/dashboard/parcel-service",
    text: "Parcel",
    active: true,
  },
  {
    path: "/dashboard/inventory",
    text: "Inventory",
    active: false,
  },
  {
    path: "/dashboard/tracking",
    text: "Tracking",
    active: false,
  },
  {
    path: "/dashboard/gps",
    text: "GPS",
    active: false,
  },
];

export default function SideBar() {
  const navigate = useNavigate();
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { Authenticated } = useBoundStore((state: any) => state, shallow);
  const localStorage = getLocalStorage("Parse/013/currentUser");
  const localStorageVehicle = getLocalStorage("vehicle");
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { LogoutFunc }: any = useContext(UserContext);
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleDrawerOpen}
        color="inherit"
        sx={{
          padding: "20px",
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 1300,
        }}
      >
        <MenuIcon
          sx={{
            color: "#fff",
          }}
        />
      </IconButton>
      <Drawer
        sx={{
          width: "100px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "270px",
            backgroundColor: "#00294F",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            height: "100vh",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
        onClose={handleDrawerClose}
      >
        <Stack spacing={4} justifyContent="space-between" height="100vh" py={4}>
          <Typography
            sx={{
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontWeight: 600,
              fontSize: 24,
              px: "20px",
            }}
          >
            <Typography
              component="span"
              sx={{
                marginLeft: "2rem",
                color: "#0062BC",
                fontWeight: 600,
                fontSize: 30,
              }}
            >
              Welcome
            </Typography>
            <br />
            <Box
              component="span"
              sx={{
                marginLeft: "1.5rem",
                color: "#fff",
                fontWeight: 600,
                fontSize: 23,
              }}
            >
              {localStorage?.type_user === "admin" ? "Administrator" : "Admin"}
            </Box>
          </Typography>
          <Menu
            menuItemStyles={{
              button: {
                height: "fit-content",
                color: "#fff",
                "&:hover": {
                  backgroundColor: "#0062BC",
                  color: "#fff",
                },
              },
            }}
            rootStyles={{
              height: "auto",
            }}
          >
            <Stack spacing={1} sx={{ my: 4 }}>
              <MenuItem
                component={
                  <StyledLink
                    to="/dashboard"
                    sx={{
                      backgroundColor:
                        location.pathname === "/dashboard"
                          ? "#0062BC"
                          : "transparent",
                    }}
                  />
                }
              >
                Home
              </MenuItem>
              {routes.map((route) => (
                <MenuItem
                  component={
                    <StyledLink
                      to={route.path}
                      sx={{
                        backgroundColor:
                          location.pathname === route.path
                            ? "#0062BC"
                            : "transparent",
                      }}
                    />
                  }
                  key={route.path}
                >
                  {route.text}
                </MenuItem>
              ))}
            </Stack>

            <MenuItem
              component={
                <StyledLink
                  to="/settings"
                  sx={{
                    textDecoration:
                      location.pathname === "/notifications"
                        ? "#0062BC"
                        : "transparent",
                  }}
                />
              }
            >
              Notifications
            </MenuItem>
          </Menu>

          <Button
            sx={{
              textTransform: "none",
              width: "fit-content",
              px: "20px",
              mx: "20px",
            }}
          >
            {Authenticated || localStorage || localStorageVehicle ? (
              <Typography
                sx={{ color: "#fff", fontWeight: 600 }}
                onClick={() => LogoutFunc()}
              >
                Logout
              </Typography>
            ) : (
              <Typography
                sx={{ color: "#fff", fontWeight: 600 }}
                onClick={() => navigate("/")}
              >
                LogIn
              </Typography>
            )}
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}
