import { Box, Typography } from "@mui/material";
import CardVehicles from "@/components/cards/cards-vehicles";
import InputSearchGlobal from "@/components/inputs/inputs-search-global";
import RegisterVehicles from "../components/forms/register-vehicles";
import { useContext, useEffect, useState } from "react";
import { VehiclesContext } from "@/context/Vehicles/VehiclesContext";
import { useBoundStore } from "@/stores/index";
import CircularProgress from "@mui/material/CircularProgress";

export default function Vehicles() {
  const [loading, setLoading] = useState(true);
  const { getAllVehicles } = useContext(VehiclesContext);

  const { DataPerfilVehicles } = useBoundStore();
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const allVehicles = async () => await getAllVehicles();
    allVehicles();
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [getAllVehicles[0]]);



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
        Vehicles
      </Typography>
      <InputSearchGlobal />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: { xs: "center", sm: "start" },
        }}
      >
        {loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100px",
              width: "100%",
            }}
          >
            <CircularProgress size="100px" color="secondary" />
          </Box>
        )}
        {DataPerfilVehicles?.length === 0 && !loading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "10rem",
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontSize: "20px !important" }}
            >
              Vehicles not found
            </Typography>
          </Box>
        )}
        {DataPerfilVehicles?.map((DataPerfilVehicles) => {
          // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
          return (
            // biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            // biome-ignore lint/complexity/useLiteralKeys: <explanation>
            <div
            key={DataPerfilVehicles.id}
            onClick={() => handleVehicleClick(DataPerfilVehicles)}
          >
              <CardVehicles DataPerfilVehicles={DataPerfilVehicles} />
            </div>
          );
        })}
      </Box>
      <RegisterVehicles />
    </Box>
  );
}
