import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
import Typography from "@mui/material/Typography";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material";
import { useBoundStore } from "@/stores/index";
import { shallow } from "zustand/shallow";
import { UserContext } from "@/context/User/UserContext";
import { useContext } from "react";
import { getLocalStorage } from "@/hooks/getLocalStorage";

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
  const { Authenticated } = useBoundStore((state: any) => state, shallow);
  const localStorage = getLocalStorage("Parse/013/currentUser");
  const { LogoutFunc }: any = useContext(UserContext);
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
            fontSize: 24,
            px: "20px",
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
        <Menu
          menuItemStyles={{
            button: {
              height: "fit-content",
              //   pointerEvents: "none",
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
                      location.pathname == "/dashboard"
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
                        location.pathname == route.path
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
                    location.pathname == "/notifications"
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
          {Authenticated || localStorage ? (
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
    </Sidebar>
  );
}
