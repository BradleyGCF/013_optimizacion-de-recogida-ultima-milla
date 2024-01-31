import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import Typography from "@mui/material/Typography";
import { Link, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const routes = [
  {
    path: "/branch-office",
    text: "Branch Office",
    active: true,
  },
  {
    path: "/route-systems",
    text: "Route System",
    active: true,
  },
  {
    path: "/vehicles",
    text: "Vehicles",
    active: true,
  },
  {
    path: "/parcel-service",
    text: "Parcel Service",
    active: true,
  },
  {
    path: "/inventory",
    text: "Inventory",
    active: false,
  },
  {
    path: "/tracking",
    text: "Tracking",
    active: false,
  },
  {
    path: "/gps",
    text: "GPS",
    active: false,
  },
];

export default function SideBar() {
  const location = useLocation();
  return (
    <Sidebar
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "#00294F",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
          height: "100vh",
        },
      }}
    >
      <Stack spacing={4} justifyContent="space-between" height="100vh" py={2}>
        <Typography
          sx={{
            color: "#fff",
            fontWeight: 600,
            fontSize: 20,
            px: "20px",
          }}
        >
          Bienvenido, <br />
          Administrador
        </Typography>
        <Menu
          menuItemStyles={{
            button: {
              height: "fit-content",
              //   pointerEvents: "none",
              "&:hover": {
                backgroundColor: "transparent",
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
                <Link
                  to="/"
                  style={{
                    color: "#fff",
                    fontWeight: 600,
                    textDecoration:
                      location.pathname == "/" ? "underline" : "none",
                  }}
                />
              }
            >
              Home
            </MenuItem>
            {routes.map((route) => (
              <MenuItem
                component={
                  <Link
                    to={route.path}
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      textDecoration:
                        location.pathname == route.path ? "underline" : "none",
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
              <Link
                to="/settings"
                style={{
                  color: "#fff",
                  fontWeight: 600,
                  textDecoration:
                    location.pathname == "/settings" ? "underline" : "none",
                }}
              />
            }
          >
            Settings
          </MenuItem>
        </Menu>

        <Button
          sx={{
            textTransform: "none",

            width: "fit-content",
            px: "20px",
          }}
        >
          <Typography sx={{ color: "#fff", fontWeight: 600 }}>
            Logout
          </Typography>
        </Button>
      </Stack>
    </Sidebar>
  );
}
