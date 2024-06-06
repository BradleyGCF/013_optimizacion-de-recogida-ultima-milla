import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useStoreInContext } from "@/stores/container/container";
import SideBar from "@/components/nav-bar/sidebar";

const Navbar = () => {
  const authenticated = useStoreInContext(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (state: { authenticated: any }) => state.authenticated
  );

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "background.paper",
        display: { xs: "block", lg: "none" },
        boxShadow: "none",
        backgroundImage: "none",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          height: "60px",
          width: "100%",
          mx: "auto",
          px: 4,
        }}
      >
        <SideBar />
      </Box>
    </AppBar>
  );
};
export default Navbar;
