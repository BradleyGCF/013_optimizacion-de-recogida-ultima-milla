import { Box, Typography } from "@mui/material";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import CardRoutes from "@/components/cards/card-routes";
import RegisterNewRoute from "@/components/frame/register-new-route";

export default function RouteSystems() {
  return (
    <Box
      sx={{
        p: { xs: "20px", sm: "20px 50px" },
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography variant="subtitle1" color="text.fourth">
        Routes
      </Typography>
      <InputSearchGlobal placeHolder="Search" />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        <CardRoutes />
        <CardRoutes />
        <CardRoutes />
      </Box>
      <RegisterNewRoute />
    </Box>
  );
}
