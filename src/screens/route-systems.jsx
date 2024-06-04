import { Box, Typography } from "@mui/material";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import CardRoutes from "@/components/cards/card-routes";
import RegisterNewRoute from "@/components/frame/register-new-route";
import { BranchContext } from "@/context/Branch/BranchContext";
import { useEffect, useContext, useState } from "react";
import { useBoundStore } from "@/stores/index";

export default function RouteSystems() {
  const { GetAllRoute } = useContext(BranchContext);
  const [availableRoutes, setAvailableRoutes] = useState([]);
  const { AllRoute } = useBoundStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getAllRoute = async () => await GetAllRoute();
    getAllRoute();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (AllRoute?.length > 0) {
      setAvailableRoutes(AllRoute);
    }
  }, [AllRoute]);

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
        {availableRoutes?.map((route) => {
          return <CardRoutes route={route} key={route?.id} />;
        })}
      </Box>
      <RegisterNewRoute />
    </Box>
  );
}
