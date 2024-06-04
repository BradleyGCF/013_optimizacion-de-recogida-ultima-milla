import { Box, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Sidebar from "@/components/sidebar/sidebar";
import { ProtectedRoute } from "@/components/routes/protectedRoute";
import Navbar from "@/components/nav-bar/nav-bar";
import Maps from "@/screens/maps";
// import Home from "@/screens/dashboard";

const Dashboard = React.lazy(() => import("@/screens/dashboard"));
const DashboardDriver = React.lazy(() => import("@/screens/dashboard-driver"));
const ProfileVehicle = React.lazy(() => import("@/screens/profile-vehicle"));
const Package = React.lazy(() => import("@/screens/package"));
const TrackingCurrent = React.lazy(() => import("@/screens/tracking-current"));
const Tracking = React.lazy(() => import("@/screens/tracking"));
const Vehicles = React.lazy(() => import("@/screens/vehicles"));
const Shipping = React.lazy(() => import("@/screens/shipping"));
const Settings = React.lazy(() => import("@/screens/settings"));
const SignIn = React.lazy(() => import("@/screens/sign-in"));
const BranchOffice = React.lazy(() => import("@/screens/branch-office"));
const RouteSystems = React.lazy(() => import("@/screens/route-systems"));
const ProfileRoutes = React.lazy(() => import("@/screens/profile-routes"));
const RecoverPassword = React.lazy(() => import("@/screens/recover-password"));
const ProfileBranchOffice = React.lazy(
  () => import("@/screens/profile-branch-office")
);
const Inventory = React.lazy(() => import("@/screens/inventory"));
const Chat = React.lazy(() => import("@/screens/chat"));

export default function Navigator() {
  const location = useLocation();
  const isSignInOrRecoverPassword =
    location.pathname === "/" ||
    location.pathname === "/sign-in-admin" ||
    location.pathname === "/recover-password";

  return (
    <React.Suspense
      fallback={
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            backgroundColor: "common.tree",
            width: "100%",
            height: "100vh",
          }}
        >
          <CircularProgress
            style={{ color: "#00294F" }}
            sx={{ m: 2 }}
            size="68px"
          />
        </Grid>
      }
    >
      {!isSignInOrRecoverPassword && <Navbar />}

      <Box
        sx={{
          display: { xs: "block", lg: "flex" },
        }}
      >
        <Box
          sx={{
            height: "100vh",
            position: "fixed",
            display: { xs: "none", lg: "block" },
          }}
        >
          {location.pathname !== "/" &&
            location.pathname !== "/sign-in-admin" &&
            location.pathname !== "/recover-password" && <Sidebar />}
        </Box>

        {/* Este box controla el layout de la pagina */}
        <Box
          sx={{
            my: 4,
            px: 4,
            position: "relative",
            left: { xs: "0px", lg: "250px" },
            width: { xs: "100%", lg: "80%", xl: "100%" },
            ...(isSignInOrRecoverPassword && {
              my: 0,
              px: 0,
              width: "100%",
              position: "fixed",
              left: 0,
            }),
          }}
        >
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route element={<ProtectedRoute rol="driver" />}>
              <Route
                path="/dashboard/driver/:id"
                element={<DashboardDriver />}
              />
            </Route>
            <Route element={<ProtectedRoute rol="admin" />}>
              <Route path="/dashboard">
                <Route index element={<Dashboard />} />
                <Route path="vehicles" element={<Vehicles />} />
                <Route path="shipping" element={<Shipping />} />
                <Route path="tracking" element={<Tracking />} />
                <Route path="branch-office" element={<BranchOffice />} />
                <Route
                  path="profile-vehicle/:id"
                  element={<ProfileVehicle />}
                />
                <Route path="route-systems" element={<RouteSystems />} />
                <Route path="route-systems/profile-routes/:id" element={<ProfileRoutes />} />
                <Route path="maps" element={<Maps />} />
                <Route path="ubication/:id" element={<TrackingCurrent />} />
                <Route path="parcel-service" element={<Package />} />
                <Route path="inventory" element={<Inventory />} />
              </Route>
              <Route
                path="/profile-branch-office/:id"
                element={<ProfileBranchOffice />}
              />
            </Route>
            <Route path="/chat/:id" element={<Chat />} />

            <Route path="/" element={<SignIn />} />
            <Route path="/recover-password" element={<RecoverPassword />} />
          </Routes>
        </Box>
      </Box>
    </React.Suspense>
  );
}
