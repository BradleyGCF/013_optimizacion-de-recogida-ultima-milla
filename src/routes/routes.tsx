import { Box, Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "@/components/sidebar/sidebar";

import Navbar from "@/components/nav-bar/nav-bar";
import Maps from "@/screens/maps";

const Home = React.lazy(() => import("@/screens/home"));
const ProfileVehicle = React.lazy(() => import("@/screens/profile-vehicle"));
const Vehicles = React.lazy(() => import("@/screens/vehicles"));
const Settings = React.lazy(() => import("@/screens/settings"));
const SignIn = React.lazy(() => import("@/screens/sign-in"));
const BranchOffice = React.lazy(() => import("@/screens/branch-office"));
const RouteSystems = React.lazy(() => import("@/screens/route-systems"));
const ProfileRoutes = React.lazy(() => import("@/screens/profile-routes"));
const ProfileBranchOffice = React.lazy(
  () => import("@/screens/profile-branch-office")
);
export default function Navigator() {
  let logotipo_koolinart_v1 =
    "https://ipfs.moralis.io:2053/ipfs/QmciCp2vBFZz3Hh9GuKBQdWdgvsS3DMUNMdMdsVzZ6r2US/0xE568887Bf75AeA78147730CC4101aDf09626759E/logotipo_koolinart_v1.svg";

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
            style={{ color: "#C02327" }}
            sx={{ m: 2 }}
            size="68px"
          />
        </Grid>
      }
    >
      <Navbar />
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
          <Sidebar />
        </Box>

        <Box
          sx={{
            my: 4,
            px: 4,
            position: "relative",
            left: { xs: "0px", lg: "250px" },
            width: { xs: "100%", lg: "80%", xl: "100%" },
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/branch-office" element={<BranchOffice />} />
            <Route path="/profile-vehicle/:id" element={<ProfileVehicle />} />
            <Route path="/route-systems" element={<RouteSystems />} />
            <Route path="/profile-routes/:id" element={<ProfileRoutes />} />
            <Route path="/maps" element={<Maps/>}/>
            <Route
              path="/profile-branch-office/:id"
              element={<ProfileBranchOffice />}
            />
          </Routes>
        </Box>
      </Box>
    </React.Suspense>
  );
}
